"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface HoldToConfirmProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "onSubmit"
  > {
  /** Fired when the user has held the button for the full duration. */
  onConfirm: () => void;
  /** How long the user must hold (in ms). Default 1100. */
  duration?: number;
  /** Button label / content. */
  children?: React.ReactNode;
  /** Color of the progress ring. Default a danger red. */
  color?: string;
  /** Visual variant. "danger" makes the resting state hint at a destructive action. Default "danger". */
  variant?: "danger" | "primary" | "subtle";
}

/**
 * HoldToConfirm — a tactile safety button. The user must press AND HOLD for
 * `duration` ms; a circular progress ring fills around the button while
 * they hold. Releasing early cancels and the ring smoothly empties.
 *
 * Reaching 100% fires `onConfirm`. Pure rAF — no interval drift, and the
 * ring tracks the actual elapsed time even on slow devices.
 */
const HoldToConfirm = React.forwardRef<HTMLButtonElement, HoldToConfirmProps>(
  (
    {
      onConfirm,
      duration = 1100,
      children = "Hold to confirm",
      color = "rgb(239, 68, 68)",
      variant = "danger",
      className,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref
  ) => {
    const [progress, setProgress] = React.useState(0);
    const [done, setDone] = React.useState(false);
    const startRef = React.useRef<number | null>(null);
    const rafRef = React.useRef<number | null>(null);
    const releasingRef = React.useRef(false);

    const stop = React.useCallback(() => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }, []);

    const startHold = React.useCallback(() => {
      if (done) return;
      releasingRef.current = false;
      startRef.current = performance.now();
      stop();
      const tick = (now: number) => {
        if (releasingRef.current || startRef.current === null) return;
        const elapsed = now - startRef.current;
        const t = Math.min(1, elapsed / duration);
        setProgress(t);
        if (t >= 1) {
          setDone(true);
          onConfirm();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, [done, duration, onConfirm, stop]);

    const releaseHold = React.useCallback(() => {
      if (done) return;
      releasingRef.current = true;
      stop();
      startRef.current = null;
      // Smoothly drain the ring back to 0 over ~250ms.
      const start = performance.now();
      const from = progress;
      const drain = (now: number) => {
        const t = Math.min(1, (now - start) / 250);
        setProgress(from * (1 - t));
        if (t < 1) requestAnimationFrame(drain);
      };
      requestAnimationFrame(drain);
    }, [done, progress, stop]);

    React.useEffect(() => () => stop(), [stop]);

    const SIZE = 64;
    const STROKE = 3;
    const R = SIZE / 2 - STROKE - 1;
    const C = 2 * Math.PI * R;
    const offset = C * (1 - progress);

    const surface = {
      danger: "bg-red-500/15 text-red-200 border-red-500/40",
      primary: "bg-sky-500/15 text-sky-100 border-sky-400/40",
      subtle: "bg-white/5 text-white/85 border-white/15",
    }[variant];

    return (
      <button
        ref={ref}
        type="button"
        onMouseDown={(e) => {
          onMouseDown?.(e);
          startHold();
        }}
        onMouseUp={(e) => {
          onMouseUp?.(e);
          releaseHold();
        }}
        onMouseLeave={(e) => {
          onMouseLeave?.(e);
          releaseHold();
        }}
        onTouchStart={(e) => {
          onTouchStart?.(e);
          startHold();
        }}
        onTouchEnd={(e) => {
          onTouchEnd?.(e);
          releaseHold();
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if ((e.key === " " || e.key === "Enter") && !e.repeat) startHold();
        }}
        onKeyUp={(e) => {
          onKeyUp?.(e);
          if (e.key === " " || e.key === "Enter") releaseHold();
        }}
        aria-label="Hold to confirm"
        className={cn(
          "relative inline-flex select-none items-center gap-3 rounded-full border px-5 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-400/60",
          done && "pointer-events-none opacity-80",
          surface,
          className
        )}
        style={style}
        {...props}
      >
        {/* Circular progress that wraps the leading icon */}
        <span
          aria-hidden
          className="relative flex shrink-0 items-center justify-center"
          style={{ width: SIZE / 2, height: SIZE / 2 }}
        >
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            width={SIZE / 2}
            height={SIZE / 2}
            // -90 deg so the ring fills clockwise from the top.
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.18}
              strokeWidth={STROKE}
            />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke={done ? "rgb(74, 222, 128)" : color}
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={done ? 0 : offset}
            />
          </svg>
          {/* Inner dot / check */}
          <span
            className="absolute inline-flex items-center justify-center rounded-full"
            style={{
              width: SIZE / 2 - STROKE * 4,
              height: SIZE / 2 - STROKE * 4,
              background: done ? "rgb(74, 222, 128)" : color,
              transition: "background 200ms ease",
            }}
          >
            {done ? (
              <svg
                viewBox="0 0 24 24"
                width={10}
                height={10}
                fill="none"
                stroke="white"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : null}
          </span>
        </span>
        <span>{done ? "Confirmed" : children}</span>
      </button>
    );
  }
);
HoldToConfirm.displayName = "HoldToConfirm";

export { HoldToConfirm };
