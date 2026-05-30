"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface HeartbeatMonitorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Beats per minute shown in the corner badge. Default 72. */
  bpm?: number;
  /** Color of the pulse line. Default sky. */
  color?: string;
  /** Line thickness in px. Default 2. */
  strokeWidth?: number;
  /** Height of the monitor in px. Default 160. */
  height?: number;
  /** Show the grid background. Default true. */
  grid?: boolean;
  /** Show the BPM badge and pulsing heart. Default true. */
  showBadge?: boolean;
  /** Glow strength behind the line. Default true. */
  glow?: boolean;
}

// One full PQRS-T complex inside a 200-unit-wide tile, baseline at y=50.
// Repeating this tile across the path produces a continuous EKG strip.
const TILE_WIDTH = 200;
const PULSE_PATH = [
  "M0,50",
  "L60,50",   // baseline
  "L68,47",   // P wave up
  "L76,50",
  "L84,52",   // small Q dip
  "L90,28",   // R spike (sharp up)
  "L96,68",   // S dip (sharp down)
  "L104,50",
  "L120,46", // T wave up
  "L132,50",
  "L200,50",
].join(" ");

/**
 * HeartbeatMonitor — an SVG EKG/heart-rate monitor: a continuously
 * scrolling pulse line on a subtle grid, with an optional BPM badge and a
 * heart icon that pulses in time. The line is one repeating PQRS-T tile
 * translated leftward via CSS animation — no canvas, no dependencies, and
 * the duration is computed from `bpm` so the visual pulse stays in sync
 * with the displayed rate.
 */
const HeartbeatMonitor = React.forwardRef<
  HTMLDivElement,
  HeartbeatMonitorProps
>(
  (
    {
      bpm = 72,
      color = "rgb(125, 211, 252)",
      strokeWidth = 2,
      height = 160,
      grid = true,
      showBadge = true,
      glow = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Seconds per beat → seconds per tile sweep
    const tileSeconds = 60 / Math.max(bpm, 1);
    // Heart icon throbs at half the line's tile rate (one throb per beat).
    const beatSeconds = tileSeconds;

    // Build a path that contains several stitched-together tiles so the
    // viewport never sees the path's end.
    const tiles = 6;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const longPath = React.useMemo(() => {
      const parts: string[] = [];
      for (let i = 0; i < tiles; i++) {
        const dx = i * TILE_WIDTH;
        const tilePath = PULSE_PATH.replace(/([ML])(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_m, cmd, x, y) => {
          const nx = parseFloat(x) + dx;
          return `${cmd}${nx},${y}`;
        });
        parts.push(tilePath);
      }
      return parts.join(" ");
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950",
          className
        )}
        style={{ height, ...style }}
        {...props}
      >
        {grid ? (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              backgroundPosition: "center center",
              maskImage:
                "radial-gradient(closest-side, black, transparent 95%)",
            }}
          />
        ) : null}

        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${TILE_WIDTH} 100`}
          preserveAspectRatio="none"
        >
          {glow ? (
            <defs>
              <filter id="craftui-ekg-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          ) : null}
          {/* The path is wider than the viewBox; SMIL animateTransform
              translates it leftward in user-space units, one TILE_WIDTH
              per beat, for a continuous sweep that scrolls correctly
              regardless of the container width. */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to={`-${TILE_WIDTH} 0`}
              dur={`${tileSeconds}s`}
              repeatCount="indefinite"
            />
            <path
              d={longPath}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={glow ? "url(#craftui-ekg-glow)" : undefined}
              vectorEffect="non-scaling-stroke"
            />
          </g>
          {/* Leading-edge fade — the line dims on the far left to suggest a sweep. */}
          <rect
            x="0"
            y="0"
            width={TILE_WIDTH * 0.18}
            height="100"
            fill="url(#craftui-ekg-fade)"
            pointerEvents="none"
          />
          <defs>
            <linearGradient id="craftui-ekg-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(10,10,10)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(10,10,10)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {showBadge ? (
          <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
                color,
                animation: `craftui-ekg-throb ${beatSeconds}s ease-in-out infinite`,
              }}
              aria-hidden
            >
              <path d="M12 21s-7-4.35-9.5-9.5C.6 7.6 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 5.9 3.6 4 7.5C19 16.65 12 21 12 21Z" />
            </svg>
            <span className="font-mono text-sm font-semibold text-white tabular-nums">
              {bpm}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/45">
              bpm
            </span>
          </div>
        ) : null}

        <style>{`
          @keyframes craftui-ekg-throb {
            0%, 60%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 ${color}); }
            20% { transform: scale(1.25); filter: drop-shadow(0 0 6px ${color}); }
          }
        `}</style>
      </div>
    );
  }
);
HeartbeatMonitor.displayName = "HeartbeatMonitor";

export { HeartbeatMonitor };
