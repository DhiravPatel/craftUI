"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface FluxPanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width in px. Default 340. */
  width?: number;
  /** Height in px. Default 220. */
  height?: number;
  /** Number of panels. Default 5. */
  panels?: number;
  /** Animation duration in seconds. Default 8. */
  duration?: number;
  /** Panel tint colors (used when `images` is not provided). */
  colors?: string[];
  /** Image URLs for the panels. Cycled if shorter than `panels`. */
  images?: string[];
  /** Per-panel border radius in px. Default 16. */
  radius?: number;
  /** Perspective distance. Default 900. */
  perspective?: number;
}

const FluxPanels = React.forwardRef<HTMLDivElement, FluxPanelsProps>(
  (
    {
      width = 340,
      height = 220,
      panels = 5,
      duration = 8,
      colors,
      images,
      radius = 16,
      perspective = 900,
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
        "rgba(56, 189, 248, 0.35)",
        "rgba(168, 85, 247, 0.35)",
        "rgba(236, 72, 153, 0.35)",
      ];
    const useImages = images && images.length > 0;

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ width, height, perspective: `${perspective}px`, ...style }}
        {...props}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {Array.from({ length: panels }).map((_, i) => {
            const tint = palette[i % palette.length]!;
            const img = useImages ? images[i % images!.length] : undefined;
            return (
              <div
                key={i}
                className="absolute inset-0 overflow-hidden"
                style={{
                  borderRadius: radius,
                  transform: `translateZ(${i * 24}px) rotateY(${i * 6}deg)`,
                  background: img
                    ? `center/cover no-repeat url("${img}")`
                    : tint,
                  border: img ? "1px solid rgba(255,255,255,0.08)" : `1px solid ${tint}`,
                  boxShadow: img
                    ? "0 24px 48px -16px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)"
                    : `0 0 30px ${tint}`,
                  animation: `flux-panels ${duration + i * 0.7}s ease-in-out infinite`,
                  backdropFilter: img ? undefined : "blur(6px)",
                }}
              />
            );
          })}
        </div>
        <div className="relative z-10 h-full w-full">{children}</div>
        <style>{`
          @keyframes flux-panels {
            0%, 100% {
              transform: translateZ(0px) rotateY(0deg);
              opacity: 0.65;
            }
            50% {
              transform: translateZ(40px) rotateY(14deg);
              opacity: 0.9;
            }
          }
        `}</style>
      </div>
    );
  }
);
FluxPanels.displayName = "FluxPanels";

export { FluxPanels };
