"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface Pin3DProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label that pops above the card on hover. */
  label: React.ReactNode;
  /** Optional href — wraps the entire pin in an anchor. */
  href?: string;
  /** Distance the pin label lifts above the top edge of the card, in px. Default 56. */
  pinOffset?: number;
  /** How far the line continues INTO the card (the "landing depth") in px. Default 100 — lands slightly above the card's vertical center for typical hero cards (~280px tall). */
  landingDepth?: number;
  /** Backward tilt of the card on hover, in degrees. Default 22. */
  tilt?: number;
  /** Color of the connecting line and landing ripple. Default cyan. */
  lineColor?: string;
}

const Pin3D = React.forwardRef<HTMLDivElement, Pin3DProps>(
  (
    {
      label,
      href,
      pinOffset = 56,
      landingDepth = 100,
      tilt = 22,
      lineColor = "rgb(34, 211, 238)",
      className,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [hover, setHover] = React.useState(false);
    const totalLineHeight = pinOffset + landingDepth;

    const content = (
      <>
        {/* Pin label + halo. Anchored to the TOP of the card. */}
        <div
          aria-hidden={!hover}
          className="pointer-events-none absolute left-1/2 top-0 z-40 -translate-x-1/2 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: hover ? 1 : 0,
            transform: hover
              ? `translate(-50%, calc(-100% - ${pinOffset}px))`
              : "translate(-50%, -25%)",
          }}
        >
          <span className="relative inline-flex items-center whitespace-nowrap rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]">
            {label}
          </span>
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-12 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
            style={{ background: lineColor, opacity: 0.25 }}
          />
        </div>

        {/* Connecting line — runs from pin label down through the card top edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 transition-[opacity,height] duration-500"
          style={{
            top: `-${pinOffset}px`,
            width: 1,
            height: hover ? totalLineHeight : 0,
            background: `linear-gradient(to bottom, transparent 0%, ${lineColor} 30%, ${lineColor} 100%)`,
            boxShadow: `0 0 6px 1px ${lineColor}`,
            opacity: hover ? 0.95 : 0,
          }}
        />

        {/* Landing point — concentric ripple where the line "pierces" the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
          style={{
            top: landingDepth,
            opacity: hover ? 1 : 0,
            color: lineColor,
          }}
        >
          {/* Outer ripple */}
          <span
            className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
            style={{
              border: `1px solid ${lineColor}`,
              opacity: 0.55,
              animationDuration: "2.4s",
            }}
          />
          {/* Inner ring */}
          <span
            className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              border: `1px solid ${lineColor}`,
              opacity: 0.65,
            }}
          />
          {/* Center dot + glow */}
          <span
            className="block h-1.5 w-1.5 rounded-full"
            style={{
              background: lineColor,
              boxShadow: `0 0 12px 3px ${lineColor}`,
            }}
          />
        </div>

        {/* Card content — tilts back on hover so the pin appears to "lift" it */}
        <div
          className="relative z-10"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "bottom",
            transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
            transform: hover ? `rotateX(${tilt}deg)` : "none",
          }}
        >
          {children}
        </div>
      </>
    );

    const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      setHover(true);
    };
    const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      setHover(false);
    };

    if (href) {
      return (
        <a
          href={href}
          onMouseEnter={handleEnter as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          onMouseLeave={handleLeave as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          className={cn("relative block", className)}
          style={{ perspective: "1000px" }}
        >
          {content}
        </a>
      );
    }

    return (
      <div
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn("relative", className)}
        style={{ perspective: "1000px" }}
        {...props}
      >
        {content}
      </div>
    );
  }
);
Pin3D.displayName = "Pin3D";

export { Pin3D };
