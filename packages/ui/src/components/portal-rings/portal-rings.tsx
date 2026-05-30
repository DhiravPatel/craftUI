"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PortalRingsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Outer diameter of the portal in px. Default 320. */
  size?: number;
  /** Number of concentric rings. Default 5. */
  rings?: number;
  /** Thickness of each ring in px. Default 3. */
  ringWidth?: number;
  /** Seconds for the slowest ring to make one full rotation. Default 14. */
  duration?: number;
  /** Perspective distance in px. Default 1200. */
  perspective?: number;
  /** Color of the rings. Default sky. */
  color?: string;
  /** Glow color behind the rings. Defaults to `color`. */
  glow?: string;
  /** Render a soft central core. Default true. */
  core?: boolean;
  /** Optional content rendered in the center (e.g. a logo). */
  children?: React.ReactNode;
}

/**
 * PortalRings — a stack of concentric rings rotated to different 3D angles,
 * each spinning at a slightly different speed around its own axis. Built
 * with pure CSS (border + rotateX/Y + animation), so it's smooth at any
 * size, GPU-accelerated, and self-contained. Drop it behind a logo for a
 * stargate / dimensional-portal feel.
 */
const PortalRings = React.forwardRef<HTMLDivElement, PortalRingsProps>(
  (
    {
      size = 320,
      rings = 5,
      ringWidth = 3,
      duration = 14,
      perspective = 1200,
      color = "rgb(125, 211, 252)",
      glow,
      core = true,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const glowColor = glow ?? color;

    const ringSpecs = React.useMemo(() => {
      const items: Array<{
        size: number;
        rx: number;
        ry: number;
        rz: number;
        dur: number;
        dir: 1 | -1;
        opacity: number;
        dashed: boolean;
      }> = [];
      for (let i = 0; i < rings; i++) {
        const t = i / Math.max(rings - 1, 1);
        const ringSize = size * (1 - t * 0.55);
        // Spread tilts so rings interleave from different directions.
        const rx = 25 + i * 22;
        const ry = i * 31;
        const rz = i * 17;
        const dur = duration * (1 - t * 0.55);
        items.push({
          size: ringSize,
          rx,
          ry,
          rz,
          dur,
          dir: i % 2 === 0 ? 1 : -1,
          opacity: 0.55 + (1 - t) * 0.4,
          dashed: i % 2 === 1,
        });
      }
      return items;
    }, [rings, size, duration]);

    return (
      <div
        ref={ref}
        className={cn("relative inline-grid place-items-center", className)}
        style={{
          width: size,
          height: size,
          perspective: `${perspective}px`,
          ...style,
        }}
        {...props}
      >
        {/* Ambient glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(closest-side, ${glowColor}55, ${glowColor}18 45%, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />

        {/* Rings stage */}
        <div
          className="relative grid place-items-center"
          style={{
            width: size,
            height: size,
            transformStyle: "preserve-3d",
          }}
        >
          {ringSpecs.map((r, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute rounded-full"
              style={{
                width: r.size,
                height: r.size,
                borderStyle: r.dashed ? "dashed" : "solid",
                borderWidth: ringWidth,
                borderColor: color,
                opacity: r.opacity,
                boxShadow: `0 0 14px ${color}55, inset 0 0 14px ${color}33`,
                transformStyle: "preserve-3d",
                animation: `craftui-portal-spin-${i} ${r.dur}s linear infinite`,
              }}
            />
          ))}

          {/* Core */}
          {core ? (
            <span
              aria-hidden
              className="absolute rounded-full"
              style={{
                width: size * 0.18,
                height: size * 0.18,
                background: `radial-gradient(closest-side, white, ${color} 60%, transparent)`,
                filter: "blur(0.5px)",
                boxShadow: `0 0 30px ${color}, 0 0 60px ${color}66`,
              }}
            />
          ) : null}

          {/* Children content in the middle, in front of the core. */}
          {children ? (
            <div
              className="relative z-10 flex items-center justify-center"
              style={{ transform: "translateZ(40px)" }}
            >
              {children}
            </div>
          ) : null}
        </div>

        <style>{`
          ${ringSpecs
            .map(
              (r, i) => `
              @keyframes craftui-portal-spin-${i} {
                from { transform: rotateX(${r.rx}deg) rotateY(${r.ry}deg) rotateZ(${r.rz}deg); }
                to { transform: rotateX(${r.rx}deg) rotateY(${r.ry}deg) rotateZ(${
                r.rz + 360 * r.dir
              }deg); }
              }
            `
            )
            .join("\n")}
        `}</style>
      </div>
    );
  }
);
PortalRings.displayName = "PortalRings";

export { PortalRings };
