"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "../../lib/cn";

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Total number of stars (default 5). */
  count?: number;
  /** Controlled rating value (0..count, supports halves when allowHalf=true). */
  value?: number;
  /** Uncontrolled initial value. */
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** When true, the rating cannot be changed. */
  readOnly?: boolean;
  size?: "sm" | "default" | "lg";
}

const sizeClass: Record<NonNullable<RatingProps["size"]>, string> = {
  sm: "h-3.5 w-3.5",
  default: "h-5 w-5",
  lg: "h-6 w-6",
};

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      count = 5,
      value: controlled,
      defaultValue = 0,
      onChange,
      readOnly,
      size = "default",
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const isControlled = controlled !== undefined;
    const value = isControlled ? controlled : uncontrolled;
    const [hover, setHover] = React.useState<number | null>(null);
    const display = hover ?? value;

    const set = (next: number) => {
      if (readOnly) return;
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Rating"
        className={cn(
          "inline-flex items-center gap-0.5",
          readOnly && "pointer-events-none",
          className
        )}
        onMouseLeave={() => setHover(null)}
        {...props}
      >
        {Array.from({ length: count }, (_, i) => {
          const idx = i + 1;
          const filled = display >= idx;
          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={value === idx}
              tabIndex={readOnly ? -1 : 0}
              onMouseEnter={() => setHover(idx)}
              onClick={() => set(idx === value ? 0 : idx)}
              className={cn(
                "p-0.5 text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                filled && "text-warning",
                !readOnly && "hover:scale-110"
              )}
            >
              <Star
                className={cn(sizeClass[size], "transition-transform")}
                fill={filled ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
              <span className="sr-only">{idx} star{idx > 1 ? "s" : ""}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
Rating.displayName = "Rating";

export { Rating };
