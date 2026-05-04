"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface OrbitStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size in px. Default 260. */
  size?: number;
  /** Number of orbiting orbs. Default 4. */
  count?: number;
  /** Orbit radius in px. Default 90. */
  radius?: number;
  /** Duration in seconds. Default 10. */
  duration?: number;
  /** Colors for orbs (used when `images` is not provided). */
  colors?: string[];
  /** Image URLs for each orb. Cycled if shorter than `count`. */
  images?: string[];
  /** Orb diameter in px. Default 16 for color, 36 for image. */
  orbSize?: number;
}

const OrbitStack = React.forwardRef<HTMLDivElement, OrbitStackProps>(
  (
    {
      size = 260,
      count = 4,
      radius = 90,
      duration = 10,
      colors,
      images,
      orbSize,
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
        "rgba(34, 197, 94, 0.85)",
      ];
    const useImages = images && images.length > 0;
    const sz = orbSize ?? (useImages ? 36 : 16);

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            animation: `orbit-stack-spin ${duration}s linear infinite`,
          }}
        >
          {Array.from({ length: count }).map((_, i) => {
            const tint = palette[i % palette.length]!;
            const img = useImages ? images[i % images!.length] : undefined;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 overflow-hidden"
                style={{
                  width: sz,
                  height: sz,
                  marginLeft: -sz / 2,
                  marginTop: -sz / 2,
                  borderRadius: 9999,
                  background: img
                    ? `center/cover no-repeat url("${img}")`
                    : tint,
                  border: img ? "1.5px solid rgba(255,255,255,0.4)" : undefined,
                  boxShadow: img
                    ? "0 8px 24px -6px rgba(0,0,0,0.55), 0 0 18px rgba(125,211,252,0.35)"
                    : `0 0 18px ${tint}`,
                  transform: `rotate(${(360 / count) * i}deg) translateX(${radius + i * 8}px) translateZ(${i * 18}px)`,
                }}
              />
            );
          })}
        </div>
        <div className="relative z-10 h-full w-full">{children}</div>
        <style>{`
          @keyframes orbit-stack-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
);
OrbitStack.displayName = "OrbitStack";

export { OrbitStack };
