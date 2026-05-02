"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface MagnetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum translation distance in px (the pull strength). Default 24. */
  strength?: number;
  /** Distance from center in px where the pull starts. Default 100. */
  range?: number;
  /** Disable the magnet effect. Default false. */
  disabled?: boolean;
}

const Magnet = React.forwardRef<HTMLDivElement, MagnetProps>(
  (
    {
      strength = 24,
      range = 100,
      disabled = false,
      className,
      children,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLDivElement
    );
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
      if (disabled) {
        setOffset({ x: 0, y: 0 });
        return;
      }
      const handler = (event: MouseEvent) => {
        const el = innerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > range) {
          setOffset({ x: 0, y: 0 });
          return;
        }
        const pull = 1 - dist / range;
        setOffset({
          x: (dx / dist) * pull * strength,
          y: (dy / dist) * pull * strength,
        });
      };
      window.addEventListener("mousemove", handler);
      return () => window.removeEventListener("mousemove", handler);
    }, [range, strength, disabled]);

    return (
      <div
        ref={innerRef}
        className={cn("inline-block", className)}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: "transform 280ms cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Magnet.displayName = "Magnet";

export { Magnet };
