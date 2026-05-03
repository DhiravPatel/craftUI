"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface VortexRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Outer size in px. Default 320. */
  size?: number;
  /** Number of rings. Default 6. */
  ringCount?: number;
  /** Rotation duration in seconds. Default 14. */
  duration?: number;
  /** Perspective distance. Default 900. */
  perspective?: number;
  /** Colors for ring strokes. */
  colors?: string[];
}

const VortexRings = React.forwardRef<HTMLDivElement, VortexRingsProps>(
  (
    {
      size = 320,
      ringCount = 6,
      duration = 14,
      perspective = 900,
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
        "rgba(56, 189, 248, 0.85)",
        "rgba(168, 85, 247, 0.8)",
        "rgba(236, 72, 153, 0.8)",
        "rgba(34, 197, 94, 0.75)",
      ];

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ width: size, height: size, perspective: `${perspective}px`, ...style }}
        {...props}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {Array.from({ length: ringCount }).map((_, i) => {
            const tilt = 18 + i * 6;
            const inset = i * 10;
            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  transform: `rotateX(${tilt}deg) rotateY(${tilt}deg)`,
                }}
              >
                <div
                  className="absolute rounded-full border"
                  style={{
                    inset,
                    borderColor: palette[i % palette.length],
                    opacity: 0.7,
                    boxShadow: `0 0 18px ${palette[i % palette.length]}`,
                    animation: `vortex-ring ${duration + i * 1.5}s linear infinite`,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="relative z-10 h-full w-full">{children}</div>
        <style>{`
          @keyframes vortex-ring {
            to {
              transform: rotateZ(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
);
VortexRings.displayName = "VortexRings";

export { VortexRings };
