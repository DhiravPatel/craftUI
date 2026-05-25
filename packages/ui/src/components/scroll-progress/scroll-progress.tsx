"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ScrollProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Element whose scroll drives the bar. When provided, the bar is positioned
   * absolutely (the target should be `position: relative`). When omitted, the
   * bar tracks the whole page and is `position: fixed`.
   */
  target?: React.RefObject<HTMLElement>;
  /** Pin to the top or bottom edge. Default "top". */
  position?: "top" | "bottom";
  /** Bar thickness in px. Default 3. */
  height?: number;
  /** CSS color or gradient for the filled bar. Default a sky→indigo gradient. */
  color?: string;
  /** Color of the unfilled track. Default transparent. */
  trackColor?: string;
  /** Show the numeric percentage in a small pill at the trailing edge. */
  showLabel?: boolean;
}

/**
 * ScrollProgress — a thin bar that fills as the page (or a given scroll
 * container) is scrolled. Reads scroll position on a requestAnimationFrame
 * loop so it stays smooth, and reacts to content / viewport resizing. Drop it
 * in once at the top of a layout for a reading-progress indicator.
 */
const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  (
    {
      target,
      position = "top",
      height = 3,
      color = "linear-gradient(90deg, rgb(125, 211, 252), rgb(99, 102, 241))",
      trackColor = "transparent",
      showLabel = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const el = target?.current ?? null;
      const scroller: HTMLElement | Window = el ?? window;
      let raf = 0;

      const compute = () => {
        raf = 0;
        if (el) {
          const max = el.scrollHeight - el.clientHeight;
          setProgress(max <= 0 ? 0 : Math.min(1, el.scrollTop / max));
        } else {
          const doc = document.documentElement;
          const max = doc.scrollHeight - doc.clientHeight;
          setProgress(max <= 0 ? 0 : Math.min(1, doc.scrollTop / max));
        }
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(compute);
      };

      compute();
      scroller.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      const ro =
        el && typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(onScroll)
          : null;
      if (ro && el) ro.observe(el);

      return () => {
        scroller.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        ro?.disconnect();
        if (raf) cancelAnimationFrame(raf);
      };
    }, [target]);

    const pct = Math.round(progress * 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Scroll progress"
        className={cn(
          "left-0 z-50 w-full",
          target ? "absolute" : "fixed",
          position === "top" ? "top-0" : "bottom-0",
          className
        )}
        style={{ height, background: trackColor, ...style }}
        {...props}
      >
        <div
          className="h-full origin-left"
          style={{
            background: color,
            transform: `scaleX(${progress})`,
            transition: "transform 80ms linear",
            width: "100%",
          }}
        />
        {showLabel ? (
          <span
            className="absolute top-1/2 -translate-y-1/2 rounded-full bg-foreground px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-background"
            style={{
              left: `calc(${pct}% - 1.25rem)`,
              opacity: progress > 0.02 ? 1 : 0,
              transition: "left 80ms linear, opacity 150ms ease",
            }}
          >
            {pct}%
          </span>
        ) : null}
      </div>
    );
  }
);
ScrollProgress.displayName = "ScrollProgress";

export { ScrollProgress };
