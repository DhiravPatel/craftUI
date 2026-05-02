"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface Marquee3DProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Items to display. The list is duplicated internally for a seamless loop. */
  items: React.ReactNode[];
  /** Number of rows. Default 3. */
  rows?: number;
  /** Loop duration in seconds (lower = faster). Default 30. */
  duration?: number;
  /** X-axis tilt in degrees applied to the whole stage. Default 50. */
  tiltX?: number;
  /** Z-axis rotation in degrees. Default -15. */
  rotateZ?: number;
  /** Pause animation on hover. Default true. */
  pauseOnHover?: boolean;
  /** Spacing between items in px. Default 16. */
  gap?: number;
}

const Marquee3D = React.forwardRef<HTMLDivElement, Marquee3DProps>(
  (
    {
      items,
      rows = 3,
      duration = 30,
      tiltX = 50,
      rotateZ = -15,
      pauseOnHover = true,
      gap = 16,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={{ perspective: "1400px", ...style }}
        {...props}
      >
        <div
          className="flex flex-col"
          style={{
            transformOrigin: "center center",
            transform: `rotateX(${tiltX}deg) rotateZ(${rotateZ}deg)`,
            transformStyle: "preserve-3d",
            gap,
          }}
        >
          {Array.from({ length: rows }).map((_, rowIdx) => {
            const reverse = rowIdx % 2 === 1;
            return (
              <div
                key={rowIdx}
                className={cn(
                  "group/row flex shrink-0",
                  pauseOnHover && "hover:[&>*]:[animation-play-state:paused]"
                )}
                style={{ gap }}
              >
                <div
                  className={cn(
                    "flex shrink-0",
                    reverse ? "animate-marquee-x-reverse" : "animate-marquee-x"
                  )}
                  style={
                    {
                      gap,
                      "--marquee-duration": `${duration}s`,
                    } as React.CSSProperties
                  }
                >
                  {[...items, ...items].map((it, i) => (
                    <div
                      key={i}
                      className="shrink-0"
                      aria-hidden={i >= items.length}
                    >
                      {it}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
Marquee3D.displayName = "Marquee3D";

export { Marquee3D };
