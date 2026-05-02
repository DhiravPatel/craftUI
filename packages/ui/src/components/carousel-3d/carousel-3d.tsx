"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface Carousel3DItem {
  id: string | number;
  content: React.ReactNode;
}

export interface Carousel3DProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: Carousel3DItem[];
  /** Controlled active index. */
  index?: number;
  /** Initial index when uncontrolled. Default 0. */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Ring radius in px. Default 280. */
  radius?: number;
  /** Width of each item in px. Default 200. */
  itemWidth?: number;
  /** Height of each item in px. Default 260. */
  itemHeight?: number;
  /** Auto-advance interval in ms. Set to 0 to disable. Default 0. */
  autoplay?: number;
  /** Hide items on the far side of the ring. Default true. */
  hideBackside?: boolean;
}

const Carousel3D = React.forwardRef<HTMLDivElement, Carousel3DProps>(
  (
    {
      items,
      index,
      defaultIndex = 0,
      onIndexChange,
      radius = 280,
      itemWidth = 200,
      itemHeight = 260,
      autoplay = 0,
      hideBackside = true,
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
      const clamped = ((next % items.length) + items.length) % items.length;
      if (clamped === active) return;
      if (!isControlled) setUncontrolled(clamped);
      onIndexChange?.(clamped);
    };

    React.useEffect(() => {
      if (autoplay <= 0 || items.length < 2 || isControlled) return;
      const id = window.setInterval(() => {
        setUncontrolled((prev) => (prev + 1) % items.length);
      }, autoplay);
      return () => window.clearInterval(id);
    }, [autoplay, items.length, isControlled]);

    const angleStep = items.length > 0 ? 360 / items.length : 0;
    const ringRotation = -active * angleStep;

    return (
      <div
        ref={ref}
        role="listbox"
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
          "relative flex items-center justify-center focus-visible:outline-none",
          className
        )}
        style={{
          height: itemHeight + 80,
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
            transform: `rotateY(${ringRotation}deg)`,
            transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {items.map((item, i) => {
            const angle = i * angleStep;
            return (
              <div
                key={item.id}
                role="option"
                aria-selected={i === active}
                onClick={() => select(i)}
                className={cn(
                  "absolute inset-0 cursor-pointer overflow-hidden rounded-xl border border-border/60 bg-card text-card-foreground",
                  "shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35),0_4px_12px_-4px_rgba(0,0,0,0.12)]"
                )}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: hideBackside ? "hidden" : "visible",
                  WebkitBackfaceVisibility: hideBackside ? "hidden" : "visible",
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
Carousel3D.displayName = "Carousel3D";

export { Carousel3D };
