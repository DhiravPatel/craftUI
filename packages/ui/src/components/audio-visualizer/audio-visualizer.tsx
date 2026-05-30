"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface AudioVisualizerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of bars to render. Default 32. */
  bars?: number;
  /** Overall height of the visualizer in px. Default 96. */
  height?: number;
  /** Width of each bar in px. Default 4. */
  barWidth?: number;
  /** Gap between bars in px. Default 3. */
  gap?: number;
  /** Bar color (top). Defaults to sky. */
  color?: string;
  /** Bottom color of the bar gradient. Defaults to a deeper variant of `color`. */
  baseColor?: string;
  /** Lowest bar height as a fraction of `height`. Default 0.15. */
  minHeight?: number;
  /** Tallest bar height as a fraction of `height`. Default 1. */
  maxHeight?: number;
  /** Whether bars animate. Set false to freeze them at idle height. Default true. */
  playing?: boolean;
  /** Approximate frequency of the wave in Hz (cycles per second). Default 1.4. */
  speed?: number;
  /** Mirror the bars across the horizontal centerline (oscilloscope look). Default false. */
  mirrored?: boolean;
  /** Round the bar tops. Default true. */
  rounded?: boolean;
}

/**
 * AudioVisualizer — a row of animated bars, like the equalizer in a music or
 * podcast player. Each bar has its own CSS animation-duration and -delay
 * derived deterministically from its index, so the pattern looks
 * organic without being random (SSR-safe — no `Math.random()` at render
 * time). Use `playing={false}` to freeze the bars at idle height, e.g.
 * when audio is paused.
 */
const AudioVisualizer = React.forwardRef<HTMLDivElement, AudioVisualizerProps>(
  (
    {
      bars = 32,
      height = 96,
      barWidth = 4,
      gap = 3,
      color = "rgb(125, 211, 252)",
      baseColor,
      minHeight = 0.15,
      maxHeight = 1,
      playing = true,
      speed = 1.4,
      mirrored = false,
      rounded = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const items = React.useMemo(() => {
      // Each bar gets its own pseudo-random duration/delay seeded by index — deterministic.
      const out: Array<{
        duration: number;
        delay: number;
        peak: number;
      }> = [];
      for (let i = 0; i < bars; i++) {
        const t = i / Math.max(bars - 1, 1);
        // Sinusoidal envelope so peaks cluster smoothly across the row.
        const wave = 0.55 + 0.45 * Math.sin(t * Math.PI * 3 + i * 0.6);
        const peak = minHeight + (maxHeight - minHeight) * wave;
        // Bar-specific cycle time — slightly different per bar to avoid sync.
        const baseDur = 1 / speed;
        const duration = baseDur * (0.6 + ((i * 37) % 100) / 180);
        const delay = ((i * 53) % 100) / 100 * baseDur * -1;
        out.push({ duration, delay, peak });
      }
      return out;
    }, [bars, minHeight, maxHeight, speed]);

    const base = baseColor ?? color;

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-end",
          mirrored ? "items-center" : "items-end",
          className
        )}
        style={{
          height,
          gap,
          ...style,
        }}
        aria-label="Audio level visualization"
        role="img"
        {...props}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={cn(
              "block",
              rounded ? "rounded-full" : undefined,
              mirrored && "self-center"
            )}
            style={{
              width: barWidth,
              height: `${item.peak * 100}%`,
              background: `linear-gradient(to top, ${base}, ${color})`,
              boxShadow: `0 0 8px ${color}55`,
              transformOrigin: mirrored ? "center" : "bottom",
              animation: playing
                ? `craftui-eq-bar ${item.duration.toFixed(3)}s ${item.delay.toFixed(3)}s ease-in-out infinite alternate`
                : "none",
              opacity: playing ? 1 : 0.55,
              transition: "opacity 240ms ease",
            }}
          />
        ))}
        <style>{`
          @keyframes craftui-eq-bar {
            0% { transform: scaleY(${(minHeight / Math.max(maxHeight, 0.001)).toFixed(3)}); }
            100% { transform: scaleY(1); }
          }
        `}</style>
      </div>
    );
  }
);
AudioVisualizer.displayName = "AudioVisualizer";

export { AudioVisualizer };
