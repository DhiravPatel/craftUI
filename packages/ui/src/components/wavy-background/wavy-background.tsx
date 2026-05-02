"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface WavyBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Wave colors (one path per color). Default warm aurora. */
  colors?: string[];
  /** Animation duration in seconds for one back-and-forth. Default 14. */
  duration?: number;
  /** Stroke width of each wave in px. Default 3. */
  strokeWidth?: number;
  /** Blur in px applied to the waves. Default 8. */
  blur?: number;
}

const WavyBackground = React.forwardRef<HTMLDivElement, WavyBackgroundProps>(
  (
    {
      colors,
      duration = 14,
      strokeWidth = 3,
      blur = 8,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const palette = colors ?? [
      "rgba(168, 85, 247, 0.7)",
      "rgba(56, 189, 248, 0.7)",
      "rgba(236, 72, 153, 0.7)",
      "rgba(34, 197, 94, 0.6)",
    ];

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={style}
        {...props}
      >
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 600 200"
          preserveAspectRatio="none"
          style={{ filter: `blur(${blur}px)` }}
        >
          {palette.map((c, i) => (
            <path
              key={i}
              d={i % 2 === 0
                ? "M0 100 C 150 40 300 160 600 80"
                : "M0 110 C 200 180 400 20 600 120"}
              stroke={c}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: `wavy-${i % 2} ${duration + i * 2}s ${
                  i * -2
                }s ease-in-out infinite alternate`,
                opacity: 0.85,
              }}
            />
          ))}
        </svg>
        <style>{`
          @keyframes wavy-0 {
            0%   { transform: translateY(-10%) translateX(-3%) scaleY(1); }
            50%  { transform: translateY(8%) translateX(2%) scaleY(1.2); }
            100% { transform: translateY(-5%) translateX(4%) scaleY(0.9); }
          }
          @keyframes wavy-1 {
            0%   { transform: translateY(8%) translateX(2%) scaleY(0.95); }
            50%  { transform: translateY(-10%) translateX(-3%) scaleY(1.1); }
            100% { transform: translateY(5%) translateX(-4%) scaleY(1); }
          }
        `}</style>
        <div className="relative">{children}</div>
      </div>
    );
  }
);
WavyBackground.displayName = "WavyBackground";

export { WavyBackground };
