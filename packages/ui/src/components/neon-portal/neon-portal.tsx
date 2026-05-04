"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface NeonPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Outer size in px. Default 280. */
  size?: number;
  /** Ring thickness in px. Default 22. */
  thickness?: number;
  /** Rotation duration in seconds. Default 8. */
  duration?: number;
  /** Portal colors. */
  colors?: string[];
}

const NeonPortal = React.forwardRef<HTMLDivElement, NeonPortalProps>(
  (
    {
      size = 280,
      thickness = 22,
      duration = 8,
      colors,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const palette =
      colors ??
      [
        "rgba(56, 189, 248, 0.95)",
        "rgba(168, 85, 247, 0.9)",
        "rgba(236, 72, 153, 0.9)",
      ];

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${palette.join(", ")})`,
            WebkitMaskImage: `radial-gradient(circle, transparent calc(50% - ${thickness}px), black 50%)`,
            maskImage: `radial-gradient(circle, transparent calc(50% - ${thickness}px), black 50%)`,
            animation: `neon-portal-spin ${duration}s linear infinite`,
            filter: "drop-shadow(0 0 18px rgba(56, 189, 248, 0.7))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-6 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.4), transparent 65%)`,
            animation: `neon-portal-pulse ${duration * 1.2}s ease-in-out infinite`,
          }}
        />
        <div className="relative z-10 h-full w-full">{children}</div>
        <style>{`
          @keyframes neon-portal-spin {
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes neon-portal-pulse {
            0%, 100% {
              transform: scale(0.92);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.9;
            }
          }
        `}</style>
      </div>
    );
  }
);
NeonPortal.displayName = "NeonPortal";

export { NeonPortal };
