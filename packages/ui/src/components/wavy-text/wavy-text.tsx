"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface WavyTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Text to animate. */
  text: string;
  /** Vertical wave amplitude in px. Default 8. */
  amplitude?: number;
  /** Single oscillation duration in seconds. Default 2. */
  duration?: number;
  /** Per-character delay in seconds. Default 0.08. */
  stagger?: number;
}

/**
 * WavyText — text where each character oscillates vertically on a sine wave,
 * with a per-character delay so the wave travels through the word.
 */
const WavyText = React.forwardRef<HTMLSpanElement, WavyTextProps>(
  (
    {
      text,
      amplitude = 8,
      duration = 2,
      stagger = 0.08,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn("inline-flex whitespace-pre", className)}
        {...props}
      >
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            className="animate-wavy inline-block"
            style={
              {
                animationDuration: `${duration}s`,
                animationDelay: `${i * stagger}s`,
                "--wavy-amplitude": `${amplitude}px`,
              } as React.CSSProperties
            }
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    );
  }
);
WavyText.displayName = "WavyText";

export { WavyText };
