"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface AnimatedTooltipItem {
  id: string | number;
  name: string;
  designation?: string;
  image?: string;
}

export interface AnimatedTooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: AnimatedTooltipItem[];
  /** Avatar diameter in px. Default 48. */
  size?: number;
}

const AnimatedTooltip = React.forwardRef<HTMLDivElement, AnimatedTooltipProps>(
  ({ items, size = 48, className, ...props }, ref) => {
    const [hoveredId, setHoveredId] = React.useState<string | number | null>(
      null
    );
    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {items.map((item, idx) => {
          const hovered = hoveredId === item.id;
          return (
            <div
              key={item.id}
              className="group relative -ml-3 first:ml-0"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ zIndex: hovered ? 30 : items.length - idx }}
            >
              {/* Tooltip */}
              <div
                aria-hidden={!hovered}
                className={cn(
                  "pointer-events-none absolute left-1/2 -top-3 z-30 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-background shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)] transition-[transform,opacity] duration-200"
                )}
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: `translate(-50%, ${hovered ? "-100%" : "calc(-100% + 8px)"})`,
                }}
              >
                <span className="block text-xs font-semibold leading-tight">
                  {item.name}
                </span>
                {item.designation ? (
                  <span className="block text-[10px] leading-tight opacity-70">
                    {item.designation}
                  </span>
                ) : null}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground"
                />
              </div>

              {/* Avatar */}
              <div
                className="overflow-hidden rounded-full border-2 border-background bg-muted ring-1 ring-foreground/10 transition-transform duration-200 ease-out"
                style={{
                  width: size,
                  height: size,
                  transform: hovered
                    ? "translateY(-6px) scale(1.1) rotate(-3deg)"
                    : "translateY(0) scale(1) rotate(0)",
                }}
              >
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-foreground/5 text-xs font-semibold text-foreground/70">
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
AnimatedTooltip.displayName = "AnimatedTooltip";

export { AnimatedTooltip };
