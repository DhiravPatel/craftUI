"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface StatRingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value. */
  value: number;
  /** Maximum value the ring represents (full sweep). */
  max?: number;
  /** Diameter of the ring in px. Default 180. */
  size?: number;
  /** Stroke thickness in px. Default 14. */
  strokeWidth?: number;
  /** Label shown under the value. */
  label?: string;
  /** Optional unit suffix on the value, e.g. "%", "GB". */
  unit?: string;
  /** Trend delta vs previous period (positive = up). */
  trend?: number;
  /** Suffix shown next to the trend chip. */
  trendSuffix?: string;
  /** Format the central value. Default toLocaleString. */
  formatValue?: (value: number) => React.ReactNode;
  /** Accent color. Default sky. */
  color?: string;
  /** Track color behind the arc. */
  trackColor?: string;
  /** Whether the arc should animate from 0 on mount. Default true. */
  animateOnMount?: boolean;
  /** Cap the arc — "round" or "butt". Default "round". */
  cap?: "round" | "butt";
}

/**
 * StatRing — a circular KPI with an animated SVG arc, a large central
 * value, an optional label, and an optional trend pill. The arc draws
 * from 0% to the target percentage on mount using
 * `stroke-dasharray` + a CSS transition, so it animates cleanly without
 * any animation library. The center stack supports a custom `formatValue`
 * for things like compact numbers or currency.
 */
const StatRing = React.forwardRef<HTMLDivElement, StatRingProps>(
  (
    {
      value,
      max = 100,
      size = 180,
      strokeWidth = 14,
      label,
      unit,
      trend,
      trendSuffix,
      formatValue,
      color = "rgb(125, 211, 252)",
      trackColor = "rgba(255, 255, 255, 0.08)",
      animateOnMount = true,
      cap = "round",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const safeMax = Math.max(max, 0.0001);
    const fraction = Math.max(0, Math.min(1, value / safeMax));

    // Animate from 0 → target via state so the CSS transition fires once.
    const [progress, setProgress] = React.useState(animateOnMount ? 0 : fraction);
    React.useEffect(() => {
      const id = window.requestAnimationFrame(() => setProgress(fraction));
      return () => window.cancelAnimationFrame(id);
    }, [fraction]);

    const offset = circumference * (1 - progress);
    const trendUp = typeof trend === "number" && trend > 0;
    const trendDown = typeof trend === "number" && trend < 0;
    const trendZero = trend === 0;

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center text-white",
          className
        )}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap={cap}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition:
                "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)",
              filter: `drop-shadow(0 0 6px ${color}66)`,
            }}
          />
        </svg>

        {/* Center stack */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <p
            className="font-semibold tabular-nums"
            style={{ fontSize: size * 0.22, lineHeight: 1 }}
          >
            {formatValue
              ? formatValue(value)
              : value.toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}
            {unit ? (
              <span
                className="text-white/60"
                style={{ fontSize: size * 0.11 }}
              >
                {unit}
              </span>
            ) : null}
          </p>
          {label ? (
            <p
              className="mt-1 text-white/55"
              style={{ fontSize: size * 0.075 }}
            >
              {label}
            </p>
          ) : null}
          {typeof trend === "number" ? (
            <p
              className={cn(
                "mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                trendUp && "bg-emerald-400/15 text-emerald-300",
                trendDown && "bg-rose-400/15 text-rose-300",
                trendZero && "bg-white/[0.06] text-white/55"
              )}
            >
              <svg
                width={9}
                height={9}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                style={{
                  transform: trendDown ? "rotate(180deg)" : undefined,
                  opacity: trendZero ? 0.4 : 1,
                }}
              >
                <path
                  d="M12 5l7 7h-4v7h-6v-7H5l7-7Z"
                  fill="currentColor"
                />
              </svg>
              {Math.abs(trend)}
              {trendSuffix ?? "%"}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
);
StatRing.displayName = "StatRing";

export { StatRing };
