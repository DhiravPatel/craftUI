"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PaperPlaneProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Stage width in px. Default 480. */
  width?: number;
  /** Stage height in px. Default 280. */
  height?: number;
  /** Time in seconds for one full path traversal. Default 9. */
  duration?: number;
  /** Plane size in px. Default 28. */
  size?: number;
  /** Plane color (and trail color base). */
  color?: string;
  /**
   * Optional override for the SVG path used by the plane and the trail.
   * The default is a soft S-curve across the stage.
   * The same path string is used for both `offset-path` and the trail SVG, so
   * its viewBox should match `width` x `height`.
   */
  path?: string;
  /** Show the dashed trail along the path. Default true. */
  trail?: boolean;
}

/**
 * PaperPlane — an SVG paper plane that loops along a CSS `offset-path`.
 * The path is rendered visually as a soft dashed trail beneath the plane,
 * so users can see the route the plane is taking.
 */
const PaperPlane = React.forwardRef<HTMLDivElement, PaperPlaneProps>(
  (
    {
      width = 480,
      height = 280,
      duration = 9,
      size = 28,
      color = "rgb(56, 189, 248)",
      path,
      trail = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const finalPath =
      path ??
      // S-curve from bottom-left to top-right and back.
      `M 30 ${height - 40} C ${width * 0.25} ${height - 200}, ${
        width * 0.55
      } ${height - 60}, ${width - 40} 50`;

    const animName = React.useId().replace(/[^a-zA-Z0-9]/g, "");
    const keyframeName = `paperPlanePath_${animName}`;

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={{ width, height, ...style }}
        {...props}
      >
        {trail ? (
          <svg
            aria-hidden
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            className="pointer-events-none absolute inset-0"
          >
            <path
              d={finalPath}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray="2 8"
              opacity={0.45}
            />
          </svg>
        ) : null}

        {/* The plane itself. offset-path drives both position and rotation. */}
        <span
          aria-hidden
          className="absolute left-0 top-0 inline-flex"
          style={{
            width: size,
            height: size,
            offsetPath: `path("${finalPath}")`,
            offsetRotate: "auto",
            // @ts-expect-error -- vendor-prefixed properties for older Safari.
            WebkitOffsetPath: `path("${finalPath}")`,
            WebkitOffsetRotate: "auto",
            animation: `${keyframeName} ${duration}s linear infinite`,
            filter: `drop-shadow(0 6px 10px ${color}66)`,
          }}
        >
          <svg viewBox="0 0 24 24" width={size} height={size}>
            <defs>
              <linearGradient
                id={`pp-${animName}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="white" stopOpacity={0.95} />
                <stop offset="100%" stopColor={color} stopOpacity={0.95} />
              </linearGradient>
            </defs>
            {/* Body — tip points right (+X) so it leads the path direction */}
            <path
              d="M22 12 L2 4 L10 12 L2 20 Z"
              fill={`url(#pp-${animName})`}
              stroke={color}
              strokeWidth={0.6}
              strokeLinejoin="round"
            />
            {/* Inner crease so it reads as folded paper */}
            <path
              d="M10 12 L2 4 L2 20 Z"
              fill="rgba(0,0,0,0.18)"
            />
          </svg>
        </span>

        <style>{`
          @keyframes ${keyframeName} {
            0%   { offset-distance: 0%;   opacity: 0; }
            8%   { opacity: 1; }
            92%  { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
        `}</style>
      </div>
    );
  }
);
PaperPlane.displayName = "PaperPlane";

export { PaperPlane };
