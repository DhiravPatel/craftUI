"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type SparklineVariant = "line" | "area";

export interface SparklineProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "color"> {
  /** Series of numeric data points to plot. */
  data: number[];
  /** SVG viewport width in px. Default 100. */
  width?: number;
  /** SVG viewport height in px. Default 32. */
  height?: number;
  /** Render only the line or close it into a filled area. Default "line". */
  variant?: SparklineVariant;
  /** Stroke (and gradient base) color. Default sky-300. */
  color?: string;
  /** Opacity used for the filled area body. Default 0.18. */
  fillOpacity?: number;
  /** Path stroke width in px. Default 1.6. */
  strokeWidth?: number;
  /** Show a dot at the last data point. Default true. */
  showDot?: boolean;
  /** Override the dot color — defaults to `color`. */
  dotColor?: string;
  /** Show ticks at the first and last data points. Default false. */
  showFirstLast?: boolean;
  /** Smooth the line with cubic-bezier interpolation. Default true. */
  smooth?: boolean;
  /** Clamp the y-axis minimum (else uses min(data)). */
  min?: number;
  /** Clamp the y-axis maximum (else uses max(data)). */
  max?: number;
  /** Apply a vertical gradient stroke instead of a solid color. Default true. */
  gradient?: boolean;
  /** Accessible label — describes the trend for screen readers. */
  ariaLabel?: string;
  /** Stable id used to namespace SVG `<defs>`. Auto-derived when omitted. */
  id?: string;
}

const DEFAULT_COLOR = "rgb(125, 211, 252)";
const PADDING = 4;

/* ---------------------------------------------------------------- */
/* Deterministic id derivation                                      */
/* ---------------------------------------------------------------- */

/**
 * Derive a deterministic, DOM-safe id suffix from the input data + size.
 * Avoids Math.random / Date.now so server and client render the same markup.
 */
function deriveId(data: number[], width: number, height: number): string {
  // FNV-1a 32-bit — fast, stable, no deps.
  let hash = 0x811c9dc5;
  const mix = (n: number) => {
    hash ^= n & 0xff;
    hash = Math.imul(hash, 0x01000193);
  };
  for (let i = 0; i < data.length; i++) {
    const v = data[i] ?? 0;
    // Fold the value into 4 bytes via a stable scale.
    const scaled = Math.round(v * 1000) | 0;
    mix(scaled);
    mix(scaled >>> 8);
    mix(scaled >>> 16);
    mix(scaled >>> 24);
  }
  mix(width | 0);
  mix(height | 0);
  return (hash >>> 0).toString(36);
}

/* ---------------------------------------------------------------- */
/* Path builders                                                    */
/* ---------------------------------------------------------------- */

interface Pt {
  x: number;
  y: number;
}

function buildLinearPath(points: Pt[]): string {
  if (points.length === 0) return "";
  const first = points[0]!;
  let d = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const p = points[i]!;
    d += ` L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  }
  return d;
}

/**
 * Catmull-Rom -> cubic-bezier conversion. Produces a smooth curve that
 * passes through every input point without external libraries.
 */
function buildSmoothPath(points: Pt[]): string {
  if (points.length < 2) return buildLinearPath(points);
  const first = points[0]!;
  let d = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
  const tension = 6; // higher = tighter curve, less overshoot
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / tension;
    const cp1y = p1.y + (p2.y - p0.y) / tension;
    const cp2x = p2.x - (p3.x - p1.x) / tension;
    const cp2y = p2.y - (p3.y - p1.y) / tension;

    d +=
      ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)},` +
      ` ${cp2x.toFixed(2)} ${cp2y.toFixed(2)},` +
      ` ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

/* ---------------------------------------------------------------- */
/* Component                                                        */
/* ---------------------------------------------------------------- */

/**
 * Sparkline — an inline, axis-less SVG trend chart. Renders a single
 * series of `data` as either a line or a filled area, auto-scaling to
 * the range and padding the viewport so the curve never touches the
 * edges. Smoothing is on by default and uses a Catmull-Rom-derived
 * cubic-bezier path; setting `smooth={false}` falls back to straight
 * segments. With `gradient` (default) the stroke draws from a soft
 * vertical gradient anchored on `color`. A subtle dot marks the most
 * recent point; turn it off with `showDot={false}`. Pure SVG — drop it
 * inside a stat card, table row, or KPI tile.
 */
const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  (
    {
      data,
      width = 100,
      height = 32,
      variant = "line",
      color = DEFAULT_COLOR,
      fillOpacity = 0.18,
      strokeWidth = 1.6,
      showDot = true,
      dotColor,
      showFirstLast = false,
      smooth = true,
      min,
      max,
      gradient = true,
      ariaLabel,
      id,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const safeWidth = Math.max(8, width);
    const safeHeight = Math.max(8, height);

    // Stable id used to namespace gradient + clip defs.
    const reactId = React.useId().replace(/[:]/g, "");
    const derived = React.useMemo(
      () => deriveId(data, safeWidth, safeHeight),
      [data, safeWidth, safeHeight]
    );
    const uid = id ?? `craftui-sparkline-${reactId}-${derived}`;
    const gradientId = `${uid}-stroke`;
    const areaGradientId = `${uid}-fill`;

    // Compute normalised points.
    const points = React.useMemo<Pt[]>(() => {
      if (data.length === 0) return [];
      const lo = min ?? Math.min(...data);
      const hi = max ?? Math.max(...data);
      const span = hi - lo || 1; // avoid div-by-zero on flat series
      const innerW = safeWidth - PADDING * 2;
      const innerH = safeHeight - PADDING * 2;
      if (data.length === 1) {
        return [
          {
            x: safeWidth / 2,
            y: PADDING + innerH / 2,
          },
        ];
      }
      return data.map((raw, i) => {
        const value = Math.min(Math.max(raw, lo), hi);
        const x = PADDING + (i / (data.length - 1)) * innerW;
        const y = PADDING + innerH - ((value - lo) / span) * innerH;
        return { x, y };
      });
    }, [data, min, max, safeWidth, safeHeight]);

    const linePath = React.useMemo(
      () => (smooth ? buildSmoothPath(points) : buildLinearPath(points)),
      [points, smooth]
    );

    const areaPath = React.useMemo(() => {
      if (variant !== "area" || points.length === 0) return "";
      const first = points[0]!;
      const last = points[points.length - 1]!;
      const baseY = safeHeight - PADDING;
      return (
        linePath +
        ` L ${last.x.toFixed(2)} ${baseY.toFixed(2)}` +
        ` L ${first.x.toFixed(2)} ${baseY.toFixed(2)} Z`
      );
    }, [linePath, points, variant, safeHeight]);

    const lastPoint = points.length > 0 ? points[points.length - 1]! : null;
    const firstPoint = points.length > 0 ? points[0]! : null;

    const strokeRef = gradient ? `url(#${gradientId})` : color;
    const fillRef = gradient ? `url(#${areaGradientId})` : color;
    const resolvedDotColor = dotColor ?? color;

    const label =
      ariaLabel ??
      (data.length > 0
        ? `Trend with ${data.length} data points.`
        : "Empty trend chart.");

    return (
      <svg
        ref={ref}
        role="img"
        aria-label={label}
        viewBox={`0 0 ${safeWidth} ${safeHeight}`}
        width={safeWidth}
        height={safeHeight}
        preserveAspectRatio="none"
        className={cn("inline-block align-middle text-sky-300", className)}
        style={style}
        {...props}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity={1} />
            <stop offset="100%" stopColor={color} stopOpacity={0.55} />
          </linearGradient>
          <linearGradient
            id={areaGradientId}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor={color}
              stopOpacity={Math.min(1, Math.max(0, fillOpacity * 2.4))}
            />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {variant === "area" && areaPath ? (
          <path
            d={areaPath}
            fill={fillRef}
            stroke="none"
            opacity={gradient ? 1 : fillOpacity}
            className="craftui-sparkline-area"
          />
        ) : null}

        {linePath ? (
          <path
            d={linePath}
            fill="none"
            stroke={strokeRef}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="craftui-sparkline-line"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}

        {showFirstLast && firstPoint ? (
          <circle
            cx={firstPoint.x}
            cy={firstPoint.y}
            r={Math.max(1, strokeWidth)}
            fill={resolvedDotColor}
            opacity={0.55}
          />
        ) : null}

        {showFirstLast && lastPoint && lastPoint !== firstPoint ? (
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r={Math.max(1, strokeWidth)}
            fill={resolvedDotColor}
            opacity={0.55}
          />
        ) : null}

        {showDot && lastPoint ? (
          <g className="craftui-sparkline-dot">
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r={Math.max(2.6, strokeWidth + 1.2)}
              fill={resolvedDotColor}
              opacity={0.18}
            />
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r={Math.max(1.6, strokeWidth)}
              fill={resolvedDotColor}
            />
          </g>
        ) : null}

        <style>{`
          @keyframes craftui-sparkline-draw {
            from { stroke-dashoffset: 1; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes craftui-sparkline-fade {
            from { opacity: 0; transform: scale(0.4); }
            to { opacity: 1; transform: scale(1); }
          }
          .craftui-sparkline-line {
            stroke-dasharray: 1;
            pathLength: 1;
            animation: craftui-sparkline-draw 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .craftui-sparkline-area {
            animation: craftui-sparkline-draw 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .craftui-sparkline-dot {
            transform-box: fill-box;
            transform-origin: center;
            animation: craftui-sparkline-fade 320ms ease-out 520ms both;
          }
        `}</style>
      </svg>
    );
  }
);
Sparkline.displayName = "Sparkline";

export { Sparkline };
