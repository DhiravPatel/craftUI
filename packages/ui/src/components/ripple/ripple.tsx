"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Final ring diameter in px. Default 240. */
  size?: number;
  /** Ring color. Default sky/cyan. */
  color?: string;
  /** Number of concurrent rings. Default 4. */
  count?: number;
  /** Single ring cycle duration in seconds. Default 3. */
  duration?: number;
  /** Show a glowing center dot. Default true. */
  centerDot?: boolean;
}

/**
 * Ripple — concentric rings that scale from 0 to full size and fade out,
 * staggered so a new ring starts as the outer one disappears. Looks like
 * a sonar / radar pulse. Useful for "live", "loading", or "waiting" indicators.
 */
const Ripple = React.forwardRef<HTMLDivElement, RippleProps>(
  (
    {
      size = 240,
      color = "rgb(56, 189, 248)",
      count = 4,
      duration = 3,
      centerDot = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            aria-hidden
            className="animate-ripple absolute inset-0 rounded-full border"
            style={
              {
                borderColor: color,
                animationDelay: `${(i / count) * duration}s`,
                "--ripple-duration": `${duration}s`,
                boxShadow: `0 0 16px ${color}`,
              } as React.CSSProperties
            }
          />
        ))}

        {centerDot ? (
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 16px 2px ${color}`,
            }}
          />
        ) : null}
      </div>
    );
  }
);
Ripple.displayName = "Ripple";

export { Ripple };
