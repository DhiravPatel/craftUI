"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface FeatureCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Icon shown in the colored tile at the top of the card. */
  icon: React.ReactNode;
  /** Card title. */
  title: React.ReactNode;
  /** Card body. */
  description: React.ReactNode;
  /** CSS background applied to the icon tile. Default a sky→indigo gradient. */
  iconBackground?: string;
  /** Color used for the icon glyph itself. Default white. */
  iconColor?: string;
  /** Diameter of the icon tile in px. Default 48. */
  iconSize?: number;
  /** Border radius of the card in px. Default 18. */
  radius?: number;
  /** When true, render a soft cursor-tracking glow on hover. Default true. */
  glow?: boolean;
}

/**
 * FeatureCard — a tidy feature block for landing-page feature grids. Has a
 * gradient icon tile, a heading, a description, and a subtle hover lift
 * with an optional cursor-tracking glow. Drop a few of these into a 2- or
 * 3-column grid for the "What you get" section.
 */
const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon,
      title,
      description,
      iconBackground = "linear-gradient(135deg, rgb(125, 211, 252) 0%, rgb(99, 102, 241) 100%)",
      iconColor = "white",
      iconSize = 48,
      radius = 18,
      glow = true,
      className,
      style,
      onMouseMove,
      onMouseLeave,
      children,
      ...props
    },
    ref
  ) => {
    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const glowRef = React.useRef<HTMLSpanElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        wrapRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      if (!glow || !glowRef.current || !wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.background = `radial-gradient(220px circle at ${x}px ${y}px, rgba(125,211,252,0.18), transparent 60%)`;
      glowRef.current.style.opacity = "1";
    };
    const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    return (
      <div
        ref={setRefs}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "group relative overflow-hidden border border-white/10 bg-neutral-950 p-6 text-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
          className
        )}
        style={{ borderRadius: radius, ...style }}
        {...props}
      >
        {glow ? (
          <span
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
          />
        ) : null}

        <div
          className="relative flex items-center justify-center"
          style={{
            width: iconSize,
            height: iconSize,
            borderRadius: Math.max(10, iconSize * 0.28),
            background: iconBackground,
            color: iconColor,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), 0 12px 24px -10px rgba(0,0,0,0.45)",
          }}
        >
          {icon}
        </div>

        <h3 className="relative mt-5 text-base font-semibold tracking-tight">
          {title}
        </h3>
        <p className="relative mt-1.5 text-sm leading-relaxed text-white/65">
          {description}
        </p>
        {children ? <div className="relative mt-4">{children}</div> : null}
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
