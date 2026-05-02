"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface HoverBorderGradientProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Border thickness in px. Default 1.5. */
  borderWidth?: number;
  /** Border radius in px. Default 16. */
  radius?: number;
  /** Inner background. Default `bg-background`. */
  innerBg?: string;
  /** Color of the moving highlight. Default `hsl(var(--foreground))`. */
  color?: string;
}

const HoverBorderGradient = React.forwardRef<
  HTMLDivElement,
  HoverBorderGradientProps
>(
  (
    {
      borderWidth = 1.5,
      radius = 16,
      innerBg,
      color = "hsl(var(--foreground))",
      className,
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
    const [pos, setPos] = React.useState({ x: 50, y: 50, active: false });

    const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event);
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
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
        className={cn("group relative isolate overflow-hidden", className)}
        style={{
          padding: borderWidth,
          borderRadius: radius,
          background: "hsl(var(--border))",
          ...style,
        }}
        {...props}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: pos.active ? 1 : 0,
            background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, ${color}, transparent 60%)`,
          }}
        />
        <div
          className={cn("relative h-full w-full", innerBg ?? "bg-background")}
          style={{ borderRadius: Math.max(0, radius - borderWidth) }}
        >
          {children}
        </div>
      </div>
    );
  }
);
HoverBorderGradient.displayName = "HoverBorderGradient";

export { HoverBorderGradient };
