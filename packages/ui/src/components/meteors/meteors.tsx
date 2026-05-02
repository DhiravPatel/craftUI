"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface MeteorsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of meteors. Default 20. */
  count?: number;
  /** Min/max duration range in seconds. Default [4, 10]. */
  speed?: [number, number];
  /** Max delay before each meteor starts (s). Default 6. */
  maxDelay?: number;
}

const Meteors = React.forwardRef<HTMLDivElement, MeteorsProps>(
  (
    { count = 20, speed = [4, 10], maxDelay = 6, className, style, ...props },
    ref
  ) => {
    const meteors = React.useMemo(
      () =>
        Array.from({ length: count }).map((_, i) => ({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * maxDelay,
          duration: speed[0] + Math.random() * (speed[1] - speed[0]),
        })),
      [count, speed, maxDelay]
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
        {meteors.map((m) => (
          <span
            key={m.id}
            className="animate-meteor absolute h-0.5 w-0.5 rounded-full bg-foreground shadow-[0_0_4px_2px_hsl(var(--foreground)/0.55)]"
            style={
              {
                top: `${m.top}%`,
                left: `${m.left}%`,
                animationDelay: `${m.delay}s`,
                "--meteor-duration": `${m.duration}s`,
              } as React.CSSProperties
            }
          >
            <span
              className="absolute right-0 top-1/2 h-px w-12 origin-right -translate-y-1/2"
              style={{
                background:
                  "linear-gradient(to left, hsl(var(--foreground) / 0.7), transparent)",
                transform: "translateY(-50%) rotate(0deg)",
              }}
            />
          </span>
        ))}
      </div>
    );
  }
);
Meteors.displayName = "Meteors";

export { Meteors };
