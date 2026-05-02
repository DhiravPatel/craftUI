"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface OrbitingCirclesProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Items spaced evenly around the orbit. */
  items: React.ReactNode[];
  /** Optional content rendered at the center of the orbit. */
  center?: React.ReactNode;
  /** Orbit radius in px. Default 120. */
  radius?: number;
  /** Orbit duration in seconds. Default 20. */
  duration?: number;
  /** Reverse rotation direction. Default false. */
  reverse?: boolean;
  /** Show a faint dashed orbit path. Default true. */
  showPath?: boolean;
  /** Padding (in px) around the ring before clipping. Default 24. */
  padding?: number;
}

const OrbitingCircles = React.forwardRef<HTMLDivElement, OrbitingCirclesProps>(
  (
    {
      items,
      center,
      radius = 120,
      duration = 20,
      reverse = false,
      showPath = true,
      padding = 24,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const angleStep = items.length > 0 ? 360 / items.length : 0;
    const size = radius * 2 + padding * 2;
    return (
      <div
        ref={ref}
        className={cn("relative flex items-center justify-center", className)}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        {showPath ? (
          <span
            aria-hidden
            className="pointer-events-none absolute rounded-full border border-dashed border-foreground/15"
            style={{ width: radius * 2, height: radius * 2 }}
          />
        ) : null}
        {center ? (
          <div className="absolute z-10 flex items-center justify-center">
            {center}
          </div>
        ) : null}
        <div
          className="absolute animate-spin"
          style={{
            width: radius * 2,
            height: radius * 2,
            animationDuration: `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {items.map((it, i) => {
            const angle = i * angleStep;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg) translateY(-${radius}px)`,
                }}
              >
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  <div
                    className="animate-spin"
                    style={{
                      animationDuration: `${duration}s`,
                      animationDirection: reverse ? "normal" : "reverse",
                    }}
                  >
                    {it}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
OrbitingCircles.displayName = "OrbitingCircles";

export { OrbitingCircles };
