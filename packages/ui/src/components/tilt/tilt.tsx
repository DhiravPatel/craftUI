"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum tilt angle in degrees (default 12). */
  intensity?: number;
  /** Perspective distance in pixels (default 1000). Smaller = more dramatic. */
  perspective?: number;
  /** Render a soft white glare that follows the cursor. */
  glare?: boolean;
  /** Scale factor on hover (default 1.02). Set to 1 to disable. */
  scale?: number;
}

const Tilt = React.forwardRef<HTMLDivElement, TiltProps>(
  (
    {
      className,
      intensity = 12,
      perspective = 1000,
      glare = true,
      scale = 1.02,
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

    const [transform, setTransform] = React.useState({
      rx: 0,
      ry: 0,
      gx: 50,
      gy: 50,
      active: false,
    });

    const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event);
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      setTransform({
        rx: (y - 0.5) * -intensity * 2,
        ry: (x - 0.5) * intensity * 2,
        gx: x * 100,
        gy: y * 100,
        active: true,
      });
    };

    const handleLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event);
      setTransform((t) => ({ ...t, rx: 0, ry: 0, active: false }));
    };

    return (
      <div
        ref={innerRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn("relative", className)}
        style={{
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
          transform: `rotateX(${transform.rx}deg) rotateY(${transform.ry}deg) scale(${transform.active ? scale : 1})`,
          transition: transform.active
            ? "transform 80ms ease-out"
            : "transform 350ms cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
          ...style,
        }}
        {...props}
      >
        {children}
        {glare ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay transition-opacity duration-300"
            style={{
              opacity: transform.active ? 1 : 0,
              background: `radial-gradient(circle at ${transform.gx}% ${transform.gy}%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)`,
            }}
          />
        ) : null}
      </div>
    );
  }
);
Tilt.displayName = "Tilt";

export { Tilt };
