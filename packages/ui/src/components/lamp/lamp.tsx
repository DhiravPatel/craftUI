"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface LampProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Color of the lamp light. Default sky-cyan. */
  color?: string;
  /** Width of the lamp cone in px. Default 480. */
  beamWidth?: number;
  /** Height of the lamp cone in px. Default 200. */
  beamHeight?: number;
}

const Lamp = React.forwardRef<HTMLDivElement, LampProps>(
  (
    {
      className,
      color = "rgba(56, 189, 248, 0.8)",
      beamWidth = 480,
      beamHeight = 200,
      children,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={style}
        {...props}
      >
        {/* Cone of light from above */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: beamWidth,
            height: beamHeight,
            background: `linear-gradient(to bottom, ${color}, transparent)`,
            clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
            filter: "blur(20px)",
            opacity: 0.85,
          }}
        />
        {/* Bright bar at the very top — the "lamp" itself */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-px -translate-x-1/2"
          style={{
            width: beamWidth * 0.5,
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
            boxShadow: `0 0 24px 4px ${color}`,
          }}
        />
        {/* Soft ambient glow halo */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full blur-2xl"
          style={{
            width: beamWidth * 0.6,
            height: beamHeight * 0.5,
            background: color,
            opacity: 0.35,
          }}
        />
        <div className="relative">{children}</div>
      </div>
    );
  }
);
Lamp.displayName = "Lamp";

export { Lamp };
