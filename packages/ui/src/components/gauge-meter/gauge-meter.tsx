"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface GaugeMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value. Will be clamped to [min, max]. */
  value: number;
  /** Lower bound of the gauge. Default 0. */
  min?: number;
  /** Upper bound of the gauge. Default 100. */
  max?: number;
  /** Outer diameter of the gauge in px. Default 200. */
  size?: number;
  /** Stroke width of the arc in px. Default size * 0.11. */
  strokeWidth?: number;
  /** Caption shown below the value. */
  label?: string;
  /** Suffix appended to the displayed value, e.g. "%", " req/s". */
  suffix?: string;
  /** Decimal places for the displayed value. Default 0. */
  decimals?: number;
  /** Color of the filled portion when no `zones` are provided. */
  accent?: string;
  /** Color of the unfilled track. */
  trackColor?: string;
  /** Optional color stops keyed by ratio (0..1). When provided, the bar
   *  color reflects the current value's zone — e.g. green→amber→red. */
  zones?: { stop: number; color: string }[];
  /** Total ms for the sweep on mount / value change. Default 1100. */
  duration?: number;
  /** When true, the value counts up alongside the sweep. Default true. */
  animateValue?: boolean;
  /** Render tick marks around the arc. Default true. */
  showTicks?: boolean;
  /** Number of ticks across the arc. Default 11. */
  tickCount?: number;
}

/** Pick the zone color whose stop is the smallest one >= ratio.
 *  Falls back to the last zone if all stops are smaller. */
function colorForRatio(
  ratio: number,
  zones: { stop: number; color: string }[] | undefined,
  fallback: string
) {
  if (!zones || zones.length === 0) return fallback;
  const sorted = [...zones].sort((a, b) => a.stop - b.stop);
  for (const z of sorted) if (ratio <= z.stop) return z.color;
  return sorted[sorted.length - 1]!.color;
}

/**
 * GaugeMeter — a half-circle KPI gauge. Animates a sweep from min→value on
 * mount and whenever `value` changes, with an optional zoned color ramp for
 * traffic-light-style indicators (green / amber / red).
 */
const GaugeMeter = React.forwardRef<HTMLDivElement, GaugeMeterProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      size = 200,
      strokeWidth,
      label,
      suffix = "",
      decimals = 0,
      accent = "rgb(125, 211, 252)",
      trackColor = "rgba(255, 255, 255, 0.08)",
      zones,
      duration = 1100,
      animateValue = true,
      showTicks = true,
      tickCount = 11,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const sw = strokeWidth ?? Math.max(8, Math.round(size * 0.11));
    const clamped = Math.max(min, Math.min(max, value));
    const targetRatio = (clamped - min) / Math.max(1e-9, max - min);

    // Drive the sweep + count-up off a single rAF tween that re-runs whenever
    // the target ratio changes, so toggling values feels snappy and clean.
    const [tween, setTween] = React.useState(0);
    const tweenRef = React.useRef(0);
    React.useEffect(() => {
      const start = performance.now();
      const from = tweenRef.current;
      const to = targetRatio;
      let raf = 0;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = from + (to - from) * eased;
        tweenRef.current = v;
        setTween(v);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [targetRatio, duration]);

    // Geometry — a half circle from 180° to 360°. Arc length = π * r, and
    // we use stroke-dashoffset to animate the visible portion.
    const r = (size - sw) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const half = Math.PI * r;
    const dash = half;
    const offset = half * (1 - tween);
    const color = colorForRatio(tween, zones, accent);

    const display = animateValue ? min + tween * (max - min) : clamped;

    const ticks = React.useMemo(() => {
      if (!showTicks) return [];
      const arr = [] as { x1: number; y1: number; x2: number; y2: number }[];
      for (let i = 0; i < tickCount; i++) {
        const t = i / (tickCount - 1);
        const angle = Math.PI + Math.PI * t; // 180° to 360°
        const inner = r - sw * 0.7;
        const outer = r - sw * 0.25;
        arr.push({
          x1: cx + Math.cos(angle) * inner,
          y1: cy + Math.sin(angle) * inner,
          x2: cx + Math.cos(angle) * outer,
          y2: cy + Math.sin(angle) * outer,
        });
      }
      return arr;
    }, [showTicks, tickCount, r, sw, cx, cy]);

    const heightPct = 0.62; // crop the bottom half away — we only show the top arc

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex flex-col items-center text-white",
          className
        )}
        style={style}
        {...props}
      >
        <div
          style={{ width: size, height: Math.round(size * heightPct) }}
          className="relative"
        >
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="absolute left-0 top-0"
          >
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={trackColor}
              strokeWidth={sw}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${Math.PI * 2 * r}`}
              transform={`rotate(180 ${cx} ${cy})`}
            />
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={sw}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${Math.PI * 2 * r}`}
              strokeDashoffset={offset}
              transform={`rotate(180 ${cx} ${cy})`}
              style={{
                filter: `drop-shadow(0 0 12px color-mix(in oklab, ${color} 55%, transparent))`,
                transition: "stroke 240ms ease",
              }}
            />
            {ticks.map((t, i) => (
              <line
                key={i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="currentColor"
                strokeOpacity={0.18}
                strokeWidth={1}
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div
            className="absolute inset-x-0 flex flex-col items-center"
            style={{ top: size * 0.28 }}
          >
            <div className="text-[34px] font-bold leading-none tracking-tight tabular-nums">
              {display.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })}
              {suffix ? (
                <span className="text-base font-semibold text-white/55">
                  {suffix}
                </span>
              ) : null}
            </div>
            {label ? (
              <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
                {label}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
GaugeMeter.displayName = "GaugeMeter";

export { GaugeMeter };
