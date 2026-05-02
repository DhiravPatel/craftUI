"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface Pin3DProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label that pops above the card on hover. */
  label: React.ReactNode;
  /** Optional href — wraps the entire pin in an anchor. */
  href?: string;
  /** Distance the pin lifts above the card in px. Default 64. */
  pinOffset?: number;
  /** Backward tilt of the card on hover, in degrees. Default 30. */
  tilt?: number;
}

const Pin3D = React.forwardRef<HTMLDivElement, Pin3DProps>(
  (
    {
      label,
      href,
      pinOffset = 64,
      tilt = 30,
      className,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [hover, setHover] = React.useState(false);

    const content = (
      <>
        {/* Pin label + halo */}
        <div
          aria-hidden={!hover}
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
          style={{
            opacity: hover ? 1 : 0,
            transform: hover
              ? `translate(-50%, calc(-50% - ${pinOffset}px))`
              : "translate(-50%, -50%)",
          }}
        >
          <span className="relative inline-flex items-center rounded-full border border-foreground/20 bg-background/95 px-3 py-1 text-xs font-medium shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] backdrop-blur">
            {label}
          </span>
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-foreground/10"
            style={{ animationDuration: "2.4s" }}
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30"
          />
        </div>

        {/* Connecting line */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 origin-bottom transition-[height,opacity] duration-500"
          style={{
            width: 1,
            height: hover ? pinOffset : 0,
            marginTop: hover ? -pinOffset : 0,
            opacity: hover ? 1 : 0,
            background:
              "linear-gradient(to top, hsl(var(--foreground) / 0.45), transparent)",
          }}
        />

        {/* Card content */}
        <div
          className="relative"
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
