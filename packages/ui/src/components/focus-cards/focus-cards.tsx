"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface FocusCardItem {
  id: string | number;
  /** Image URL displayed as the card background. */
  src: string;
  /** Alt text for the image. */
  alt?: string;
  /** Caption shown over the focused card. */
  title?: React.ReactNode;
  /** Optional href — turns the card into an anchor. */
  href?: string;
}

export interface FocusCardsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: FocusCardItem[];
  /** Number of columns at the largest breakpoint. Default 3. */
  columns?: number;
  /** Aspect ratio for each card (`width / height`). Default 0.78 (~4:5 portrait). */
  aspectRatio?: number;
  /** Blur amount applied to non-focused cards (in px). Default 6. */
  blurAmount?: number;
  /** Opacity of non-focused cards (0–1). Default 0.45. */
  dimOpacity?: number;
}

/**
 * FocusCards — image gallery where hovering one card keeps it sharp while the
 * rest blur + dim. The focused card surfaces an optional caption overlay.
 */
const FocusCards = React.forwardRef<HTMLDivElement, FocusCardsProps>(
  (
    {
      items,
      columns = 3,
      aspectRatio = 0.78,
      blurAmount = 6,
      dimOpacity = 0.45,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState<string | number | null>(null);

    return (
      <div
        ref={ref}
        className={cn("grid gap-4", className)}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          ...style,
        }}
        {...props}
      >
        {items.map((item) => {
          const isFocused = focused === item.id;
          const isDimmed = focused !== null && !isFocused;

          const card = (
            <div
              className="relative h-full w-full overflow-hidden rounded-xl bg-slate-900"
              style={{
                transition:
                  "filter 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1), opacity 400ms cubic-bezier(0.22,1,0.36,1)",
                filter: isDimmed ? `blur(${blurAmount}px)` : "blur(0px)",
                opacity: isDimmed ? dimOpacity : 1,
                transform: isDimmed ? "scale(0.97)" : "scale(1)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt ?? ""}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Caption — fades in only on the focused card */}
              {item.title ? (
                <div
                  className="absolute inset-0 flex items-end p-4"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.65), transparent 55%)",
                    opacity: isFocused ? 1 : 0,
                    transition: "opacity 300ms ease-out",
                  }}
                >
                  <p className="text-base font-medium leading-snug text-white drop-shadow-md">
                    {item.title}
                  </p>
                </div>
              ) : null}
            </div>
          );

          const wrapperProps = {
            key: item.id,
            onMouseEnter: () => setFocused(item.id),
            onMouseLeave: () =>
              setFocused((prev) => (prev === item.id ? null : prev)),
            onFocus: () => setFocused(item.id),
            onBlur: () =>
              setFocused((prev) => (prev === item.id ? null : prev)),
            className: cn(
              "group relative block",
              item.href ? "cursor-pointer" : "cursor-default"
            ),
            style: { aspectRatio: String(aspectRatio) },
          };

          return item.href ? (
            <a href={item.href} {...wrapperProps}>
              {card}
            </a>
          ) : (
            <div {...wrapperProps}>{card}</div>
          );
        })}
      </div>
    );
  }
);
FocusCards.displayName = "FocusCards";

export { FocusCards };
