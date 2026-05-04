"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface HoloSlicesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width in px. Default 320. */
  width?: number;
  /** Height in px. Default 220. */
  height?: number;
  /** Number of translucent slices. Default 6. */
  slices?: number;
  /** Animation duration in seconds. Default 9. */
  duration?: number;
  /** Slice tint colors (used when `images` is not provided). */
  colors?: string[];
  /** Image URLs to use as slice backgrounds. Cycled if shorter than `slices`. */
  images?: string[];
  /** Per-slice border radius in px. Default 16. */
  radius?: number;
  /** Perspective distance. Default 1000. */
  perspective?: number;
}

const HoloSlices = React.forwardRef<HTMLDivElement, HoloSlicesProps>(
  (
    {
      width = 320,
      height = 220,
      slices = 6,
      duration = 9,
      colors,
      images,
      radius = 16,
      perspective = 1000,
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
        "rgba(56, 189, 248, 0.25)",
        "rgba(168, 85, 247, 0.25)",
        "rgba(236, 72, 153, 0.25)",
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
          {Array.from({ length: slices }).map((_, i) => {
            const tint = palette[i % palette.length]!;
            const img = useImages ? images[i % images!.length] : undefined;
            return (
              <div
                key={i}
                className="absolute inset-0 overflow-hidden"
                style={{
                  borderRadius: radius,
                  transform: `translateZ(${i * 18}px) rotateY(${i * 6}deg)`,
                  background: img
                    ? `center/cover no-repeat url("${img}")`
                    : tint,
                  backdropFilter: img ? undefined : "blur(8px)",
                  border: img
                    ? "1px solid rgba(255,255,255,0.08)"
                    : `1px solid ${tint}`,
                  boxShadow: img
                    ? "0 24px 48px -16px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)"
                    : `0 0 24px ${tint}`,
                  animation: `holo-slices ${duration + i * 0.6}s ease-in-out infinite`,
                }}
              />
            );
          })}
        </div>
        <div className="relative z-10 h-full w-full">{children}</div>
        <style>{`
          @keyframes holo-slices {
            0% {
              transform: translateZ(0px) rotateY(0deg);
              opacity: 0.6;
            }
            50% {
              transform: translateZ(30px) rotateY(12deg);
              opacity: 0.9;
            }
            100% {
              transform: translateZ(0px) rotateY(0deg);
              opacity: 0.7;
            }
          }
        `}</style>
      </div>
    );
  }
);
HoloSlices.displayName = "HoloSlices";

export { HoloSlices };
