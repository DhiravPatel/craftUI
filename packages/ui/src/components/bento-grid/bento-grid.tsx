"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns at the largest breakpoint. Default 3. */
  columns?: number;
  /** Row height in CSS units. Default `"18rem"`. */
  rowHeight?: string;
}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ columns = 3, rowHeight = "18rem", className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-4", className)}
        style={
          {
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridAutoRows: rowHeight,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      />
    );
  }
);
BentoGrid.displayName = "BentoGrid";

export type BentoGridSpan = "1x1" | "1x2" | "2x1" | "2x2" | "3x1" | "1x3";

export interface BentoGridItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Cell span as `"<cols>x<rows>"`. Default `"1x1"`. */
  span?: BentoGridSpan;
  /** Title rendered above the description. */
  title?: React.ReactNode;
  /** Subtitle / description below the title. */
  description?: React.ReactNode;
  /** Icon shown above the title. */
  icon?: React.ReactNode;
  /** Optional decorative background (image, gradient, illustration). */
  background?: React.ReactNode;
}

const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  (
    {
      span = "1x1",
      title,
      description,
      icon,
      background,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const [colsStr, rowsStr] = span.split("x");
    const cols = Math.max(1, parseInt(colsStr ?? "1", 10) || 1);
    const rows = Math.max(1, parseInt(rowsStr ?? "1", 10) || 1);
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border/60 bg-card p-5 text-card-foreground shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)]",
          className
        )}
        style={{
          gridColumn: `span ${cols} / span ${cols}`,
          gridRow: `span ${rows} / span ${rows}`,
          ...style,
        }}
        {...props}
      >
        {background ? (
          <div className="pointer-events-none absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-[1.02]">
            {background}
          </div>
        ) : null}
        <div className="relative z-10 flex flex-col gap-2">
          {icon ? <div className="mb-1">{icon}</div> : null}
          {title ? (
            <div className="text-base font-semibold tracking-tight">
              {title}
            </div>
          ) : null}
          {description ? (
            <div className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    );
  }
);
BentoGridItem.displayName = "BentoGridItem";

export { BentoGrid, BentoGridItem };
