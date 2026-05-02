"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CardHoverEffectItem {
  id: string | number;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}

export interface CardHoverEffectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: CardHoverEffectItem[];
  /** Number of columns. Default 3. */
  columns?: number;
}

const CardHoverEffect = React.forwardRef<HTMLDivElement, CardHoverEffectProps>(
  ({ items, columns = 3, className, style, ...props }, ref) => {
    const [hoveredId, setHoveredId] = React.useState<string | number | null>(
      null
    );

    return (
      <div
        ref={ref}
        className={cn("grid gap-3", className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          ...style,
        }}
        {...props}
      >
        {items.map((it) => {
          const Inner = (
            <div
              className="relative h-full rounded-xl border border-border/60 bg-card p-5 text-card-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]"
            >
              {it.icon ? <div className="mb-3">{it.icon}</div> : null}
              <p className="text-sm font-semibold tracking-tight">{it.title}</p>
              {it.description ? (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {it.description}
                </p>
              ) : null}
            </div>
          );
          return (
            <div
              key={it.id}
              className="group relative block p-1.5"
              onMouseEnter={() => setHoveredId(it.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Sliding hover background */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 -z-0 rounded-2xl bg-foreground/5 transition-all duration-300",
                  hoveredId === it.id ? "opacity-100 scale-100" : "opacity-0 scale-95"
                )}
              />
              <div className="relative z-10">
                {it.href ? (
                  <a href={it.href} className="block">
                    {Inner}
                  </a>
                ) : (
                  Inner
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
CardHoverEffect.displayName = "CardHoverEffect";

export { CardHoverEffect };
