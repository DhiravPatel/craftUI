"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TestimonialAuthor {
  name: string;
  /** Job title / role / handle shown under the name. */
  role?: string;
  /** Optional avatar image URL. */
  avatar?: string;
  /** Optional company / source logo (a small ReactNode, e.g. an svg). */
  logo?: React.ReactNode;
}

export interface TestimonialQuoteProps
  extends React.HTMLAttributes<HTMLDivElement> {
  quote: React.ReactNode;
  author: TestimonialAuthor;
  /** Card width in px. Default 380. */
  width?: number;
  /** Tilt the card toward the cursor on hover. Default true. */
  tilt?: boolean;
  /** Maximum tilt in degrees. Default 6. */
  tiltStrength?: number;
  /** When true, render a large decorative quotation mark. Default true. */
  decorative?: boolean;
}

/**
 * TestimonialQuote — a quote card with a big decorative quotation mark, the
 * testimonial body, and an author block (avatar + name + role + optional
 * source logo). Hover tilts the card toward the cursor with a parallax glow.
 * Designed to drop into a grid of three or to be carouselled in a hero row.
 */
const TestimonialQuote = React.forwardRef<
  HTMLDivElement,
  TestimonialQuoteProps
>(
  (
    {
      quote,
      author,
      width = 380,
      tilt = true,
      tiltStrength = 6,
      decorative = true,
      className,
      style,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [hover, setHover] = React.useState(false);
    const [pointer, setPointer] = React.useState({ x: 0, y: 0 });
    const innerRef = React.useRef<HTMLDivElement | null>(null);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      if (!tilt) return;
      const node = innerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setPointer({ x: nx, y: ny });
    };
    const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      setHover(true);
    };
    const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      setHover(false);
      setPointer({ x: 0, y: 0 });
    };

    const initial = author.name.charAt(0).toUpperCase();

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        style={{ perspective: 1000, ...style }}
        {...props}
      >
        <div
          ref={innerRef}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onMouseMove={handleMove}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-7 text-white shadow-[0_30px_60px_-22px_rgba(0,0,0,0.55)]"
          style={{
            width,
            transformStyle: "preserve-3d",
            transform:
              tilt && hover
                ? `rotateX(${-pointer.y * tiltStrength}deg) rotateY(${
                    pointer.x * tiltStrength
                  }deg)`
                : "rotateX(0deg) rotateY(0deg)",
            transition: "transform 240ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Cursor-tracking glow layer */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{
              opacity: hover ? 1 : 0,
              background: `radial-gradient(280px circle at ${
                (pointer.x + 0.5) * 100
              }% ${
                (pointer.y + 0.5) * 100
              }%, rgba(125,211,252,0.18), transparent 70%)`,
            }}
          />

          {decorative ? (
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-4 select-none font-serif text-[120px] leading-none text-white/[0.06]"
            >
              &ldquo;
            </span>
          ) : null}

          <p className="relative text-[15px] leading-relaxed text-white/90">
            {quote}
          </p>

          <div className="relative mt-6 flex items-center gap-3">
            {author.avatar ? (
              <span
                aria-hidden
                className="block h-10 w-10 shrink-0 rounded-full border border-white/15 bg-cover bg-center"
                style={{ backgroundImage: `url("${author.avatar}")` }}
              />
            ) : (
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white/85"
              >
                {initial}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{author.name}</p>
              {author.role ? (
                <p className="truncate text-xs text-white/55">{author.role}</p>
              ) : null}
            </div>
            {author.logo ? (
              <div className="shrink-0 opacity-70">{author.logo}</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
TestimonialQuote.displayName = "TestimonialQuote";

export { TestimonialQuote };
