"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TagInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange"
  > {
  /** Controlled list of tags. */
  value?: string[];
  /** Initial tags when uncontrolled. */
  defaultValue?: string[];
  /** Fired with the full tag list whenever it changes. */
  onChange?: (tags: string[]) => void;
  /** Placeholder shown in the text field when empty. */
  placeholder?: string;
  /** Maximum number of tags. Further input is ignored once reached. */
  max?: number;
  /** Allow the same tag more than once. Default false. */
  allowDuplicates?: boolean;
  /** Return false to reject a tag before it is added (e.g. email check). */
  validate?: (tag: string) => boolean;
  /** Keys that commit the current text into a tag. Default Enter + comma. */
  delimiters?: string[];
  /** Disable all interaction. */
  disabled?: boolean;
  /** Render in an error state (red border + ring). */
  error?: boolean;
}

const DEFAULT_DELIMITERS = ["Enter", ","];

/**
 * TagInput — a token field that turns typed text into removable chips. Commit
 * a tag with Enter or comma (configurable), remove the last with Backspace on
 * an empty field, or paste a comma / newline separated list to add many at
 * once. Supports controlled and uncontrolled use, a max, dedup, and a custom
 * validator. Great for tags, recipients, keywords, or scopes.
 */
const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder = "Add a tag…",
      max,
      allowDuplicates = false,
      validate,
      delimiters = DEFAULT_DELIMITERS,
      disabled,
      error,
      className,
      onKeyDown,
      onPaste,
      onBlur,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<string[]>(
      defaultValue ?? []
    );
    const tags = isControlled ? value! : internal;
    const [draft, setDraft] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
      },
      [ref]
    );

    const commit = React.useCallback(
      (next: string[]) => {
        if (!isControlled) setInternal(next);
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const addTag = React.useCallback(
      (raw: string) => {
        const tag = raw.trim();
        if (!tag) return;
        if (max != null && tags.length >= max) return;
        if (!allowDuplicates && tags.includes(tag)) return;
        if (validate && !validate(tag)) return;
        commit([...tags, tag]);
      },
      [tags, max, allowDuplicates, validate, commit]
    );

    const removeAt = React.useCallback(
      (index: number) => {
        commit(tags.filter((_, i) => i !== index));
      },
      [tags, commit]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (delimiters.includes(e.key)) {
        e.preventDefault();
        addTag(draft);
        setDraft("");
      } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
        e.preventDefault();
        removeAt(tags.length - 1);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      onPaste?.(e);
      if (e.defaultPrevented) return;
      const text = e.clipboardData.getData("text");
      // Split on any non-Enter delimiter chars plus newlines.
      const splitters = delimiters.filter((d) => d.length === 1);
      const pattern = new RegExp(
        `[\\n${splitters.map((s) => `\\${s}`).join("")}]+`
      );
      const parts = text.split(pattern).map((p) => p.trim()).filter(Boolean);
      if (parts.length > 1) {
        e.preventDefault();
        let next = tags;
        for (const p of parts) {
          const tag = p.trim();
          if (!tag) continue;
          if (max != null && next.length >= max) break;
          if (!allowDuplicates && next.includes(tag)) continue;
          if (validate && !validate(tag)) continue;
          next = [...next, tag];
        }
        commit(next);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      if (draft.trim()) {
        addTag(draft);
        setDraft("");
      }
    };

    const atMax = max != null && tags.length >= max;

    return (
      <div
        className={cn(
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-2 py-1.5 text-sm shadow-sm transition-colors focus-within:border-foreground/40 focus-within:ring-2 focus-within:ring-ring/30",
          error && "border-destructive focus-within:ring-destructive",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onMouseDown={(e) => {
          // Keep focus on the input when clicking empty space in the field.
          if (e.target === e.currentTarget) {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
      >
        {tags.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {tag}
            {!disabled ? (
              <button
                type="button"
                tabIndex={-1}
                aria-label={`Remove ${tag}`}
                onClick={() => removeAt(i)}
                className="-mr-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm text-secondary-foreground/60 transition-colors hover:bg-foreground/10 hover:text-secondary-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  width={10}
                  height={10}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </span>
        ))}
        <input
          ref={setRefs}
          value={draft}
          disabled={disabled || atMax}
          placeholder={atMax ? "" : placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={handleBlur}
          className="h-6 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground/70 disabled:cursor-not-allowed"
          style={{ minWidth: "6rem" }}
          {...props}
        />
      </div>
    );
  }
);
TagInput.displayName = "TagInput";

export { TagInput };
