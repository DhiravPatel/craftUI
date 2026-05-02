"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface NeonGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Glow color. Default cyan. Accepts `rgb(...)` for alpha derivation, or a custom color. */
  color?: string;
  /** Glow intensity (0–1). Default 0.7. */
  intensity?: number;
  /** Border radius in px. Default 16. */
  radius?: number;
}

const NeonGlow = React.forwardRef<HTMLDivElement, NeonGlowProps>(
  (
    {
      color = "rgb(34, 211, 238)",
      intensity = 0.7,
      radius = 16,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const shadow = `0 0 12px ${withAlpha(color, intensity * 0.7)}, 0 0 28px ${withAlpha(color, intensity * 0.5)}, 0 0 56px ${withAlpha(color, intensity * 0.35)}, inset 0 0 12px ${withAlpha(color, intensity * 0.3)}`;
    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{
          borderRadius: radius,
          border: `1px solid ${withAlpha(color, 0.6)}`,
          boxShadow: shadow,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NeonGlow.displayName = "NeonGlow";

function withAlpha(color: string, alpha: number): string {
  const m = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  if (m) return `rgba(${m[1]},${m[2]},${m[3]},${alpha})`;
  return color;
}

export { NeonGlow };
