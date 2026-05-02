"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface BackgroundBeamsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of beams. Default 12. */
  count?: number;
  /** Min/max travel duration in seconds. Default [6, 14]. */
  speed?: [number, number];
  /** Beam color. Default cyan-violet gradient. */
  color?: string;
}

const BackgroundBeams = React.forwardRef<HTMLDivElement, BackgroundBeamsProps>(
  (
    {
      count = 12,
      speed = [6, 14],
      color = "rgba(99,102,241,0.5)",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const beams = React.useMemo(
      () =>
        Array.from({ length: count }).map((_, i) => ({
          id: i,
          left: Math.random() * 100,
          width: 1 + Math.random() * 1.4,
          delay: Math.random() * 6,
          duration: speed[0] + Math.random() * (speed[1] - speed[0]),
          length: 30 + Math.random() * 35,
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
        <svg
          className="absolute inset-0 h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {beams.map((b) => (
            <line
              key={b.id}
              x1={b.left}
              y1={-10}
              x2={b.left - 30}
              y2={b.length}
              stroke={color}
              strokeWidth={b.width}
              strokeLinecap="round"
              opacity={0}
              style={
                {
                  animation: `meteor ${b.duration}s ${b.delay}s linear infinite`,
                  "--meteor-duration": `${b.duration}s`,
                  transformOrigin: `${b.left}% 0`,
                } as React.CSSProperties
              }
            />
          ))}
        </svg>
        {/* Diagonal CSS overlay for additional ambience */}
        {beams.slice(0, Math.floor(count / 2)).map((b) => (
          <span
            key={`o-${b.id}`}
            className="absolute"
            style={
              {
                top: `${-10 + Math.random() * 20}%`,
                left: `${b.left}%`,
                width: 1,
                height: 80,
                background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
                transform: "rotate(35deg)",
                animation: `meteor ${b.duration * 1.4}s ${b.delay * 0.7}s linear infinite`,
                "--meteor-duration": `${b.duration * 1.4}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    );
  }
);
BackgroundBeams.displayName = "BackgroundBeams";

export { BackgroundBeams };
