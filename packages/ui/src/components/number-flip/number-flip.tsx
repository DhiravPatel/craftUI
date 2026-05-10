"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface NumberFlipProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Numeric value to display. */
  value: number;
  /** Pad the value to this many digits. Default: derived from value. */
  digits?: number;
  /** Font size for the digits in px. Default 56. */
  size?: number;
  /** Animation duration in ms when the value changes. Default 700. */
  duration?: number;
  /** Show thousands separator (locale-aware). Default true. */
  separators?: boolean;
  /** Color of the digits. Default uses currentColor. */
  color?: string;
  /** Background painted on each digit cell. Default a soft dark surface. */
  cellBackground?: string;
  /** Tag wrapping the component. Use `time` for countdowns. Default `div`. */
  asTime?: boolean;
}

/**
 * NumberFlip — an odometer / split-flap display. Each digit is a window into
 * a stack of 0–9 glyphs; on value change the stack translates vertically so
 * the new digit slides up into view, with a smooth easing curve. Useful for
 * counters, prices, scores, and countdown timers.
 *
 * Each digit is independent, so when 123 → 124 only the ones place flips.
 * Non-digit characters (commas, currency symbols) render as static text.
 */
const NumberFlip = React.forwardRef<HTMLDivElement, NumberFlipProps>(
  (
    {
      value,
      digits,
      size = 56,
      duration = 700,
      separators = true,
      color,
      cellBackground = "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
      asTime = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Build the display string. We keep the value sign and a leading-zero
    // padding so a value of 7 with digits=3 renders as 007.
    const negative = value < 0;
    const abs = Math.abs(Math.trunc(value));
    let raw = String(abs);
    if (digits) raw = raw.padStart(digits, "0");
    const formatted = separators ? Number(raw).toLocaleString() : raw;
    const display = negative ? `-${formatted}` : formatted;

    const Wrapper = (asTime ? "time" : "div") as "div";
    const cellWidth = size * 0.6;
    const cellHeight = size * 1.05;
    const radius = size * 0.12;

    return (
      <Wrapper
        ref={ref}
        className={cn(
          "inline-flex select-none items-center font-bold tracking-tight tabular-nums",
          className
        )}
        style={{
          fontSize: size,
          lineHeight: 1,
          color,
          ...style,
        }}
        {...props}
      >
        {display.split("").map((ch, i) => {
          if (/\d/.test(ch)) {
            const digit = Number(ch);
            return (
              <span
                key={i}
                aria-hidden
                className="relative inline-block overflow-hidden"
                style={{
                  width: cellWidth,
                  height: cellHeight,
                  background: cellBackground,
                  borderRadius: radius,
                  marginInline: 1,
                }}
              >
                {/* Vertical stack of 0–9. We translate it by digit*100% so
                    only the active digit is in the visible window. */}
                <span
                  className="absolute inset-x-0 top-0 flex flex-col items-center"
                  style={{
                    transform: `translateY(-${digit * cellHeight}px)`,
                    transition: `transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  {Array.from({ length: 10 }).map((_, n) => (
                    <span
                      key={n}
                      className="flex items-center justify-center"
                      style={{
                        height: cellHeight,
                        lineHeight: `${cellHeight}px`,
                      }}
                    >
                      {n}
                    </span>
                  ))}
                </span>
                {/* Center divider — gives the split-flap look. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-1/2 block h-px"
                  style={{ background: "rgba(0,0,0,0.18)" }}
                />
              </span>
            );
          }
          // Static separator character (comma, dot, currency, sign, etc.)
          return (
            <span
              key={i}
              aria-hidden
              className="px-0.5 opacity-60"
              style={{ height: cellHeight, lineHeight: `${cellHeight}px` }}
            >
              {ch}
            </span>
          );
        })}
        {/* Accessible value */}
        <span className="sr-only">{display}</span>
      </Wrapper>
    );
  }
);
NumberFlip.displayName = "NumberFlip";

export { NumberFlip };
