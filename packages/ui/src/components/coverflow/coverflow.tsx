"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CoverflowItem {
  id: string | number;
  content: React.ReactNode;
}

export interface CoverflowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: CoverflowItem[];
  /** Controlled active index. */
  index?: number;
  /** Initial index when uncontrolled. Default 0. */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Width of each item card in px. Default 220. */
  itemWidth?: number;
  /** Height of each item card in px. Default 280. */
  itemHeight?: number;
  /** Rotation angle (deg) for off-center items. Default 45. */
  rotation?: number;
  /** Horizontal spacing factor between items. Default 0.6 of itemWidth. */
  spacing?: number;
}

const Coverflow = React.forwardRef<HTMLDivElement, CoverflowProps>(
  (
    {
      items,
      index,
      defaultIndex = 0,
      onIndexChange,
      itemWidth = 220,
      itemHeight = 280,
      rotation = 45,
      spacing = 0.6,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultIndex);
    const isControlled = index !== undefined;
    const active = isControlled ? index : uncontrolled;

    const select = (next: number) => {
      const clamped = Math.max(0, Math.min(items.length - 1, next));
      if (clamped === active) return;
      if (!isControlled) setUncontrolled(clamped);
      onIndexChange?.(clamped);
    };

    return (
      <div
        ref={ref}
        role="listbox"
        aria-orientation="horizontal"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            select(active + 1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            select(active - 1);
          }
        }}
        className={cn(
          "relative flex items-center justify-center overflow-hidden focus-visible:outline-none",
          className
        )}
        style={{
          height: itemHeight + 60,
          perspective: "1400px",
          ...style,
        }}
        {...props}
      >
        <div
          className="relative"
          style={{
            width: itemWidth,
            height: itemHeight,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const offset = i - active;
            const isActive = offset === 0;
            const abs = Math.abs(offset);
            return (
              <div
                key={item.id}
                role="option"
                aria-selected={isActive}
                onClick={() => select(i)}
                className={cn(
                  "absolute inset-0 overflow-hidden rounded-xl border border-border/60 bg-card text-card-foreground",
                  "shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35),0_4px_12px_-4px_rgba(0,0,0,0.12)]",
                  "transition-[transform,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  abs > 0 && "cursor-pointer"
                )}
                style={{
                  transform: `translateX(${offset * itemWidth * spacing}px) rotateY(${
                    offset === 0 ? 0 : offset > 0 ? -rotation : rotation
                  }deg) translateZ(${isActive ? 60 : 0}px)`,
                  zIndex: items.length - abs,
                  opacity: abs > 3 ? 0 : 1 - abs * 0.16,
                  pointerEvents: abs > 3 ? "none" : "auto",
                }}
              >
                {item.content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
Coverflow.displayName = "Coverflow";

export { Coverflow };
