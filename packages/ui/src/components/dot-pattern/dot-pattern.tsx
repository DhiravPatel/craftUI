"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface DotPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between dots in px. Default 22. */
  spacing?: number;
  /** Dot radius in px. Default 1. */
  dotSize?: number;
  /** Color of the resting (dim) dots. */
  dotColor?: string;
  /** Light up dots near the cursor. Default true. */
  glowOnHover?: boolean;
  /** Radius of the cursor spotlight in px. Default 140. */
  glowRadius?: number;
  /** Color of the lit-up dots inside the spotlight. */
  glowColor?: string;
}

/**
 * DotPattern — a CSS-only dotted background that brightens dots near the
 * cursor via a masked second layer. Pure background-image; no DOM dots, so
 * it scales to any container size for free.
 */
const DotPattern = React.forwardRef<HTMLDivElement, DotPatternProps>(
  (
    {
      spacing = 22,
      dotSize = 1,
      dotColor = "rgba(255, 255, 255, 0.16)",
      glowOnHover = true,
      glowRadius = 140,
      glowColor = "rgba(56, 189, 248, 0.85)",
      className,
      style,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLDivElement
    );
    const [pos, setPos] = React.useState({
      x: -9999,
      y: -9999,
      active: false,
    });

    const dimDots = `radial-gradient(circle ${dotSize}px at center, ${dotColor} 99%, transparent 100%)`;
    const brightDots = `radial-gradient(circle ${dotSize}px at center, ${glowColor} 99%, transparent 100%)`;
    const cursorMask = `radial-gradient(circle ${glowRadius}px at ${pos.x}px ${pos.y}px, black, transparent 80%)`;

    return (
      <div
        ref={innerRef}
        className={cn("relative", className)}
        style={style}
        onMouseMove={(event) => {
          onMouseMove?.(event);
          if (!glowOnHover) return;
          const rect = innerRef.current?.getBoundingClientRect();
          if (!rect) return;
          setPos({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
            active: true,
          });
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          setPos((p) => ({ ...p, active: false }));
        }}
        {...props}
      >
        {/* Dim dots — full coverage */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: dimDots,
            backgroundSize: `${spacing}px ${spacing}px`,
            backgroundPosition: "center center",
          }}
        />
        {/* Bright dots — same grid, masked to the cursor circle */}
        {glowOnHover ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: pos.active ? 1 : 0,
              backgroundImage: brightDots,
              backgroundSize: `${spacing}px ${spacing}px`,
              backgroundPosition: "center center",
              WebkitMaskImage: cursorMask,
              maskImage: cursorMask,
            }}
          />
        ) : null}
      </div>
    );
  }
);
DotPattern.displayName = "DotPattern";

export { DotPattern };
