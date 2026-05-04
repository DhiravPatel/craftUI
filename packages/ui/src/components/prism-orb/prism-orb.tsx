"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PrismOrbProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orb diameter in px. Default 240. */
  size?: number;
  /** Color palette used for the spectral highlights. */
  colors?: string[];
  /** Glow radius in px. Default 28. */
  glow?: number;
  /** Rotation duration in seconds. Default 10. */
  duration?: number;
}

const PrismOrb = React.forwardRef<HTMLDivElement, PrismOrbProps>(
  (
    {
      size = 240,
      colors,
      glow = 28,
      duration = 10,
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
        "rgba(34, 197, 94, 0.8)",
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
            background: `radial-gradient(circle at 35% 30%, ${palette[0]}, rgba(0,0,0,0) 60%), radial-gradient(circle at 70% 70%, ${palette[2]}, rgba(0,0,0,0) 55%), radial-gradient(circle at center, rgba(255,255,255,0.7), rgba(0,0,0,0) 60%)`,
            filter: "saturate(120%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${palette.join(", ")})`,
            WebkitMaskImage:
              "radial-gradient(circle at center, transparent 58%, black 63%, black 100%)",
            maskImage:
              "radial-gradient(circle at center, transparent 58%, black 63%, black 100%)",
            animation: `prism-orb-spin ${duration}s linear infinite`,
            mixBlendMode: "screen",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `0 0 ${glow}px ${palette[1]}`,
            opacity: 0.85,
          }}
        />
        <div className="relative z-10 h-full w-full">{children}</div>
        <style>{`
          @keyframes prism-orb-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }
);
PrismOrb.displayName = "PrismOrb";

export { PrismOrb };
