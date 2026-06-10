"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ApiKeyDisplayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** The secret value. */
  value: string;
  /** Title shown above the key (e.g. "Production secret key"). */
  label?: string;
  /** Optional environment / status badge text. */
  badge?: string;
  /** Tone of the badge. Default "neutral". */
  badgeTone?: "success" | "warning" | "danger" | "neutral";
  /** ISO date or human string for creation. */
  createdAt?: string;
  /** Optional ISO date or human string for expiry. Triggers an "expires in" hint. */
  expiresAt?: string;
  /** Last 4 chars are always shown, the rest is masked. Default 4. */
  visibleChars?: number;
  /** Whether the value starts visible. Default false. */
  defaultVisible?: boolean;
  /** Fires after copy succeeds. */
  onCopy?: () => void;
  /** When present, renders a "Rotate" button. */
  onRotate?: () => void;
  /** Hide the show/hide eye button. Default false. */
  hideToggle?: boolean;
}

const TONE: Record<NonNullable<ApiKeyDisplayProps["badgeTone"]>, string> = {
  success: "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/25",
  warning: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/25",
  danger: "bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/25",
  neutral: "bg-white/[0.06] text-white/70 ring-1 ring-white/10",
};

function maskValue(value: string, visibleChars: number): string {
  if (value.length <= visibleChars) return value;
  // Preserve any prefix like "sk_live_" up to the second underscore so it stays readable.
  const match = value.match(/^([a-z]+_[a-z]+_)/i);
  const prefix = match?.[1] ?? "";
  const tail = value.slice(value.length - visibleChars);
  const middleLen = Math.max(value.length - prefix.length - visibleChars, 4);
  return `${prefix}${"•".repeat(Math.min(middleLen, 24))}${tail}`;
}

function CopyIcon({ done }: { done: boolean }) {
  if (done) {
    return (
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12l5 5L20 7"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x={8}
        y={8}
        width={12}
        height={12}
        rx={2}
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <path
        d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
        stroke="currentColor"
        strokeWidth={1.6}
      />
    </svg>
  );
}

/**
 * ApiKeyDisplay — a masked-secret row for dashboards (Stripe, Vercel,
 * GitHub PAT settings, etc.). Shows the key with all but the last few
 * characters replaced by bullets, a show/hide eye toggle, a copy-to-clipboard
 * button with a green check confirmation, and an optional "Rotate" action.
 * The label/badge/created/expires metadata renders above the value field.
 */
const ApiKeyDisplay = React.forwardRef<HTMLDivElement, ApiKeyDisplayProps>(
  (
    {
      value,
      label,
      badge,
      badgeTone = "neutral",
      createdAt,
      expiresAt,
      visibleChars = 4,
      defaultVisible = false,
      onCopy,
      onRotate,
      hideToggle = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(defaultVisible);
    const [copied, setCopied] = React.useState(false);
    const copyTimer = React.useRef<number | undefined>(undefined);

    React.useEffect(
      () => () => {
        if (copyTimer.current) window.clearTimeout(copyTimer.current);
      },
      []
    );

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopy?.();
        if (copyTimer.current) window.clearTimeout(copyTimer.current);
        copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
      } catch {
        // ignore — clipboard might be blocked
      }
    };

    const display = visible ? value : maskValue(value, visibleChars);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-xl rounded-2xl border border-white/10 bg-neutral-950 p-4 text-white",
          className
        )}
        style={style}
        {...props}
      >
        {(label || badge) && (
          <div className="mb-3 flex items-center justify-between gap-3">
            {label ? (
              <p className="text-sm font-medium text-white/85">{label}</p>
            ) : (
              <span />
            )}
            {badge ? (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest",
                  TONE[badgeTone]
                )}
              >
                {badge}
              </span>
            ) : null}
          </div>
        )}

        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1.5">
          <div className="min-w-0 flex-1 truncate px-2 font-mono text-[13px] tracking-tight text-white/90">
            {display}
          </div>
          {!hideToggle ? (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-pressed={visible}
              aria-label={visible ? "Hide secret" : "Show secret"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {visible ? (
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M3 3l18 18M10.6 6.1A10.1 10.1 0 0 1 12 6c5 0 9.3 3.4 11 6-.6 1-1.6 2.3-3 3.5M6.1 7.6C4.2 8.9 2.7 10.6 1 12c1.7 2.6 6 6 11 6 1.4 0 2.7-.3 4-.7M9.9 9.9A3 3 0 0 0 12 15a3 3 0 0 0 2.1-.9"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                    stroke="currentColor"
                    strokeWidth={1.6}
                  />
                  <circle cx={12} cy={12} r={3} stroke="currentColor" strokeWidth={1.6} />
                </svg>
              )}
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy to clipboard"
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
              copied
                ? "bg-emerald-400/15 text-emerald-300"
                : "text-white/55 hover:bg-white/[0.06] hover:text-white"
            )}
          >
            <CopyIcon done={copied} />
          </button>
          {onRotate ? (
            <button
              type="button"
              onClick={onRotate}
              aria-label="Rotate key"
              className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-medium text-white/65 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M3 12a9 9 0 0 1 15.5-6.3M21 4v5h-5M21 12a9 9 0 0 1-15.5 6.3M3 20v-5h5"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Rotate
            </button>
          ) : null}
        </div>

        {(createdAt || expiresAt) && (
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[11px] text-white/45">
            {createdAt ? <span>Created {createdAt}</span> : null}
            {expiresAt ? <span>Expires {expiresAt}</span> : null}
          </div>
        )}
      </div>
    );
  }
);
ApiKeyDisplay.displayName = "ApiKeyDisplay";

export { ApiKeyDisplay };
