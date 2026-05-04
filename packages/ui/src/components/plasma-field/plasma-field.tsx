"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PlasmaFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size in px. Default 320. */
  size?: number;
  /** Animation duration in seconds. Default 14. */
  duration?: number;
  /** Blob colors. */
  colors?: string[];
  /** Blur in px. Default 40. */
  blur?: number;
}

const PlasmaField = React.forwardRef<HTMLDivElement, PlasmaFieldProps>(
  (
    {
      size = 320,
      duration = 14,
      colors,
      blur = 40,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const palette =
      colors ??
      [
        "rgba(56, 189, 248, 0.8)",
        "rgba(168, 85, 247, 0.8)",
        "rgba(236, 72, 153, 0.8)",
      ];

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <div aria-hidden className="absolute inset-0 overflow-hidden rounded-full">
          {palette.map((color, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size * 0.75,
                height: size * 0.75,
                left: `${10 + i * 15}%`,
                top: `${15 + i * 10}%`,
                background: color,
                filter: `blur(${blur}px)`,
                animation: `plasma-field-${i} ${duration + i * 2}s ease-in-out infinite`,
                mixBlendMode: "screen",
              }}
            />
          ))}
        </div>
        <div className="relative z-10 h-full w-full">{children}</div>
        <style>{`
          @keyframes plasma-field-0 {
            0%, 100% { transform: translate(-10%, -5%) scale(1); }
            50% { transform: translate(15%, 8%) scale(1.1); }
          }
          @keyframes plasma-field-1 {
            0%, 100% { transform: translate(8%, 10%) scale(0.95); }
            50% { transform: translate(-12%, -6%) scale(1.15); }
          }
          @keyframes plasma-field-2 {
            0%, 100% { transform: translate(6%, -8%) scale(1.05); }
            50% { transform: translate(-8%, 12%) scale(0.9); }
          }
        `}</style>
      </div>
    );
  }
);
PlasmaField.displayName = "PlasmaField";

export { PlasmaField };
