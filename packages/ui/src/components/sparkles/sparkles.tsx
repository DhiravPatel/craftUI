"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type SparkleShape = "star" | "dot";

export interface SparklesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual shape of each particle. Default `"star"`. */
  shape?: SparkleShape;
  /** Number of particles. Default 30 for stars, 120 for dots. */
  count?: number;
  /** Min/max size in px. Default depends on shape. */
  size?: [number, number];
  /** Min/max twinkle duration in seconds. Default [1.5, 4]. */
  speed?: [number, number];
  /** Particle color. Default `currentColor`. */
  color?: string;
  /** For `shape="dot"`: a fraction of dots also emit a soft glow halo. Default true. */
  glow?: boolean;
}

const SparkleIcon = ({
  size,
  color,
}: {
  size: number;
  color: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 0L13.8 8.4C14.04 9.49 14.91 10.36 16 10.6L24 12L16 13.4C14.91 13.64 14.04 14.51 13.8 15.6L12 24L10.2 15.6C9.96 14.51 9.09 13.64 8 13.4L0 12L8 10.6C9.09 10.36 9.96 9.49 10.2 8.4L12 0Z"
      fill={color}
    />
  </svg>
);

const Sparkles = React.forwardRef<HTMLDivElement, SparklesProps>(
  (
    {
      shape = "star",
      count,
      size,
      speed = [1.5, 4],
      color = "currentColor",
      glow = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isDot = shape === "dot";
    const resolvedCount = count ?? (isDot ? 120 : 30);
    const resolvedSize = size ?? (isDot ? [1, 2.4] : [2, 5]);

    const particles = React.useMemo(
      () =>
        Array.from({ length: resolvedCount }).map((_, i) => ({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size:
            resolvedSize[0] +
            Math.random() * (resolvedSize[1] - resolvedSize[0]),
          delay: Math.random() * speed[1],
          duration: speed[0] + Math.random() * (speed[1] - speed[0]),
          glow: Math.random() > 0.7,
        })),
      [resolvedCount, resolvedSize, speed]
    );

    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
        style={style}
        {...props}
      >
        {particles.map((p) => (
          <span
            key={p.id}
            className="animate-twinkle absolute"
            style={
              {
                top: `${p.top}%`,
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                "--twinkle-duration": `${p.duration}s`,
              } as React.CSSProperties
            }
          >
            {isDot ? (
              <span
                className="block rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: color,
                  boxShadow:
                    glow && p.glow
                      ? `0 0 ${p.size * 3}px ${p.size}px ${color}`
                      : undefined,
                }}
              />
            ) : (
              <SparkleIcon size={p.size * 4} color={color} />
            )}
          </span>
        ))}
      </div>
    );
  }
);
Sparkles.displayName = "Sparkles";

export { Sparkles };
