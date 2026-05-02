"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spotlight radius in px. Default 360. */
  size?: number;
  /** Tailwind/CSS color string for the spotlight. Default white at low opacity. */
  color?: string;
  /** Spotlight intensity (0–1). Default 0.18. */
  intensity?: number;
  /** Show a static ambient glow even when not hovered. Default false. */
  ambient?: boolean;
}

const Spotlight = React.forwardRef<HTMLDivElement, SpotlightProps>(
  (
    {
      className,
      size = 360,
      color = "rgba(255,255,255,0.9)",
      intensity = 0.18,
      ambient = false,
      children,
      style,
      onMouseMove,
      onMouseLeave,
      onMouseEnter,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLDivElement
    );
    const [pos, setPos] = React.useState({ x: 0, y: 0, active: false });

    const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event);
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      });
    };
    const handleEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(event);
      setPos((p) => ({ ...p, active: true }));
    };
    const handleLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event);
      setPos((p) => ({ ...p, active: false }));
    };

    return (
      <div
        ref={innerRef}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn("relative overflow-hidden", className)}
        style={style}
        {...props}
      >
        {children}
        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: pos.active ? intensity : ambient ? intensity * 0.4 : 0,
            background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
          }}
        />
      </div>
    );
  }
);
Spotlight.displayName = "Spotlight";

export { Spotlight };
