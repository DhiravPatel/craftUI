"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface LensProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Diameter of the lens in px. Default 140. */
  size?: number;
  /** Magnification factor. Default 1.8. */
  zoom?: number;
  /** Whether the lens is always visible. Default false (only on hover). */
  alwaysVisible?: boolean;
}

const Lens = React.forwardRef<HTMLDivElement, LensProps>(
  (
    {
      className,
      size = 140,
      zoom = 1.8,
      alwaysVisible = false,
      children,
      style,
      onMouseMove,
      onMouseEnter,
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
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      active: alwaysVisible,
    });

    const update = (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        width: rect.width,
        height: rect.height,
        active: true,
      });
    };

    const handleEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(event);
      update(event);
    };
    const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event);
      update(event);
    };
    const handleLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event);
      if (!alwaysVisible) setPos((p) => ({ ...p, active: false }));
    };

    const visible = pos.active || alwaysVisible;

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
        {/* Magnifier: a circular clip showing a scaled-up clone of the children. */}
        <div
          aria-hidden
          className="pointer-events-none absolute transition-opacity duration-200"
          style={{
            opacity: visible ? 1 : 0,
            width: size,
            height: size,
            top: 0,
            left: 0,
            transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`,
            borderRadius: "9999px",
            overflow: "hidden",
            boxShadow:
              "0 12px 32px -8px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.55), inset 0 -8px 14px -4px rgba(0,0,0,0.18), inset 0 8px 14px -4px rgba(255,255,255,0.45)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: pos.width,
              height: pos.height,
              transform: `scale(${zoom}) translate(${(size / 2 - pos.x) / zoom}px, ${(size / 2 - pos.y) / zoom}px)`,
              transformOrigin: "0 0",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Lens.displayName = "Lens";

export { Lens };
