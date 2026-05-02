"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface MovingBorderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Border thickness in px. Default 1.5. */
  borderWidth?: number;
  /** Spin duration in seconds. Default 4. */
  duration?: number;
  /** Border radius in px. Default 16. */
  radius?: number;
  /** Background color of the inner content area. Default `bg-background`. */
  innerBg?: string;
  /** Conic-gradient color stops for the moving ring. */
  colors?: string[];
}

const MovingBorder = React.forwardRef<HTMLDivElement, MovingBorderProps>(
  (
    {
      borderWidth = 1.5,
      duration = 4,
      radius = 16,
      innerBg,
      colors,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const palette = colors ?? [
      "transparent",
      "hsl(var(--foreground))",
      "transparent",
      "hsl(var(--foreground))",
      "transparent",
    ];
    const gradient = `conic-gradient(from 0deg, ${palette
      .map((c, i) => `${c} ${(i / (palette.length - 1)) * 100}%`)
      .join(", ")})`;

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={{
          padding: borderWidth,
          borderRadius: radius,
          ...style,
        }}
        {...props}
      >
        <span
          aria-hidden
          className="absolute inset-[-200%] animate-spin"
          style={{
            background: gradient,
            animationDuration: `${duration}s`,
          }}
        />
        <div
          className={cn(
            "relative h-full w-full",
            innerBg ?? "bg-background"
          )}
          style={{ borderRadius: Math.max(0, radius - borderWidth) }}
        >
          {children}
        </div>
      </div>
    );
  }
);
MovingBorder.displayName = "MovingBorder";

export { MovingBorder };
