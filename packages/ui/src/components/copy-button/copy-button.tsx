"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onCopy"> {
  /** The string written to the clipboard when the button is clicked. */
  value: string;
  /** Button size in px (the inner icon scales with this). Default 36. */
  size?: number;
  /** Time (ms) the success state stays before reverting. Default 1600. */
  resetAfter?: number;
  /** Notified after a successful copy. */
  onCopy?: (value: string) => void;
  /** Optional label rendered to the right of the icon. */
  label?: React.ReactNode;
}

/**
 * CopyButton — a tiny icon button that copies `value` to the clipboard on
 * click. The icon cross-fades from a clipboard glyph to a check on success
 * and reverts after `resetAfter` ms. Pure CSS — both icons are kept in the
 * DOM and toggled via opacity + scale, so the morph reads as one fluid
 * motion instead of a hard swap.
 */
const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      size = 36,
      resetAfter = 1600,
      onCopy,
      label,
      className,
      style,
      onClick,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
    const timerRef = React.useRef<number | null>(null);

    React.useEffect(() => {
      return () => {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      };
    }, []);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          // Fallback for non-secure contexts.
          const ta = document.createElement("textarea");
          ta.value = value;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        setCopied(true);
        onCopy?.(value);
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(
          () => setCopied(false),
          resetAfter
        );
      } catch {
        /* noop — user-facing feedback handled by the caller if needed */
      }
    };

    const iconSize = Math.round(size * 0.45);

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        aria-label={copied ? "Copied" : "Copy"}
        aria-live="polite"
        className={cn(
          "group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 text-white/85 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60",
          label ? "px-3" : "",
          className
        )}
        style={{
          width: label ? undefined : size,
          height: size,
          ...style,
        }}
        {...props}
      >
        <span
          aria-hidden
          className="relative inline-flex items-center justify-center"
          style={{ width: iconSize, height: iconSize }}
        >
          {/* Copy icon — visible when not copied */}
          <svg
            viewBox="0 0 24 24"
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute inset-0 transition-all duration-200"
            style={{
              opacity: copied ? 0 : 1,
              transform: copied ? "scale(0.8) rotate(-12deg)" : "scale(1)",
            }}
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {/* Check icon — visible after a successful copy */}
          <svg
            viewBox="0 0 24 24"
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke="rgb(74, 222, 128)"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute inset-0 transition-all duration-200"
            style={{
              opacity: copied ? 1 : 0,
              transform: copied ? "scale(1)" : "scale(0.6)",
            }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        {label ? (
          <span className="text-xs font-medium">
            {copied ? "Copied" : label}
          </span>
        ) : null}
      </button>
    );
  }
);
CopyButton.displayName = "CopyButton";

export { CopyButton };
