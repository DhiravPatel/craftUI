"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface EvervaultCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Characters to fill the background grid. Default hex digits. */
  charSet?: string;
  /** Number of characters to render in the background. Default 800. */
  charCount?: number;
  /** Color of the cursor-following gradient. Default cyan. */
  cursorColor?: string;
  /** Border radius in px. Default 16. */
  radius?: number;
}

/**
 * EvervaultCard — a card whose background fills with random characters that
 * become visible behind a cursor-tracked colored gradient on hover. Inspired
 * by the encrypted-storage-vault aesthetic.
 */
const EvervaultCard = React.forwardRef<HTMLDivElement, EvervaultCardProps>(
  (
    {
      charSet = "0123456789ABCDEF",
      charCount = 800,
      cursorColor = "rgb(34, 211, 238)",
      radius = 16,
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

    // Generate a stable list of random characters once.
    const chars = React.useMemo(() => {
      const out: string[] = [];
      for (let i = 0; i < charCount; i++) {
        out.push(
          charSet.charAt(Math.floor(Math.random() * charSet.length))
        );
      }
      return out;
    }, [charSet, charCount]);

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
        className={cn(
          "group relative isolate overflow-hidden border border-border/60 bg-card text-card-foreground",
          className
        )}
        style={{ borderRadius: radius, ...style }}
        {...props}
      >
        {/* Random character grid (decorative, fades in on hover). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden font-mono text-[8px] leading-[10px] text-foreground/15 transition-opacity duration-300"
          style={{ opacity: pos.active ? 1 : 0 }}
        >
          <div className="flex h-full w-full flex-wrap content-start gap-x-[3px] break-all p-2">
            {chars.map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>

        {/* Cursor-tracked colored gradient — masks reveal underlying characters. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: pos.active ? 1 : 0,
            background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${cursorColor}, rgba(168, 85, 247, 0.7) 25%, transparent 60%)`,
            mixBlendMode: "screen",
          }}
        />

        {/* Content */}
        <div className="relative z-20 flex h-full w-full items-center justify-center">
          {children}
        </div>
      </div>
    );
  }
);
EvervaultCard.displayName = "EvervaultCard";

export { EvervaultCard };
