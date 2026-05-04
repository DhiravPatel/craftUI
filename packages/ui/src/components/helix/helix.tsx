"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface HelixProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total height of the helix in px. Default 360. */
  height?: number;
  /** Strand radius in px. Default 70. */
  radius?: number;
  /** Number of dots on each of the two strands. Default 32. */
  dotsPerStrand?: number;
  /** Number of full twists across the height. Default 2.5. */
  twists?: number;
  /** Rotation duration in seconds. Default 12. */
  duration?: number;
  /** Diameter of each dot in px. Default 9. */
  dotSize?: number;
  /**
   * One color per strand. Default
   * `["rgb(125, 211, 252)", "rgb(244, 114, 182)"]` — sky-blue and rose.
   * If a single string is provided via `color`, both strands use it.
   */
  strandColors?: [string, string];
  /** Shorthand: use the same color for both strands. */
  color?: string;
  /** Show thin connecting "rungs" between the two strands. Default true. */
  rungs?: boolean;
  /** Render an ambient halo behind the helix. Default true. */
  glow?: boolean;
}

/**
 * Helix — two strands of dots forming a rotating DNA helix. Each dot is
 * positioned on a great-circle band around the Y axis; the whole helix
 * rotates around Y while individual dots respect `backface-visibility`,
 * so back-side dots fade away naturally as they pass behind the axis.
 *
 * Visual design:
 *  - Strands are rendered in two distinct colors with vertical fade so
 *    each strand reads as a tapered, glowing thread.
 *  - Rungs use a horizontal gradient between the two strand colors.
 *  - An ambient halo sits behind the structure for depth.
 */
const Helix = React.forwardRef<HTMLDivElement, HelixProps>(
  (
    {
      height = 360,
      radius = 70,
      dotsPerStrand = 32,
      twists = 2.5,
      duration = 12,
      dotSize = 9,
      strandColors,
      color,
      rungs = true,
      glow = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const colorA =
      strandColors?.[0] ?? color ?? "rgb(125, 211, 252)"; // sky-300
    const colorB =
      strandColors?.[1] ?? color ?? "rgb(244, 114, 182)"; // pink-400

    const STRAND_OFFSETS: Array<{ phase: number; tone: string }> = [
      { phase: 0, tone: colorA },
      { phase: Math.PI, tone: colorB },
    ];

    const dots: React.ReactNode[] = [];
    for (let s = 0; s < STRAND_OFFSETS.length; s++) {
      const { phase, tone } = STRAND_OFFSETS[s]!;
      for (let i = 0; i < dotsPerStrand; i++) {
        const t = dotsPerStrand === 1 ? 0.5 : i / (dotsPerStrand - 1);
        const y = (t - 0.5) * height;
        const angleDeg = (t * twists * 360 + (phase * 180) / Math.PI) % 360;
        // Taper dots toward the top and bottom so the helix reads as a
        // floating thread instead of a uniform column.
        const taper = Math.sin(t * Math.PI); // 0 at the ends, 1 in the middle
        const localSize = dotSize * (0.55 + taper * 0.55);
        const localOpacity = 0.55 + taper * 0.45;
        dots.push(
          <span
            key={`d-${s}-${i}`}
            className="absolute left-1/2 top-1/2 block rounded-full"
            style={{
              width: localSize,
              height: localSize,
              marginLeft: -localSize / 2,
              marginTop: -localSize / 2,
              background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), ${tone} 55%, ${tone} 100%)`,
              boxShadow: `0 0 ${localSize * 1.4}px ${tone}, 0 0 ${
                localSize * 2.6
              }px ${tone}`,
              opacity: localOpacity,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: `translateY(${y}px) rotateY(${angleDeg}deg) translateZ(${radius}px)`,
            }}
          />
        );
      }
    }

    // Optional rungs — a thin gradient bar at every other dot row connecting
    // the two strands. They share the same rotateY math so they sit between
    // the strands; backface-hidden so back-half rungs disappear cleanly.
    const rungEls: React.ReactNode[] = [];
    if (rungs) {
      for (let i = 0; i < dotsPerStrand; i += 2) {
        const t = dotsPerStrand === 1 ? 0.5 : i / (dotsPerStrand - 1);
        const y = (t - 0.5) * height;
        const angleDeg = (t * twists * 360) % 360;
        const taper = Math.sin(t * Math.PI);
        rungEls.push(
          <span
            key={`r-${i}`}
            className="absolute left-1/2 top-1/2 block"
            style={{
              width: radius * 2,
              height: 1.5,
              marginLeft: -radius,
              marginTop: -0.75,
              background: `linear-gradient(90deg, ${colorA}, ${colorB})`,
              opacity: 0.18 + taper * 0.22,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: `translateY(${y}px) rotateY(${angleDeg}deg)`,
            }}
          />
        );
      }
    }

    const haloSize = Math.max(height, radius * 4);

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        style={{
          width: radius * 2,
          height,
          perspective: `${radius * 9}px`,
          ...style,
        }}
        {...props}
      >
        {glow ? (
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 block rounded-full"
            style={{
              width: haloSize,
              height: haloSize,
              marginLeft: -haloSize / 2,
              marginTop: -haloSize / 2,
              background: `radial-gradient(circle, ${colorA}33 0%, ${colorB}1a 35%, transparent 70%)`,
              filter: "blur(18px)",
            }}
          />
        ) : null}
        <div
          aria-hidden
          className="absolute inset-0 animate-spin"
          style={{
            transformStyle: "preserve-3d",
            animationDuration: `${duration}s`,
          }}
        >
          {rungEls}
          {dots}
        </div>
        {/* Top + bottom soft fade so dots feather into the background instead
            of being clipped by the container edge. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-12"
          style={{
            background:
              "linear-gradient(180deg, var(--helix-fade-from, rgba(0,0,0,0)) 0%, transparent 100%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
          style={{
            background:
              "linear-gradient(0deg, var(--helix-fade-from, rgba(0,0,0,0)) 0%, transparent 100%)",
          }}
        />
      </div>
    );
  }
);
Helix.displayName = "Helix";

export { Helix };
