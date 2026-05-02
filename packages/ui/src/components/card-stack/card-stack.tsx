"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CardStackItem {
  id: string | number;
  content: React.ReactNode;
}

export interface CardStackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: CardStackItem[];
  /** Auto-cycle interval in ms. Set to 0 to disable. Default 4000. */
  interval?: number;
  /** How many cards behind the front card to render visibly. Default 3. */
  visibleDepth?: number;
  /** Vertical offset between layered cards in px. Default 10. */
  offsetY?: number;
  /** Scale step between layered cards. Default 0.04. */
  scaleStep?: number;
  /** Pause cycling on hover. Default true. */
  pauseOnHover?: boolean;
}

const CardStack = React.forwardRef<HTMLDivElement, CardStackProps>(
  (
    {
      className,
      items,
      interval = 4000,
      visibleDepth = 3,
      offsetY = 10,
      scaleStep = 0.04,
      pauseOnHover = true,
      style,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [order, setOrder] = React.useState<number[]>(() =>
      items.map((_, i) => i)
    );
    const [paused, setPaused] = React.useState(false);

    // Reset order when items change.
    React.useEffect(() => {
      setOrder(items.map((_, i) => i));
    }, [items]);

    React.useEffect(() => {
      if (interval <= 0 || paused || items.length < 2) return;
      const id = window.setInterval(() => {
        setOrder((prev) => [...prev.slice(1), prev[0]!]);
      }, interval);
      return () => window.clearInterval(id);
    }, [interval, paused, items.length]);

    const cycle = () =>
      setOrder((prev) => [...prev.slice(1), prev[0]!]);

    return (
      <div
        ref={ref}
        onMouseEnter={(event) => {
          onMouseEnter?.(event);
          if (pauseOnHover) setPaused(true);
        }}
        onMouseLeave={(event) => {
          onMouseLeave?.(event);
          if (pauseOnHover) setPaused(false);
        }}
        className={cn("relative", className)}
        style={{
          perspective: "1200px",
          ...style,
        }}
        {...props}
      >
        {order.map((index, position) => {
          const item = items[index]!;
          const visible = position < visibleDepth;
          return (
            <div
              key={item.id}
              onClick={position === 0 ? cycle : undefined}
              className={cn(
                "absolute inset-0 select-none rounded-xl border border-border/60 bg-card p-6 text-card-foreground shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15),0_2px_8px_-2px_rgba(0,0,0,0.08)]",
                "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                position === 0 && interval > 0 && "cursor-pointer"
              )}
              style={{
                transformOrigin: "top center",
                transform: `translateY(${position * offsetY}px) translateZ(${-position * 30}px) scale(${1 - position * scaleStep})`,
                opacity: visible ? 1 - position * 0.18 : 0,
                pointerEvents: position === 0 ? "auto" : "none",
                zIndex: items.length - position,
              }}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    );
  }
);
CardStack.displayName = "CardStack";

export { CardStack };
