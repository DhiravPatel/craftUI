"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface QuantumGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grid size in px. Default 280. */
  size?: number;
  /** Number of columns. Default 6. */
  columns?: number;
  /** Tile gap in px. Default 6. */
  gap?: number;
  /** Animation duration in seconds. Default 6. */
  duration?: number;
  /** Tile colors. */
  colors?: string[];
  /** Perspective distance. Default 800. */
  perspective?: number;
}

const QuantumGrid = React.forwardRef<HTMLDivElement, QuantumGridProps>(
  (
    {
      size = 280,
      columns = 6,
      gap = 6,
      duration = 6,
      colors,
      perspective = 800,
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
        "rgba(168, 85, 247, 0.85)",
        "rgba(236, 72, 153, 0.85)",
      ];

    const count = columns * columns;

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
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap,
            transform: "rotateX(55deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="rounded-md"
              style={{
                background: palette[i % palette.length],
                animation: `quantum-grid ${duration}s ease-in-out infinite`,
                animationDelay: `${(i % columns) * 0.15 + Math.floor(i / columns) * 0.1}s`,
                boxShadow: `0 0 12px ${palette[i % palette.length]}`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 h-full w-full">{children}</div>
        <style>{`
          @keyframes quantum-grid {
            0%, 100% {
              transform: translateZ(0px) scale(0.85);
              opacity: 0.6;
            }
            50% {
              transform: translateZ(40px) scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }
);
QuantumGrid.displayName = "QuantumGrid";

export { QuantumGrid };
