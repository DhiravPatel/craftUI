"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type ThemeSelectorValue = "light" | "dark" | "system";

export interface ThemeSelectorOption {
  /** Stable value emitted on change. */
  value: ThemeSelectorValue;
  /** Short label shown under the preview. */
  label: string;
  /** Optional one-line caption shown under the label. */
  description?: string;
}

export interface ThemeSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled value. */
  value?: ThemeSelectorValue;
  /** Initial value (uncontrolled). Default "system". */
  defaultValue?: ThemeSelectorValue;
  /** Fires whenever the user picks a theme. */
  onChange?: (value: ThemeSelectorValue) => void;
  /** Override the default three options. Pass 1-3 entries. */
  options?: ThemeSelectorOption[];
  /** Accent color used for the active ring and check badge. */
  accentColor?: string;
  /** Layout density. `sm` shrinks the preview area. Default "md". */
  size?: "sm" | "md";
  /** Disable all interaction. */
  disabled?: boolean;
  /** Optional aria-label for the group (also used by the radiogroup role). */
  ariaLabel?: string;
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";

const DEFAULT_OPTIONS: ThemeSelectorOption[] = [
  {
    value: "light",
    label: "Light",
    description: "Bright surface",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Easy on the eyes",
  },
  {
    value: "system",
    label: "System",
    description: "Match your OS",
  },
];

/**
 * ThemeSelector — a three-option visual theme picker (Light / Dark / System)
 * rendered as a row of clickable cards, each showing a mini browser-window
 * mockup that previews how the app will look. The active card gets a sky
 * accent ring and a small check badge in the top-right corner of the preview.
 *
 * Use this when you want a richer choice than a binary toggle — e.g. a
 * settings page, an onboarding step, or the first time a user lands on a
 * dark-mode-capable product. Works fully uncontrolled (defaults to `system`)
 * or controlled via `value` + `onChange`. Keyboard accessible: arrow keys
 * move focus between cards inside the radiogroup, Space / Enter selects.
 */
const ThemeSelector = React.forwardRef<HTMLDivElement, ThemeSelectorProps>(
  (
    {
      value,
      defaultValue = "system",
      onChange,
      options = DEFAULT_OPTIONS,
      accentColor = DEFAULT_ACCENT,
      size = "md",
      disabled = false,
      ariaLabel = "Theme",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] =
      React.useState<ThemeSelectorValue>(defaultValue);
    const current: ThemeSelectorValue = isControlled
      ? (value as ThemeSelectorValue)
      : internalValue;

    const select = React.useCallback(
      (next: ThemeSelectorValue) => {
        if (disabled) return;
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      },
      [disabled, isControlled, onChange]
    );

    const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLButtonElement>,
      idx: number
    ) => {
      if (disabled) return;
      const last = options.length - 1;
      if (last < 0) return;

      let nextIdx: number | null = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextIdx = idx === last ? 0 : idx + 1;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        nextIdx = idx === 0 ? last : idx - 1;
      } else if (e.key === "Home") {
        nextIdx = 0;
      } else if (e.key === "End") {
        nextIdx = last;
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        const opt = options[idx];
        if (opt) select(opt.value);
        return;
      }

      if (nextIdx !== null) {
        e.preventDefault();
        const opt = options[nextIdx];
        if (opt) {
          select(opt.value);
          itemRefs.current[nextIdx]?.focus();
        }
      }
    };

    const previewSize = size === "sm" ? "h-20" : "h-28";

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        className={cn(
          "inline-flex w-full max-w-xl flex-col gap-3 rounded-2xl",
          className
        )}
        style={style}
        {...props}
      >
        <div
          className={cn(
            "grid gap-3",
            options.length === 1
              ? "grid-cols-1"
              : options.length === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          )}
        >
          {options.map((opt, i) => {
            const active = opt.value === current;
            return (
              <button
                key={opt.value}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                disabled={disabled}
                onClick={() => select(opt.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={cn(
                  "group/theme-card relative flex flex-col items-stretch gap-2 rounded-xl border p-2.5 text-left transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                  disabled
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer",
                  active
                    ? "border-transparent bg-white/[0.07]"
                    : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                )}
                style={
                  {
                    "--tw-ring-color": accentColor,
                    boxShadow: active
                      ? `0 0 0 2px ${accentColor}, 0 10px 30px -12px ${accentColor}55`
                      : undefined,
                  } as React.CSSProperties
                }
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-lg ring-1 ring-inset ring-white/10",
                    previewSize
                  )}
                >
                  <ThemePreview variant={opt.value} />
                  {active ? (
                    <span
                      className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-neutral-950 shadow-[0_2px_8px_rgba(0,0,0,0.35)] animate-craftui-theme-selector-pop"
                      style={{ background: accentColor }}
                      aria-hidden
                    >
                      <svg
                        width={12}
                        height={12}
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M5 12l5 5L20 7"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : null}
                </div>

                <div className="px-0.5 pb-0.5 pt-1 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium leading-tight transition-colors",
                      active ? "text-white" : "text-white/85"
                    )}
                  >
                    {opt.label}
                  </p>
                  {opt.description ? (
                    <p
                      className={cn(
                        "mt-0.5 truncate text-[11px] leading-snug transition-colors",
                        active ? "text-white/65" : "text-white/45"
                      )}
                    >
                      {opt.description}
                    </p>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <style>{`
          @keyframes craftui-theme-selector-pop {
            0% { transform: scale(0.3); opacity: 0; }
            60% { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-craftui-theme-selector-pop {
            animation: craftui-theme-selector-pop 240ms cubic-bezier(0.22,1,0.36,1) both;
          }
          @keyframes craftui-theme-selector-fade {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }
);
ThemeSelector.displayName = "ThemeSelector";

/* ---------- Preview mockups ---------- */

function ThemePreview({ variant }: { variant: ThemeSelectorValue }) {
  if (variant === "system") {
    return (
      <div className="absolute inset-0">
        {/* Diagonal split: left light, right dark */}
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute inset-0 bg-neutral-950"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
        {/* Light half content */}
        <MiniBrowser tone="light" half="left" />
        {/* Dark half content */}
        <MiniBrowser tone="dark" half="right" />
        {/* Diagonal seam highlight */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top right, transparent calc(50% - 0.5px), rgba(255,255,255,0.18) 50%, transparent calc(50% + 0.5px))",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0",
        variant === "light" ? "bg-white" : "bg-neutral-950"
      )}
    >
      <MiniBrowser tone={variant} />
    </div>
  );
}

function MiniBrowser({
  tone,
  half,
}: {
  tone: "light" | "dark";
  half?: "left" | "right";
}) {
  const isLight = tone === "light";
  const headerBg = isLight ? "bg-neutral-200" : "bg-neutral-800";
  const dot1 = isLight ? "bg-neutral-400/70" : "bg-neutral-600";
  const dot2 = isLight ? "bg-neutral-400/50" : "bg-neutral-700";
  const sidebarBg = isLight ? "bg-neutral-100" : "bg-neutral-900";
  const blockMuted = isLight ? "bg-neutral-300" : "bg-neutral-700";
  const blockStrong = isLight ? "bg-neutral-400" : "bg-neutral-600";
  const accentBar = isLight ? "bg-neutral-500" : "bg-neutral-500";

  // For system split we render two halves with clip paths.
  const clipStyle: React.CSSProperties | undefined =
    half === "left"
      ? { clipPath: "polygon(0 0, 100% 0, 0 100%)" }
      : half === "right"
      ? { clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }
      : undefined;

  return (
    <div className="absolute inset-0" style={clipStyle} aria-hidden>
      {/* Browser header */}
      <div
        className={cn(
          "absolute left-0 right-0 top-0 flex h-[14%] min-h-[10px] items-center gap-1 px-2",
          headerBg
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", dot1)} />
        <span className={cn("h-1.5 w-1.5 rounded-full", dot2)} />
        <span className={cn("h-1.5 w-1.5 rounded-full", dot2)} />
      </div>
      {/* Body */}
      <div className="absolute inset-x-0 bottom-0 top-[14%] flex">
        {/* Sidebar */}
        <div
          className={cn(
            "flex h-full w-[26%] flex-col gap-1.5 px-1.5 py-1.5",
            sidebarBg
          )}
        >
          <span className={cn("h-1 w-full rounded-sm", blockStrong)} />
          <span className={cn("h-1 w-3/4 rounded-sm", blockMuted)} />
          <span className={cn("h-1 w-1/2 rounded-sm", blockMuted)} />
          <span className={cn("h-1 w-2/3 rounded-sm", blockMuted)} />
        </div>
        {/* Main content */}
        <div className="flex h-full flex-1 flex-col gap-1.5 px-2 py-1.5">
          <span className={cn("h-1.5 w-1/2 rounded-sm", accentBar)} />
          <span className={cn("h-1 w-full rounded-sm", blockMuted)} />
          <span className={cn("h-1 w-5/6 rounded-sm", blockMuted)} />
          <div className="mt-auto flex gap-1.5">
            <span
              className={cn(
                "h-3 flex-1 rounded-sm",
                isLight ? "bg-neutral-300" : "bg-neutral-800"
              )}
            />
            <span
              className={cn(
                "h-3 flex-1 rounded-sm",
                isLight ? "bg-neutral-300" : "bg-neutral-800"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { ThemeSelector };
