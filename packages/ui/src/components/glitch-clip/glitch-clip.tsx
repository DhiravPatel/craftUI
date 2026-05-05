"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface GlitchClipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of horizontal slices to split the content into. Default 12. */
  slices?: number;
  /** Maximum horizontal jitter per slice on hover, in px. Default 14. */
  intensity?: number;
  /** Time (s) for one slice to settle into its glitched offset. Default 0.18. */
  duration?: number;
  /** When true, glitch even when not hovered (continuously). Default false. */
  always?: boolean;
}

/**
 * GlitchClip — wraps any content and splits it into N horizontal slices on
 * hover. Each slice shifts horizontally by a small random amount, producing
 * a digital-glitch / VHS-bar effect. Achieved purely through `clip-path`
 * polygons and CSS transforms — no canvas, no filters.
 *
 * The wrapped content is rendered N times, each copy clipped to a single
 * horizontal band. The band-clip is permanent; only the X offset changes
 * on hover, so layout doesn't shift and screen readers see a single block.
 */
const GlitchClip = React.forwardRef<HTMLDivElement, GlitchClipProps>(
  (
    {
      slices = 12,
      intensity = 14,
      duration = 0.18,
      always = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Pre-compute per-slice random offsets once per render so the glitch
    // pattern is stable while a hover is held.
    const offsets = React.useMemo(() => {
      const arr: number[] = [];
      for (let i = 0; i < slices; i++) {
        arr.push((Math.random() * 2 - 1) * intensity);
      }
      return arr;
    }, [slices, intensity]);

    const [hover, setHover] = React.useState(false);
    const active = always || hover;

    return (
      <div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn("relative inline-block", className)}
        style={style}
        {...props}
      >
        {/* Original — visible only when idle. Hidden once a glitch is active
            so its own outline doesn't show beneath the clipped copies. */}
        <div
          aria-hidden={active}
          style={{
            opacity: active ? 0 : 1,
            transition: `opacity ${duration}s linear`,
          }}
        >
          {children}
        </div>

        {/* Stacked clipped copies — one per slice */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: active ? 1 : 0,
            transition: `opacity ${duration}s linear`,
          }}
        >
          {Array.from({ length: slices }).map((_, i) => {
            const top = (i / slices) * 100;
            const bottom = ((i + 1) / slices) * 100;
            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(0 ${top}%, 100% ${top}%, 100% ${bottom}%, 0 ${bottom}%)`,
                  transform: active
                    ? `translateX(${offsets[i]}px)`
                    : "translateX(0)",
                  transition: `transform ${duration}s steps(2, end) ${
                    i * 0.005
                  }s`,
                  willChange: "transform",
                }}
              >
                {children}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
GlitchClip.displayName = "GlitchClip";

export { GlitchClip };
