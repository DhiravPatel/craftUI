"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface RetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tilt of the grid plane in degrees. Default 65. */
  angle?: number;
  /** Grid cell size in px. Default 60. */
  cellSize?: number;
  /** Line color. Default sky. */
  lineColor?: string;
  /** Seconds for one full scroll loop. Default 12. */
  speed?: number;
  /** Overall grid opacity (0–1). Default 0.5. */
  gridOpacity?: number;
}

let retroGridCounter = 0;

/**
 * RetroGrid — an animated synthwave horizon: an infinite perspective grid that
 * scrolls toward the viewer, fading into the distance. Pure CSS (a tilted,
 * looping background), so it's lightweight and runs without JavaScript once
 * painted. Drop it behind a hero, a pricing CTA, or a 404 for an instant
 * retro-futuristic backdrop; render content as children on top.
 */
const RetroGrid = React.forwardRef<HTMLDivElement, RetroGridProps>(
  (
    {
      angle = 65,
      cellSize = 60,
      lineColor = "rgb(125, 211, 252)",
      speed = 12,
      gridOpacity = 0.5,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const id = React.useMemo(() => `retro-grid-${retroGridCounter++}`, []);
    const anim = `${id}-move`;

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={
          {
            "--rg-angle": `${angle}deg`,
            "--rg-cell": `${cellSize}px`,
            "--rg-line": lineColor,
            "--rg-speed": `${speed}s`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        <style>{`
          @keyframes ${anim} {
            to { transform: translateY(var(--rg-cell)); }
          }
        `}</style>
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]`}
          style={{ opacity: gridOpacity }}
        >
          <div
            className="absolute inset-x-[-100%] top-1/2 h-[200%] origin-top"
            style={{ transform: "rotateX(var(--rg-angle))" }}
          >
            <div
              className="absolute inset-0 h-[300%] w-full"
              style={{
                backgroundImage: `linear-gradient(to right, var(--rg-line) 1px, transparent 0), linear-gradient(to bottom, var(--rg-line) 1px, transparent 0)`,
                backgroundSize: "var(--rg-cell) var(--rg-cell)",
                animation: `${anim} var(--rg-speed) linear infinite`,
              }}
            />
          </div>
          {/* Distance fade. */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950" />
        </div>
        {children != null ? (
          <div className="relative">{children}</div>
        ) : null}
      </div>
    );
  }
);
RetroGrid.displayName = "RetroGrid";

export { RetroGrid };
