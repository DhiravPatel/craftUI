"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface InfiniteMovingCardsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Items to scroll. Duplicated internally for a seamless loop. */
  items: React.ReactNode[];
  /** Direction of scroll. Default "left". */
  direction?: "left" | "right";
  /** Scroll duration in seconds. Default 30. */
  duration?: number;
  /** Pause on hover. Default true. */
  pauseOnHover?: boolean;
  /** Spacing between items in px. Default 16. */
  gap?: number;
  /** Add a fade mask at the edges. Default true. */
  fade?: boolean;
}

const InfiniteMovingCards = React.forwardRef<
  HTMLDivElement,
  InfiniteMovingCardsProps
>(
  (
    {
      items,
      direction = "left",
      duration = 30,
      pauseOnHover = true,
      gap = 16,
      fade = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("group relative overflow-hidden", className)}
        style={{
          maskImage: fade
            ? "linear-gradient(to right, transparent, black 12%, black 88%, transparent)"
            : undefined,
          WebkitMaskImage: fade
            ? "linear-gradient(to right, transparent, black 12%, black 88%, transparent)"
            : undefined,
          ...style,
        }}
        {...props}
      >
        <div
          className={cn(
            "flex shrink-0",
            direction === "left" ? "animate-marquee-x" : "animate-marquee-x-reverse",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={
            {
              gap,
              "--marquee-duration": `${duration}s`,
            } as React.CSSProperties
          }
        >
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="shrink-0"
              aria-hidden={i >= items.length}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
InfiniteMovingCards.displayName = "InfiniteMovingCards";

export { InfiniteMovingCards };
