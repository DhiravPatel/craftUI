"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface NumberTickerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Final value the counter animates to. */
  value: number;
  /** Starting value. Default 0. */
  from?: number;
  /** Animation duration in ms. Default 1500. */
  duration?: number;
  /** Number of decimal places. Default 0. */
  decimals?: number;
  /** Format the displayed number (e.g. add commas, currency). */
  format?: (value: number) => string;
  /** Start animation only when scrolled into view. Default true. */
  whenInView?: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const defaultFormat = (decimals: number) => (n: number) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const NumberTicker = React.forwardRef<HTMLSpanElement, NumberTickerProps>(
  (
    {
      value,
      from = 0,
      duration = 1500,
      decimals = 0,
      format,
      whenInView = true,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLSpanElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLSpanElement
    );
    const [display, setDisplay] = React.useState(from);
    const [hasRun, setHasRun] = React.useState(false);
    const fmt = format ?? defaultFormat(decimals);

    const run = React.useCallback(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = easeOutCubic(t);
        setDisplay(from + (value - from) * eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, [from, value, duration]);

    React.useEffect(() => {
      if (!whenInView) {
        run();
        setHasRun(true);
        return;
      }
      const el = innerRef.current;
      if (!el || hasRun) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && !hasRun) {
            setHasRun(true);
            run();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [whenInView, hasRun, run]);

    return (
      <span
        ref={innerRef}
        className={cn("tabular-nums", className)}
        {...props}
      >
        {fmt(display)}
      </span>
    );
  }
);
NumberTicker.displayName = "NumberTicker";

export { NumberTicker };
