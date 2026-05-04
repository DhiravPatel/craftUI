"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface GravityWellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the well in px. Default 280. */
  size?: number;
  /** Number of depth rings. Default 8. */
  depth?: number;
  /** Animation duration in seconds. Default 12. */
  duration?: number;
  /** Perspective distance. Default 900. */
  perspective?: number;
  /** Colors for rings. */
  colors?: string[];
}

const GravityWell = React.forwardRef<HTMLDivElement, GravityWellProps>(
  (
    {
      size = 280,
      depth = 8,
      duration = 12,
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
        "rgba(56, 189, 248, 0.75)",
        "rgba(168, 85, 247, 0.7)",
        "rgba(236, 72, 153, 0.7)",
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
          {Array.from({ length: depth }).map((_, i) => {
            const inset = i * 10;
            const color = palette[i % palette.length];
            return (
              <div
                key={i}
                className="absolute rounded-full border"
                style={{
                  inset,
                  borderColor: color,
                  transform: `translateZ(${i * -16}px) rotateX(70deg)`,
                  animation: `gravity-well ${duration + i}s ease-in-out infinite`,
                  boxShadow: `0 0 16px ${color}`,
                  opacity: 0.8 - i * 0.05,
                }}
              />
            );
          })}
        </div>
        <div className="relative z-10 h-full w-full">{children}</div>
        <style>{`
          @keyframes gravity-well {
            0% {
              transform: translateZ(0px) rotateX(70deg) scale(0.95);
              opacity: 0.9;
            }
            50% {
              transform: translateZ(-40px) rotateX(70deg) scale(1.08);
              opacity: 0.6;
            }
            100% {
              transform: translateZ(0px) rotateX(70deg) scale(0.98);
              opacity: 0.85;
            }
          }
        `}</style>
      </div>
    );
  }
);
GravityWell.displayName = "GravityWell";

export { GravityWell };
