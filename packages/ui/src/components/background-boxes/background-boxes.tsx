"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface BackgroundBoxesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of rows. Default 12. */
  rows?: number;
  /** Number of columns. Default 24. */
  cols?: number;
  /** Cell size in px. Default 36. */
  cellSize?: number;
  /** Color used for the hover highlight. Default purple. */
  hoverColor?: string;
}

const BackgroundBoxes = React.forwardRef<
  HTMLDivElement,
  BackgroundBoxesProps
>(
  (
    {
      rows = 12,
      cols = 24,
      cellSize = 36,
      hoverColor = "rgba(168, 85, 247, 0.85)",
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden",
          className
        )}
        style={style}
        {...props}
      >
        <div
          className="pointer-events-auto"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
            transform: "skewX(-12deg) translateX(-30px)",
            gap: 0,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => (
            <span
              key={i}
              className="block border-r border-t border-foreground/[0.04] transition-colors duration-300 hover:duration-0"
              style={
                {
                  width: cellSize,
                  height: cellSize,
                  ["--hover" as string]: hoverColor,
                } as React.CSSProperties
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverColor;
              }}
              onMouseLeave={(e) => {
                // Linger briefly, then fade out via transition.
                window.setTimeout(() => {
                  if (e.currentTarget) e.currentTarget.style.backgroundColor = "transparent";
                }, 50);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);
BackgroundBoxes.displayName = "BackgroundBoxes";

export { BackgroundBoxes };
