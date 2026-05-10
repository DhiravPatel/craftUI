"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short label shown above the value, e.g. "Monthly active users". */
  label: string;
  /** Numeric value to display. Counts up on view. */
  value: number;
  /** Prefix shown before the value, e.g. "$". */
  prefix?: string;
  /** Suffix shown after the value, e.g. "k", "%". */
  suffix?: string;
  /** Number of decimal places to render. Default 0. */
  decimals?: number;
  /** Period-over-period change in percent (e.g. 12 for +12%). Negative values render in red. */
  change?: number;
  /** Optional sparkline data — small inline trend line at the bottom of the card. */
  sparkline?: number[];
  /** Color for the sparkline + trend indicator when positive. Default sky-400. */
  accent?: string;
  /** Total ms for the count-up. Default 1100. */
  duration?: number;
}

/**
 * StatCard — a polished metric card for landing-page hero / stats sections.
 * Renders the label, an animated value that counts up when the card scrolls
 * into view, an optional change indicator, and an optional inline sparkline.
 * The card lifts subtly on hover.
 */
const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      label,
      value,
      prefix = "",
      suffix = "",
      decimals = 0,
      change,
      sparkline,
      accent = "rgb(125, 211, 252)",
      duration = 1100,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [display, setDisplay] = React.useState(0);
    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const startedRef = React.useRef(false);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        wrapRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    // Count-up driven by requestAnimationFrame, kicked off when the card
    // enters the viewport. Uses an ease-out curve so the number lands softly.
    React.useEffect(() => {
      const node = wrapRef.current;
      if (!node) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting || startedRef.current) return;
          startedRef.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(value * eased);
            if (t < 1) requestAnimationFrame(animate);
            else setDisplay(value);
          };
          requestAnimationFrame(animate);
          obs.disconnect();
        },
        { threshold: 0.2 }
      );
      obs.observe(node);
      return () => obs.disconnect();
    }, [value, duration]);

    // Sparkline path — a smooth polyline through the data points, normalized
    // to the SVG box. Includes an under-curve area for visual weight.
    const spark = React.useMemo(() => {
      if (!sparkline || sparkline.length < 2) return null;
      const W = 100;
      const H = 28;
      const min = Math.min(...sparkline);
      const max = Math.max(...sparkline);
      const range = max - min || 1;
      const step = W / (sparkline.length - 1);
      const points = sparkline.map((v, i) => {
        const x = i * step;
        const y = H - ((v - min) / range) * H;
        return [x, y] as const;
      });
      const linePath = points
        .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
        .join(" ");
      const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;
      return { linePath, areaPath, W, H };
    }, [sparkline]);

    const isPositive = (change ?? 0) >= 0;

    return (
      <div
        ref={setRefs}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 text-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_50px_-18px_rgba(0,0,0,0.55)]",
          className
        )}
        style={style}
        {...props}
      >
        {/* Cursor-tracking glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(260px circle at 30% 0%, ${accent}26, transparent 65%)`,
          }}
        />

        {/* Header row: label + trend chip on the same line so the big value
            below gets the full card width. */}
        <div className="relative flex items-center justify-between gap-3">
          <p className="min-w-0 truncate text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
            {label}
          </p>
          {typeof change === "number" ? (
            <span
              className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
              style={{
                color: isPositive ? "rgb(74, 222, 128)" : "rgb(248, 113, 113)",
                background: isPositive
                  ? "rgba(34, 197, 94, 0.14)"
                  : "rgba(239, 68, 68, 0.14)",
              }}
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                width={10}
                height={10}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isPositive ? "rotate(0deg)" : "rotate(180deg)",
                }}
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
              {Math.abs(change)}%
            </span>
          ) : null}
        </div>

        <div className="relative mt-3 text-[34px] font-bold leading-none tracking-tight tabular-nums">
          {prefix}
          {display.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
          {suffix}
        </div>

        {spark ? (
          <svg
            aria-hidden
            viewBox={`0 0 ${spark.W} ${spark.H}`}
            preserveAspectRatio="none"
            className="relative mt-5 h-12 w-full"
          >
            <defs>
              <linearGradient
                id="stat-card-fill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={accent} stopOpacity={0.45} />
                <stop offset="100%" stopColor={accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <path d={spark.areaPath} fill="url(#stat-card-fill)" />
            <path
              d={spark.linePath}
              fill="none"
              stroke={accent}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </div>
    );
  }
);
StatCard.displayName = "StatCard";

export { StatCard };
