"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface InlineEditProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit"> {
  /** Current value. */
  value: string;
  /** Called when the user confirms a new value (Enter / Save). */
  onSubmit: (next: string) => void | Promise<void>;
  /** Placeholder shown when the value is empty. */
  placeholder?: string;
  /** Editor variant. Default "text". */
  variant?: "text" | "textarea";
  /** Validator — return a string error message to block submit. */
  validate?: (next: string) => string | null;
  /** Custom display rendering for the read mode. */
  renderDisplay?: (value: string) => React.ReactNode;
  /** Open the editor immediately. */
  defaultEditing?: boolean;
  /** Disable editing entirely. */
  disabled?: boolean;
  /** Hide the explicit Save / Cancel buttons (still bound to Enter / Esc). */
  hideButtons?: boolean;
  /** Text for the Save button. Default "Save". */
  saveLabel?: string;
  /** Text for the Cancel button. Default "Cancel". */
  cancelLabel?: string;
  /** Optional className for the read-mode trigger. */
  displayClassName?: string;
}

/**
 * InlineEdit — a click-to-edit field for settings, profile rows, and
 * card titles. Renders the current value in read mode (click anywhere on
 * it to switch into edit mode); the editor commits on Enter or Save and
 * reverts on Esc or Cancel. Async-safe — `onSubmit` can return a promise
 * and the Save button shows a loading state while it resolves. Optional
 * `validate` blocks submission with an inline error message.
 */
const InlineEdit = React.forwardRef<HTMLDivElement, InlineEditProps>(
  (
    {
      value,
      onSubmit,
      placeholder = "Click to add…",
      variant = "text",
      validate,
      renderDisplay,
      defaultEditing = false,
      disabled = false,
      hideButtons = false,
      saveLabel = "Save",
      cancelLabel = "Cancel",
      displayClassName,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [editing, setEditing] = React.useState(defaultEditing);
    const [draft, setDraft] = React.useState(value);
    const [error, setError] = React.useState<string | null>(null);
    const [saving, setSaving] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    // Re-sync the draft when external value changes while not editing.
    React.useEffect(() => {
      if (!editing) setDraft(value);
    }, [value, editing]);

    React.useEffect(() => {
      if (editing && inputRef.current) {
        inputRef.current.focus();
        if (variant === "text") {
          (inputRef.current as HTMLInputElement).select();
        }
      }
    }, [editing, variant]);

    const enter = () => {
      if (disabled) return;
      setDraft(value);
      setError(null);
      setEditing(true);
    };

    const cancel = () => {
      setEditing(false);
      setDraft(value);
      setError(null);
    };

    const commit = async () => {
      if (saving) return;
      const err = validate?.(draft) ?? null;
      if (err) {
        setError(err);
        return;
      }
      try {
        setSaving(true);
        await onSubmit(draft);
        setEditing(false);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save.");
      } finally {
        setSaving(false);
      }
    };

    if (!editing) {
      const isEmpty = value.length === 0;
      return (
        <div
          ref={ref}
          className={cn("inline-flex max-w-full items-center", className)}
          style={style}
          {...props}
        >
          <button
            type="button"
            onClick={enter}
            disabled={disabled}
            className={cn(
              "group/inline -mx-1 -my-0.5 inline-flex max-w-full items-center gap-1 truncate rounded-md px-1 py-0.5 text-left transition-colors",
              disabled
                ? "cursor-default text-white/85"
                : "cursor-text text-white/85 hover:bg-white/[0.05] hover:text-white",
              isEmpty && "italic text-white/40",
              displayClassName
            )}
          >
            {isEmpty ? (
              placeholder
            ) : renderDisplay ? (
              renderDisplay(value)
            ) : (
              <span className="truncate">{value}</span>
            )}
            {!disabled ? (
              <svg
                width={11}
                height={11}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="shrink-0 opacity-0 transition-opacity group-hover/inline:opacity-100"
              >
                <path
                  d="M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </button>
        </div>
      );
    }

    const editorCommon =
      "w-full rounded-md border bg-neutral-900 px-2 py-1 text-sm text-white outline-none transition-colors";
    const editorBorder = error
      ? "border-rose-400/50 focus:border-rose-400/70 focus:ring-2 focus:ring-rose-400/30"
      : "border-white/15 focus:border-sky-300/50 focus:ring-2 focus:ring-sky-300/30";

    return (
      <div
        ref={ref}
        className={cn("inline-flex max-w-full flex-col gap-1.5", className)}
        style={style}
        {...props}
      >
        <div className="flex items-start gap-1.5">
          {variant === "textarea" ? (
            <textarea
              ref={(node) => {
                inputRef.current = node;
              }}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  cancel();
                } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  void commit();
                }
              }}
              rows={3}
              className={cn(editorCommon, editorBorder, "resize-y")}
            />
          ) : (
            <input
              ref={(node) => {
                inputRef.current = node;
              }}
              type="text"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void commit();
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  cancel();
                }
              }}
              className={cn(editorCommon, editorBorder)}
            />
          )}
          {!hideButtons ? (
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={commit}
                disabled={saving}
                className="flex h-7 items-center rounded-md bg-sky-300 px-2 text-[11px] font-medium text-neutral-950 transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "Saving…" : saveLabel}
              </button>
              <button
                type="button"
                onClick={cancel}
                disabled={saving}
                className="flex h-7 items-center rounded-md bg-white/[0.06] px-2 text-[11px] font-medium text-white/80 transition-colors hover:bg-white/[0.1] disabled:opacity-60"
              >
                {cancelLabel}
              </button>
            </div>
          ) : null}
        </div>
        {error ? (
          <p className="text-[11px] text-rose-300">{error}</p>
        ) : (
          <p className="text-[10px] uppercase tracking-widest text-white/30">
            {variant === "textarea" ? "⌘ Enter to save · Esc to cancel" : "Enter to save · Esc to cancel"}
          </p>
        )}
      </div>
    );
  }
);
InlineEdit.displayName = "InlineEdit";

export { InlineEdit };
