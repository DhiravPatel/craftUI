"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface AnimatedChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Numeric series to plot. */
  data: number[];
  /** Render style. Default "area". */
  variant?: "line" | "area" | "bar";
  /** Stroke / bar color. Default sky-400. */
  color?: string;
  /** Width in px. Default 480. */
  width?: number;
  /** Height in px. Default 220. */
  height?: number;
  /** Stroke width for line/area variants. Default 2. */
  strokeWidth?: number;
  /** Total ms for the entrance animation. Default 1500. */
  duration?: number;
  /** When false, the chart is drawn fully on mount with no animation. Default true. */
  animateOnView?: boolean;
  /** When true, render subtle x-axis grid lines. Default true. */
  grid?: boolean;
}

/**
 * AnimatedChart — a self-drawing SVG chart for landing-page metrics. The
 * line/area variants animate by sliding `stroke-dashoffset` from the path
 * length down to zero, which traces the line on screen. The bar variant
 * scales each bar from 0 to its target height with a stagger.
 *
 * Animation kicks in when the chart scrolls into view (via IntersectionObserver).
 */
const AnimatedChart = React.forwardRef<HTMLDivElement, AnimatedChartProps>(
  (
    {
      data,
      variant = "area",
      color = "rgb(125, 211, 252)",
      width = 480,
      height = 220,
      strokeWidth = 2,
      duration = 1500,
      animateOnView = true,
      grid = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = React.useState(!animateOnView);
    const fillId = React.useId().replace(/[^a-zA-Z0-9]/g, "");

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        wrapRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    React.useEffect(() => {
      if (!animateOnView) return;
      const node = wrapRef.current;
      if (!node) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(node);
      return () => obs.disconnect();
    }, [animateOnView]);

    const padding = 24;
    const innerW = width - padding * 2;
    const innerH = height - padding * 2;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = data.length > 1 ? innerW / (data.length - 1) : 0;

    const points = data.map((v, i) => {
      const x = padding + i * step;
      const y = padding + innerH - ((v - min) / range) * innerH;
      return [x, y] as const;
    });

    const linePath = points
      .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
      .join(" ");
    const areaPath = `${linePath} L ${
      padding + (data.length - 1) * step
    } ${padding + innerH} L ${padding} ${padding + innerH} Z`;

    // Approximate path length for stroke-dashoffset animation. Using the
    // chord-length sum is a close-enough approximation for animation.
    const pathLength = React.useMemo(() => {
      let total = 0;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1]!;
        const b = points[i]!;
        total += Math.hypot(b[0] - a[0], b[1] - a[1]);
      }
      return Math.max(1, total);
    }, [points]);

    const gridLines = grid ? [0.25, 0.5, 0.75] : [];

    return (
      <div
        ref={setRefs}
        className={cn("relative inline-block", className)}
        style={{ width, height, ...style }}
        {...props}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          aria-hidden
        >
          <defs>
            <linearGradient id={`ac-fill-${fillId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.45} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          {gridLines.map((g, i) => {
            const y = padding + innerH * g;
            return (
              <line
                key={i}
                x1={padding}
                x2={padding + innerW}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeDasharray="3 4"
              />
            );
          })}

          {variant === "bar" ? (
            data.map((v, i) => {
              const barW = innerW / data.length - 4;
              const x = padding + i * (innerW / data.length) + 2;
              const targetH = ((v - min) / range) * innerH;
              return (
                <rect
                  key={i}
                  x={x}
                  width={Math.max(2, barW)}
                  y={padding + innerH - (visible ? targetH : 0)}
                  height={visible ? targetH : 0}
                  rx={3}
                  fill={color}
                  style={{
                    transition: `y ${duration * 0.7}ms cubic-bezier(0.22,1,0.36,1) ${
                      i * 30
                    }ms, height ${duration * 0.7}ms cubic-bezier(0.22,1,0.36,1) ${
                      i * 30
                    }ms`,
                  }}
                />
              );
            })
          ) : (
            <>
              {variant === "area" ? (
                <path
                  d={areaPath}
                  fill={`url(#ac-fill-${fillId})`}
                  opacity={visible ? 1 : 0}
                  style={{
                    transition: `opacity ${duration * 0.6}ms ease ${
                      duration * 0.4
                    }ms`,
                  }}
                />
              ) : null}
              <path
                d={linePath}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLength}
                strokeDashoffset={visible ? 0 : pathLength}
                style={{
                  transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.22,1,0.36,1)`,
                }}
              />
              {/* Trailing dot for line/area */}
              {points.length > 0 ? (
                <circle
                  cx={points[points.length - 1]![0]}
                  cy={points[points.length - 1]![1]}
                  r={4}
                  fill={color}
                  opacity={visible ? 1 : 0}
                  style={{
                    transition: `opacity 220ms ease ${duration}ms`,
                  }}
                />
              ) : null}
            </>
          )}
        </svg>
      </div>
    );
  }
);
AnimatedChart.displayName = "AnimatedChart";

export { AnimatedChart };
