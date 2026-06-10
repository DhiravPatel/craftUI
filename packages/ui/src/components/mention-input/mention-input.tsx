"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface MentionUser {
  id: string;
  /** Display name shown in the dropdown row. */
  name: string;
  /** Handle inserted into the text (without the `@`). Defaults to a lowercased name. */
  handle?: string;
  /** Optional avatar image URL. */
  avatar?: string;
  /** Optional second line in the dropdown row (e.g. role, team). */
  subtitle?: string;
}

export interface MentionInputProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "defaultValue" | "onChange"
  > {
  /** Users available for @ mentions. */
  users: MentionUser[];
  /** Controlled value. */
  value?: string;
  /** Initial value (uncontrolled). */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called when a mention is inserted. */
  onMention?: (user: MentionUser) => void;
  /** Max dropdown rows. Default 5. */
  maxResults?: number;
  /** Minimum rows the textarea grows to. Default 3. */
  rows?: number;
}

function defaultHandle(u: MentionUser) {
  return u.handle ?? u.name.toLowerCase().replace(/\s+/g, "");
}

/**
 * MentionInput — a textarea with an @ mention autocomplete dropdown.
 * Type `@` to open the menu; keep typing to filter `users` by name or
 * handle; arrow keys navigate, Enter selects, Esc closes. The selected
 * mention is spliced into the textarea at the cursor as `@handle `, and
 * any in-progress trigger query is replaced. Self-contained, no deps.
 */
const MentionInput = React.forwardRef<HTMLTextAreaElement, MentionInputProps>(
  (
    {
      users,
      value,
      defaultValue,
      onChange,
      onMention,
      maxResults = 5,
      rows = 3,
      placeholder = "Write a comment — type @ to mention",
      className,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue ?? "");
    const text = isControlled ? value! : internal;

    const taRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [triggerStart, setTriggerStart] = React.useState<number | null>(null);
    const [highlight, setHighlight] = React.useState(0);

    const setText = (next: string) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    const closeMenu = () => {
      setOpen(false);
      setQuery("");
      setTriggerStart(null);
      setHighlight(0);
    };

    // Scan the text immediately to the left of the cursor for an @ trigger.
    const detectTrigger = (val: string, caret: number) => {
      // Walk back from the caret to find a recent @ that's preceded by space/start.
      let i = caret - 1;
      while (i >= 0) {
        const ch = val.charAt(i);
        if (ch === "@") {
          const prev = i === 0 ? " " : val.charAt(i - 1);
          if (/\s|^$/.test(prev)) {
            const q = val.slice(i + 1, caret);
            if (/^[a-zA-Z0-9_]*$/.test(q)) {
              setTriggerStart(i);
              setQuery(q);
              setOpen(true);
              setHighlight(0);
              return;
            }
          }
          break;
        }
        if (/\s/.test(ch)) break;
        i -= 1;
      }
      closeMenu();
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const next = e.target.value;
      setText(next);
      const caret = e.target.selectionStart ?? next.length;
      detectTrigger(next, caret);
    };

    const filtered = React.useMemo(() => {
      const q = query.toLowerCase();
      const score = (u: MentionUser) => {
        const n = u.name.toLowerCase();
        const h = defaultHandle(u).toLowerCase();
        if (n.startsWith(q) || h.startsWith(q)) return 2;
        if (n.includes(q) || h.includes(q)) return 1;
        return 0;
      };
      return users
        .map((u) => ({ u, s: score(u) }))
        .filter((x) => (q ? x.s > 0 : true))
        .sort((a, b) => b.s - a.s)
        .slice(0, maxResults)
        .map((x) => x.u);
    }, [users, query, maxResults]);

    const insertMention = (u: MentionUser) => {
      if (triggerStart == null || !taRef.current) return;
      const handle = defaultHandle(u);
      const before = text.slice(0, triggerStart);
      const afterCaret = taRef.current.selectionStart ?? text.length;
      const after = text.slice(afterCaret);
      const insertion = `@${handle} `;
      const next = before + insertion + after;
      setText(next);
      onMention?.(u);
      closeMenu();
      // Restore caret after the inserted mention.
      const caret = before.length + insertion.length;
      requestAnimationFrame(() => {
        if (taRef.current) {
          taRef.current.focus();
          taRef.current.setSelectionRange(caret, caret);
        }
      });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(e);
      if (!open || filtered.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => (h + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => (h - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        insertMention(filtered[highlight]!);
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
      }
    };

    return (
      <div className={cn("relative w-full", className)}>
        <textarea
          ref={(node) => {
            taRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref)
              (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
          }}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => window.setTimeout(closeMenu, 120)}
          rows={rows}
          placeholder={placeholder}
          className="block w-full resize-y rounded-xl border border-white/10 bg-neutral-900 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-300/50 focus:ring-2 focus:ring-sky-300/30"
          {...props}
        />

        {open && filtered.length > 0 ? (
          <div
            role="listbox"
            className="absolute left-0 right-0 z-30 mt-1 max-h-64 overflow-auto rounded-xl border border-white/10 bg-neutral-950 p-1 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]"
          >
            {filtered.map((u, i) => {
              const active = i === highlight;
              return (
                <button
                  key={u.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    insertMention(u);
                  }}
                  onMouseEnter={() => setHighlight(i)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left",
                    active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"
                  )}
                >
                  {u.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={u.avatar}
                      alt=""
                      className="h-7 w-7 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-[11px] font-semibold text-white/85">
                      {u.name
                        .split(" ")
                        .slice(0, 2)
                        .map((p) => p[0]?.toUpperCase())
                        .join("")}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-white">
                      {u.name}{" "}
                      <span className="text-white/40">@{defaultHandle(u)}</span>
                    </p>
                    {u.subtitle ? (
                      <p className="truncate text-[11px] text-white/45">
                        {u.subtitle}
                      </p>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
);
MentionInput.displayName = "MentionInput";

export { MentionInput };
