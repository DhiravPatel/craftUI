"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface UsageBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Current value (used amount). */
  value: number;
  /** Limit / cap. Pass `Infinity` to render an unlimited bar. */
  limit: number;
  /** Label shown above the bar, e.g. "Storage". */
  label?: string;
  /** Unit suffix appended to the value/limit, e.g. "GB", "requests". */
  unit?: string;
  /** Override how the count is rendered (e.g. format bytes). */
  formatCount?: (value: number, limit: number) => React.ReactNode;
  /** Fraction (0–1) at which the bar turns warning. Default 0.75. */
  warnAt?: number;
  /** Fraction (0–1) at which the bar turns danger. Default 0.9. */
  dangerAt?: number;
  /** Base accent color. Default sky. */
  color?: string;
  /** Warning color. Default amber. */
  warnColor?: string;
  /** Danger color. Default rose. */
  dangerColor?: string;
  /** Height of the bar in px. Default 8. */
  height?: number;
  /** Optional hint shown below the bar (e.g. "Resets on Jan 1"). */
  hint?: React.ReactNode;
}

/**
 * UsageBar — a quota / usage indicator for billing and admin dashboards.
 * Shows a labelled progress bar that shifts from accent → amber → rose as
 * usage crosses the warn / danger thresholds, with the current and limit
 * values rendered on the right. Pass `limit={Infinity}` for unlimited
 * plans and the bar renders as a flat "Unlimited" track.
 */
const UsageBar = React.forwardRef<HTMLDivElement, UsageBarProps>(
  (
    {
      value,
      limit,
      label,
      unit,
      formatCount,
      warnAt = 0.75,
      dangerAt = 0.9,
      color = "rgb(125, 211, 252)",
      warnColor = "rgb(251, 191, 36)",
      dangerColor = "rgb(244, 114, 182)",
      height = 8,
      hint,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const unlimited = !Number.isFinite(limit);
    const fraction = unlimited ? 0 : Math.max(0, Math.min(1, value / limit));
    const tone =
      fraction >= dangerAt ? "danger" : fraction >= warnAt ? "warn" : "ok";
    const fill = tone === "danger" ? dangerColor : tone === "warn" ? warnColor : color;

    const renderCount = () => {
      if (formatCount) return formatCount(value, limit);
      const fmt = (n: number) =>
        n.toLocaleString(undefined, { maximumFractionDigits: 2 });
      if (unlimited)
        return (
          <>
            <span className="font-mono tabular-nums">{fmt(value)}</span>
            {unit ? ` ${unit}` : ""}
            <span className="text-white/40"> / unlimited</span>
          </>
        );
      return (
        <>
          <span className="font-mono tabular-nums">{fmt(value)}</span>
          <span className="text-white/40">
            {" / "}
            {fmt(limit)}
            {unit ? ` ${unit}` : ""}
          </span>
        </>
      );
    };

    return (
      <div
        ref={ref}
        className={cn("w-full text-white", className)}
        style={style}
        {...props}
      >
        {(label || true) && (
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            {label ? (
              <span className="truncate text-sm font-medium text-white/85">
                {label}
              </span>
            ) : (
              <span />
            )}
            <span className="text-[12px] text-white/70">{renderCount()}</span>
          </div>
        )}
        <div
          className="relative w-full overflow-hidden rounded-full bg-white/[0.07]"
          style={{ height }}
          role="progressbar"
          aria-valuenow={Math.round(fraction * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        >
          {unlimited ? (
            <div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(45deg, ${color}33 0 8px, transparent 8px 16px)`,
              }}
            />
          ) : (
            <div
              className="h-full rounded-full transition-[width,background] duration-500 ease-out"
              style={{
                width: `${fraction * 100}%`,
                background: fill,
                boxShadow: tone === "danger" ? `0 0 12px ${fill}` : undefined,
              }}
            />
          )}
        </div>
        {hint ? (
          <p className="mt-1.5 text-[11px] text-white/45">{hint}</p>
        ) : null}
      </div>
    );
  }
);
UsageBar.displayName = "UsageBar";

export { UsageBar };
