"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface AuroraProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Override the gradient blob colors. Default = warm aurora. */
  colors?: string[];
  /** Loop duration for the slowest blob in seconds. Default 18. */
  duration?: number;
  /** Strength of the blur in px. Default 64. */
  blur?: number;
}

const Aurora = React.forwardRef<HTMLDivElement, AuroraProps>(
  (
    {
      className,
      colors,
      duration = 18,
      blur = 64,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const palette = colors ?? [
      "rgba(168, 85, 247, 0.55)", // violet
      "rgba(236, 72, 153, 0.55)", // pink
      "rgba(56, 189, 248, 0.55)", // sky
      "rgba(34, 197, 94, 0.45)", // green
    ];
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={style}
        {...props}
      >
        {palette.map((color, i) => (
          <span
            key={i}
            aria-hidden
            className="animate-aurora pointer-events-none absolute -inset-1/4 rounded-full"
            style={
              {
                background: color,
                filter: `blur(${blur}px)`,
                animationDelay: `${i * -3}s`,
                top: `${(i * 37) % 60 - 20}%`,
                left: `${(i * 53) % 70 - 10}%`,
                width: "70%",
                height: "70%",
                "--aurora-duration": `${duration + i * 4}s`,
              } as React.CSSProperties
            }
          />
        ))}
        <div className="relative">{children}</div>
      </div>
    );
  }
);
Aurora.displayName = "Aurora";

export { Aurora };
