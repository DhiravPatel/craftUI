"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface HoloCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum tilt angle in degrees. Default 12. */
  intensity?: number;
  /** Perspective distance in px. Smaller = more dramatic. Default 900. */
  perspective?: number;
  /** Strength of the iridescent rainbow shimmer (0–1). Default 0.55. */
  shimmer?: number;
  /** Strength of the cursor highlight (0–1). Default 0.7. */
  glare?: number;
}

const HoloCard = React.forwardRef<HTMLDivElement, HoloCardProps>(
  (
    {
      className,
      intensity = 12,
      perspective = 900,
      shimmer = 0.55,
      glare = 0.7,
      children,
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
      x: 50,
      y: 50,
      rx: 0,
      ry: 0,
      active: false,
    });

    const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event);
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setPos({
        x,
        y,
        rx: ((y - 50) / 50) * -intensity,
        ry: ((x - 50) / 50) * intensity,
        active: true,
      });
    };

    const handleLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event);
      setPos((p) => ({ ...p, rx: 0, ry: 0, active: false }));
    };

    return (
      <div
        ref={innerRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn("relative overflow-hidden", className)}
        style={{
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
          transform: `rotateX(${pos.rx}deg) rotateY(${pos.ry}deg)`,
          transition: pos.active
            ? "transform 100ms ease-out"
            : "transform 400ms cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
          ...style,
        }}
        {...props}
      >
        {children}
        {/* Iridescent rainbow that rotates with cursor angle */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-color-dodge transition-opacity duration-300"
          style={{
            opacity: pos.active ? shimmer : 0,
            background: `conic-gradient(from ${pos.ry * 6}deg at ${pos.x}% ${pos.y}%, rgba(255,80,180,0.55), rgba(255,180,40,0.55), rgba(120,255,160,0.55), rgba(80,180,255,0.55), rgba(180,80,255,0.55), rgba(255,80,180,0.55))`,
          }}
        />
        {/* Soft cursor highlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay transition-opacity duration-300"
          style={{
            opacity: pos.active ? glare : 0,
            background: `radial-gradient(120% 80% at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.75), rgba(255,255,255,0) 45%)`,
          }}
        />
      </div>
    );
  }
);
HoloCard.displayName = "HoloCard";

export { HoloCard };
