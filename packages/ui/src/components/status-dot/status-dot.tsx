"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type StatusDotTone =
  | "online"
  | "offline"
  | "away"
  | "busy"
  | "recording"
  | "syncing"
  | "neutral";

export interface StatusDotProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Tone of the dot — picks color + animation behavior. Default "online". */
  tone?: StatusDotTone;
  /** Diameter of the inner dot in px. Default 9. */
  size?: number;
  /** Override the tone's color. */
  color?: string;
  /** Show the concentric pulse ring(s). Default depends on tone. */
  pulse?: boolean;
  /** Pulse speed (seconds per cycle). Default 2. */
  duration?: number;
  /** Optional label rendered to the right of the dot. */
  label?: React.ReactNode;
}

const TONE_COLOR: Record<StatusDotTone, string> = {
  online: "rgb(74, 222, 128)",
  offline: "rgb(115, 115, 115)",
  away: "rgb(251, 191, 36)",
  busy: "rgb(244, 63, 94)",
  recording: "rgb(239, 68, 68)",
  syncing: "rgb(125, 211, 252)",
  neutral: "rgb(229, 229, 229)",
};

// Tones that pulse by default — typically "live" / "active" states.
const PULSE_BY_DEFAULT: Record<StatusDotTone, boolean> = {
  online: true,
  offline: false,
  away: false,
  busy: false,
  recording: true,
  syncing: true,
  neutral: false,
};

/**
 * StatusDot — a small status indicator with an optional animated pulse.
 * Picks a sensible color and pulse behavior per tone (online / recording
 * pulse, offline / away stay static), and you can override either with
 * `color` and `pulse`. Pass `label` to render text alongside.
 */
const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  (
    {
      tone = "online",
      size = 9,
      color,
      pulse,
      duration = 2,
      label,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const fill = color ?? TONE_COLOR[tone];
    const showPulse = pulse ?? PULSE_BY_DEFAULT[tone];
    const ringSize = size * 2.4;

    return (
      <span
        ref={ref}
        role="status"
        aria-label={typeof label === "string" ? label : tone}
        className={cn("inline-flex items-center gap-2", className)}
        style={style}
        {...props}
      >
        <span
          className="relative inline-flex items-center justify-center"
          style={{ width: ringSize, height: ringSize }}
        >
          {showPulse ? (
            <>
              <span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  background: fill,
                  animation: `craftui-status-pulse ${duration}s ease-out infinite`,
                  opacity: 0.55,
                }}
              />
              <span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  background: fill,
                  animation: `craftui-status-pulse ${duration}s ease-out ${duration / 2}s infinite`,
                  opacity: 0.4,
                }}
              />
            </>
          ) : null}
          <span
            className="relative block rounded-full"
            style={{
              width: size,
              height: size,
              background: fill,
              boxShadow: showPulse
                ? `0 0 0 1px ${fill}33, 0 0 8px ${fill}66`
                : `inset 0 0 0 1px rgba(0,0,0,0.15)`,
            }}
          />
        </span>
        {label != null ? (
          <span className="text-sm text-white/85">{label}</span>
        ) : null}

        <style>{`
          @keyframes craftui-status-pulse {
            0% { transform: scale(0.5); opacity: 0.55; }
            70% { transform: scale(1.6); opacity: 0; }
            100% { transform: scale(1.6); opacity: 0; }
          }
        `}</style>
      </span>
    );
  }
);
StatusDot.displayName = "StatusDot";

export { StatusDot };
