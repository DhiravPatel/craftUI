"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface SparklesTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Text content (or any inline node). */
  children: React.ReactNode;
  /** Color of the horizontal beam + halo. Default sky/cyan. */
  beamColor?: string;
  /** Number of particles streaming below the beam. Default 180. */
  particleCount?: number;
  /** Spread of particles to either side of the beam, in % width. Default 80. */
  spread?: number;
  /** Vertical gap (in px) between the text and the beam. Default 8. */
  beamGap?: number;
}

const SparklesText = React.forwardRef<HTMLDivElement, SparklesTextProps>(
  (
    {
      children,
      beamColor = "rgb(56, 189, 248)",
      particleCount = 180,
      spread = 80,
      beamGap = 8,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const particles = React.useMemo(
      () =>
        Array.from({ length: particleCount }).map((_, i) => {
          // Bias particles toward the center horizontally (gaussian-ish)
          const r = (Math.random() + Math.random()) / 2;
          const sign = Math.random() < 0.5 ? -1 : 1;
          const offset = r * (spread / 2) * sign;
          return {
            id: i,
            left: 50 + offset,
            // Bias toward the top — denser just under the beam
            top: Math.pow(Math.random(), 1.4) * 100,
            size: 0.5 + Math.random() * 1.6,
            delay: Math.random() * 4,
            duration: 1.4 + Math.random() * 3,
            glow: Math.random() > 0.55,
          };
        }),
      [particleCount, spread]
    );

    return (
      <div
        ref={ref}
        className={cn(
          "relative isolate flex flex-col items-center overflow-hidden",
          className
        )}
        style={style}
        {...props}
      >
        {/* Text */}
        <div className="relative z-10 flex flex-col items-center">
          {children}
        </div>

        {/* Beam — sits right below the text, with a tunable gap */}
        <div
          className="relative w-full"
          style={{ marginTop: beamGap }}
          aria-hidden
        >
          <span
            className="mx-auto block h-px"
            style={{
              width: `${spread + 5}%`,
              background: `linear-gradient(to right, transparent, ${beamColor}, transparent)`,
              boxShadow: `0 0 12px 1px ${beamColor}, 0 0 36px 4px ${beamColor}`,
            }}
          />
          {/* Halo behind the beam */}
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-28 -translate-x-1/2 -translate-y-1/2 rounded-[100%] blur-3xl"
            style={{
              width: `${spread - 5}%`,
              background: beamColor,
              opacity: 0.45,
            }}
          />
        </div>

        {/* Particles below the beam */}
        <div className="relative w-full flex-1 overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className="animate-twinkle absolute rounded-full"
              style={
                {
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.size,
                  background: "rgba(255, 255, 255, 0.95)",
                  boxShadow: p.glow
                    ? `0 0 ${p.size * 3}px ${p.size}px rgba(255,255,255,0.6)`
                    : undefined,
                  animationDelay: `${p.delay}s`,
                  "--twinkle-duration": `${p.duration}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    );
  }
);
SparklesText.displayName = "SparklesText";

export { SparklesText };
