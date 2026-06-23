"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PasswordCriterion {
  /** Stable id used as the React key. */
  id: string;
  /** Human label shown in the checklist. */
  label: string;
  /** Returns true when the password satisfies this criterion. */
  test: (value: string) => boolean;
}

export interface PasswordStrengthMeterProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type"
  > {
  /** Controlled value. */
  value?: string;
  /** Initial value (uncontrolled). */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Override the default criteria set. */
  criteria?: PasswordCriterion[];
  /** Fires whenever the computed score changes (0–4). */
  onScoreChange?: (score: number) => void;
  /** Show the show/hide eye toggle. Default true. */
  showToggle?: boolean;
  /** Hide the criteria checklist. Default false. */
  hideCriteria?: boolean;
  /** Five labels for the strength tiers (0..4). */
  strengthLabels?: [string, string, string, string, string];
}

const DEFAULT_CRITERIA: PasswordCriterion[] = [
  { id: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { id: "upper", label: "Includes an uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "number", label: "Includes a number", test: (v) => /\d/.test(v) },
  { id: "special", label: "Includes a symbol", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const TIERS = [
  { color: "rgb(115, 115, 115)" },
  { color: "rgb(244, 114, 182)" }, // rose
  { color: "rgb(251, 191, 36)" }, // amber
  { color: "rgb(125, 211, 252)" }, // sky
  { color: "rgb(74, 222, 128)" }, // emerald
];

const DEFAULT_LABELS: [string, string, string, string, string] = [
  "Too weak",
  "Weak",
  "Fair",
  "Strong",
  "Very strong",
];

/**
 * PasswordStrengthMeter — a password input that scores the value live
 * against a checklist of criteria (length, uppercase, number, symbol by
 * default), renders a 4-segment strength bar that fills + tints as the
 * score climbs, and shows the criteria checklist with each row ticking
 * green when it passes. Includes a show/hide eye toggle. Fully callback
 * driven via `onChange` / `onScoreChange`.
 */
const PasswordStrengthMeter = React.forwardRef<
  HTMLInputElement,
  PasswordStrengthMeterProps
>(
  (
    {
      value,
      defaultValue,
      onChange,
      criteria = DEFAULT_CRITERIA,
      onScoreChange,
      showToggle = true,
      hideCriteria = false,
      strengthLabels = DEFAULT_LABELS,
      className,
      placeholder = "Enter a password",
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue ?? "");
    const current = isControlled ? value! : internal;

    const [visible, setVisible] = React.useState(false);

    const passed = criteria.map((c) => ({ ...c, ok: c.test(current) }));
    const passedCount = passed.filter((p) => p.ok).length;
    // Score 0–4: empty -> 0, else proportional to passed/criteria capped at 4.
    const score = current.length === 0
      ? 0
      : Math.min(4, Math.max(1, Math.round((passedCount / criteria.length) * 4)));

    const lastScore = React.useRef(score);
    React.useEffect(() => {
      if (lastScore.current !== score) {
        lastScore.current = score;
        onScoreChange?.(score);
      }
    }, [score, onScoreChange]);

    const setValue = (v: string) => {
      if (!isControlled) setInternal(v);
      onChange?.(v);
    };

    return (
      <div className={cn("w-full", className)}>
        <div className="relative">
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            value={current}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="block w-full rounded-lg border border-white/10 bg-neutral-900 px-3.5 py-2.5 pr-10 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-300/50 focus:ring-2 focus:ring-sky-300/30"
            {...props}
          />
          {showToggle ? (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "Hide password" : "Show password"}
              aria-pressed={visible}
              tabIndex={-1}
              className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {visible ? (
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M3 3l18 18M10.6 6.1A10.1 10.1 0 0 1 12 6c5 0 9.3 3.4 11 6-.6 1-1.6 2.3-3 3.5M6.1 7.6C4.2 8.9 2.7 10.6 1 12c1.7 2.6 6 6 11 6 1.4 0 2.7-.3 4-.7M9.9 9.9A3 3 0 0 0 12 15a3 3 0 0 0 2.1-.9"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" aria-hidden>
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
        </div>

        {/* Strength bar */}
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex flex-1 gap-1">
            {[0, 1, 2, 3].map((i) => {
              const active = i < score;
              const tierColor = TIERS[score]?.color ?? TIERS[0]?.color ?? "rgb(115, 115, 115)";
              return (
                <span
                  key={i}
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]"
                  aria-hidden
                >
                  <span
                    className="block h-full rounded-full transition-[width,background] duration-300 ease-out"
                    style={{
                      width: active ? "100%" : "0%",
                      background: tierColor,
                    }}
                  />
                </span>
              );
            })}
          </div>
          <span
            className="min-w-[80px] text-right text-[11px] font-medium text-white/55"
            aria-live="polite"
          >
            {current.length > 0 ? strengthLabels[score] : ""}
          </span>
        </div>

        {/* Criteria checklist */}
        {!hideCriteria ? (
          <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {passed.map((c) => (
              <li
                key={c.id}
                className={cn(
                  "flex items-center gap-1.5 text-[11px] transition-colors",
                  c.ok ? "text-emerald-300" : "text-white/45"
                )}
              >
                <span
                  className={cn(
                    "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full",
                    c.ok
                      ? "bg-emerald-400/15 ring-1 ring-emerald-400/30"
                      : "bg-white/[0.05] ring-1 ring-white/10"
                  )}
                  aria-hidden
                >
                  {c.ok ? (
                    <svg width={8} height={8} viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12l5 5L20 7"
                        stroke="currentColor"
                        strokeWidth={3.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </span>
                {c.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
);
PasswordStrengthMeter.displayName = "PasswordStrengthMeter";

export { PasswordStrengthMeter };
