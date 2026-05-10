"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface DotProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Total number of steps. */
  steps: number;
  /** Zero-based index of the current step. */
  current: number;
  /** Diameter of an inactive dot in px. Default 8. */
  size?: number;
  /** Length of the active dot pill in px. Default 24 (gives the active step a stretched-pill look). */
  activeSize?: number;
  /** Gap between dots in px. Default 8. */
  gap?: number;
  /** Color of the active dot. Default a foreground tone. */
  color?: string;
  /** Color of inactive dots. Default a soft white. */
  trackColor?: string;
  /** Click a dot to jump to that step. */
  onStepClick?: (index: number) => void;
}

/**
 * DotProgress — a row of step dots, with the active step rendered as a
 * stretched pill so the current position is unmistakable. Past steps are
 * dimmed; future steps stay neutral. Useful in onboarding flows, multi-page
 * forms, and image carousels.
 */
const DotProgress = React.forwardRef<HTMLDivElement, DotProgressProps>(
  (
    {
      steps,
      current,
      size = 8,
      activeSize = 24,
      gap = 8,
      color = "currentColor",
      trackColor = "rgba(255,255,255,0.25)",
      onStepClick,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Step progress"
        className={cn("inline-flex items-center", className)}
        style={{ gap, ...style }}
        {...props}
      >
        {Array.from({ length: steps }).map((_, i) => {
          const isActive = i === current;
          const isPast = i < current;
          const interactive = typeof onStepClick === "function";
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "step" : undefined}
              tabIndex={interactive ? 0 : -1}
              onClick={interactive ? () => onStepClick!(i) : undefined}
              className={cn(
                "block rounded-full p-0 outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60",
                interactive ? "cursor-pointer" : "cursor-default"
              )}
              style={{
                width: isActive ? activeSize : size,
                height: size,
                background: isActive ? color : trackColor,
                opacity: isPast ? 0.55 : 1,
                transition:
                  "width 360ms cubic-bezier(0.22,1,0.36,1), background 220ms ease, opacity 220ms ease",
                border: "none",
              }}
            />
          );
        })}
      </div>
    );
  }
);
DotProgress.displayName = "DotProgress";

export { DotProgress };
