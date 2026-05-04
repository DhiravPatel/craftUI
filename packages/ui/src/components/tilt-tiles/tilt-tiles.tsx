"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TiltTilesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grid size in px. Default 300. */
  size?: number;
  /** Columns count. Default 3. */
  columns?: number;
  /** Gap between tiles in px. Default 10. */
  gap?: number;
  /** Hover tilt strength in degrees. Default 10. */
  tilt?: number;
  /** Tile colors (used when `images` is not provided). */
  colors?: string[];
  /** Image URLs to use as tile backgrounds. Cycled if shorter than the grid. */
  images?: string[];
  /** Tile border radius in px. Default 12. */
  radius?: number;
}

const TiltTiles = React.forwardRef<HTMLDivElement, TiltTilesProps>(
  (
    {
      size = 300,
      columns = 3,
      gap = 10,
      tilt = 10,
      colors,
      images,
      radius = 12,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
    const palette =
      colors ??
      [
        "rgba(56, 189, 248, 0.9)",
        "rgba(168, 85, 247, 0.9)",
        "rgba(236, 72, 153, 0.9)",
        "rgba(34, 197, 94, 0.85)",
      ];
    const useImages = images && images.length > 0;

    const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      setRotation({ x: dy * -tilt, y: dx * tilt });
    };

    const handleLeave = () => setRotation({ x: 0, y: 0 });

    const total = columns * columns;

    return (
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn("relative", className)}
        style={{
          width: size,
          height: size,
          perspective: "900px",
          ...style,
        }}
        {...props}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap,
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 300ms ease",
          }}
        >
          {Array.from({ length: total }).map((_, i) => {
            const tint = palette[i % palette.length]!;
            const img = useImages
              ? images[i % images!.length]
              : undefined;
            return (
              <div
                key={i}
                className="overflow-hidden"
                style={{
                  borderRadius: radius,
                  background: img
                    ? `center/cover no-repeat url("${img}")`
                    : tint,
                  animation: "tilt-tiles-float 6s ease-in-out infinite",
                  animationDelay: `${(i % columns) * 0.2}s`,
                  boxShadow: img
                    ? "0 12px 28px -10px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)"
                    : `0 10px 30px ${tint}`,
                }}
              />
            );
          })}
        </div>
        <div className="relative z-10 h-full w-full">{children}</div>
        <style>{`
          @keyframes tilt-tiles-float {
            0%, 100% {
              transform: translateZ(0px) scale(0.95);
              opacity: 0.8;
            }
            50% {
              transform: translateZ(40px) scale(1.05);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }
);
TiltTiles.displayName = "TiltTiles";

export { TiltTiles };
