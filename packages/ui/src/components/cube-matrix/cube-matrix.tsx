"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CubeMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grid edge — total cubes = rows × cols. Default 5. */
  rows?: number;
  /** Columns of the grid. Default 5. */
  cols?: number;
  /** Edge length of each cube in px. Default 36. */
  cubeSize?: number;
  /** Gap between cubes in px. Default 12. */
  gap?: number;
  /** Seconds for one full wave loop. Default 4. */
  duration?: number;
  /** Maximum wave delay per ring of cubes away from center. Default 0.18s. */
  ringDelay?: number;
  /** Face color of every cube. Default sky. */
  color?: string;
  /** Highlight color used on the front face. Defaults to a brighter `color`. */
  highlight?: string;
  /** Perspective distance in px. Default 1200. */
  perspective?: number;
  /** Tilt of the whole grid in degrees (rotateX). Default 55. */
  tilt?: number;
  /** Spin of the whole grid in degrees (rotateZ). Default -45. */
  spin?: number;
}

/**
 * CubeMatrix — a tilted grid of small 3D cubes that all rotate in unison
 * with a radial delay, producing a rippling wave field. Pure CSS keyframes:
 * each cube's `animation-delay` is computed from its distance to the center
 * of the grid, so the wave radiates outward. Looks great as a hero
 * backdrop or as decoration behind feature copy.
 */
const CubeMatrix = React.forwardRef<HTMLDivElement, CubeMatrixProps>(
  (
    {
      rows = 5,
      cols = 5,
      cubeSize = 36,
      gap = 12,
      duration = 4,
      ringDelay = 0.18,
      color = "rgb(125, 211, 252)",
      highlight,
      perspective = 1200,
      tilt = 55,
      spin = -45,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const front = highlight ?? color;
    const side = color;
    const top = `color-mix(in oklab, ${color} 70%, white 30%)`;

    const cx = (cols - 1) / 2;
    const cy = (rows - 1) / 2;
    const maxDist = Math.hypot(cx, cy) || 1;

    const cubes = React.useMemo(() => {
      const out: Array<{ key: string; row: number; col: number; delay: number }> = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dist = Math.hypot(c - cx, r - cy);
          // Outer rings fire later so the wave radiates outward.
          const delay = (dist / maxDist) * ringDelay * (Math.max(rows, cols));
          out.push({ key: `${r}-${c}`, row: r, col: c, delay });
        }
      }
      return out;
    }, [rows, cols, cx, cy, maxDist, ringDelay]);

    const half = cubeSize / 2;

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        style={{
          perspective: `${perspective}px`,
          ...style,
        }}
        {...props}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cubeSize}px)`,
            gridAutoRows: `${cubeSize}px`,
            gap: `${gap}px`,
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt}deg) rotateZ(${spin}deg)`,
          }}
        >
          {cubes.map((cube) => (
            <div
              key={cube.key}
              className="relative"
              style={{
                width: cubeSize,
                height: cubeSize,
                transformStyle: "preserve-3d",
                animation: `craftui-cube-matrix-wave ${duration}s ease-in-out ${cube.delay}s infinite`,
              }}
            >
              {/* top */}
              <span
                className="absolute inset-0"
                style={{
                  background: top,
                  transform: `translateZ(${half}px)`,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
                }}
              />
              {/* bottom */}
              <span
                className="absolute inset-0"
                style={{
                  background: `color-mix(in oklab, ${color} 55%, black 45%)`,
                  transform: `translateZ(-${half}px) rotateX(180deg)`,
                }}
              />
              {/* front */}
              <span
                className="absolute inset-0"
                style={{
                  background: front,
                  transform: `rotateX(90deg) translateZ(${half}px)`,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
                }}
              />
              {/* back */}
              <span
                className="absolute inset-0"
                style={{
                  background: `color-mix(in oklab, ${color} 60%, black 40%)`,
                  transform: `rotateX(-90deg) translateZ(${half}px)`,
                }}
              />
              {/* left */}
              <span
                className="absolute inset-0"
                style={{
                  background: side,
                  transform: `rotateY(-90deg) translateZ(${half}px)`,
                  opacity: 0.85,
                }}
              />
              {/* right */}
              <span
                className="absolute inset-0"
                style={{
                  background: side,
                  transform: `rotateY(90deg) translateZ(${half}px)`,
                  opacity: 0.95,
                }}
              />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes craftui-cube-matrix-wave {
            0%, 100% { transform: translateZ(0) rotateX(0deg) rotateY(0deg); }
            25% { transform: translateZ(18px) rotateX(180deg) rotateY(0deg); }
            50% { transform: translateZ(0) rotateX(360deg) rotateY(0deg); }
            75% { transform: translateZ(18px) rotateX(360deg) rotateY(180deg); }
          }
        `}</style>
      </div>
    );
  }
);
CubeMatrix.displayName = "CubeMatrix";

export { CubeMatrix };
