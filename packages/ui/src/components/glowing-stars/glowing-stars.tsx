"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface GlowingStarsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of stars in the grid. Default 120. */
  count?: number;
  /** Color of the glowing stars. Default `rgb(255,255,255)`. */
  color?: string;
  /** Min/max twinkle duration range in seconds. Default [2, 5]. */
  speed?: [number, number];
}

const GlowingStars = React.forwardRef<HTMLDivElement, GlowingStarsProps>(
  (
    {
      count = 120,
      color = "rgb(255,255,255)",
      speed = [2, 5],
      className,
      style,
      ...props
    },
    ref
  ) => {
    const stars = React.useMemo(
      () =>
        Array.from({ length: count }).map((_, i) => ({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: 1 + Math.random() * 1.6,
          delay: Math.random() * speed[1],
          duration: speed[0] + Math.random() * (speed[1] - speed[0]),
          glow: Math.random() > 0.7,
        })),
      [count, speed]
    );

    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
        style={style}
        {...props}
      >
        {stars.map((s) => (
          <span
            key={s.id}
            className="animate-twinkle absolute rounded-full"
            style={
              {
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                background: color,
                boxShadow: s.glow
                  ? `0 0 ${s.size * 3}px ${s.size}px ${color}`
                  : undefined,
                animationDelay: `${s.delay}s`,
                "--twinkle-duration": `${s.duration}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    );
  }
);
GlowingStars.displayName = "GlowingStars";

export { GlowingStars };
