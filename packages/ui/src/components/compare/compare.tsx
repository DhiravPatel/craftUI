"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CompareProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Content shown on the left of the divider (the "before"). */
  before: React.ReactNode;
  /** Content shown on the right of the divider (the "after"). */
  after: React.ReactNode;
  /** Initial divider position 0–100. Default 50. */
  defaultPosition?: number;
  /** Controlled divider position 0–100. */
  position?: number;
  onPositionChange?: (position: number) => void;
  /** Move the divider while hovering (no drag needed). Default false. */
  followHover?: boolean;
  /** Color of the divider line + glow. Default cyan/sky. */
  dividerColor?: string;
  /** Show twinkling sparkle particles around the divider. Default true. */
  sparkles?: boolean;
}

const Compare = React.forwardRef<HTMLDivElement, CompareProps>(
  (
    {
      before,
      after,
      defaultPosition = 50,
      position,
      onPositionChange,
      followHover = false,
      dividerColor = "rgb(56, 189, 248)",
      sparkles = true,
      className,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLDivElement
    );
    const [uncontrolled, setUncontrolled] = React.useState(defaultPosition);
    const isControlled = position !== undefined;
    const value = isControlled ? position : uncontrolled;

    const setValue = (next: number) => {
      const clamped = Math.max(0, Math.min(100, next));
      if (!isControlled) setUncontrolled(clamped);
      onPositionChange?.(clamped);
    };

    const updateFromClient = (clientX: number) => {
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setValue(((clientX - rect.left) / rect.width) * 100);
    };

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (followHover) updateFromClient(event.clientX);
    };

    const startDrag = (e: React.PointerEvent) => {
      e.preventDefault();
      const handleMove = (m: PointerEvent) => updateFromClient(m.clientX);
      const handleUp = () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
      };
      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
    };

    // Static sparkle positions/timings — clustered around the divider line.
    const sparkleSpecs = React.useMemo(
      () =>
        Array.from({ length: 14 }).map((_, i) => ({
          id: i,
          dx: (Math.random() - 0.5) * 36,
          top: 5 + Math.random() * 90,
          size: 1 + Math.random() * 1.6,
          delay: Math.random() * 2.5,
          duration: 1.6 + Math.random() * 2.4,
        })),
      []
    );

    return (
      <div
        ref={innerRef}
        onPointerMove={onPointerMove}
        className={cn(
          "relative select-none overflow-hidden rounded-2xl",
          className
        )}
        style={style}
        {...props}
      >
        {/* Before — fills the container */}
        <div className="absolute inset-0">{before}</div>
        {/* After — clipped from the left up to `value%` */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${value}%)` }}
        >
          {after}
        </div>
        {/* Divider line — gradient with glow */}
        <div
          className="pointer-events-none absolute top-0 h-full w-px"
          style={{
            left: `${value}%`,
            background: `linear-gradient(to bottom, transparent, ${dividerColor} 18%, ${dividerColor} 82%, transparent)`,
            boxShadow: `0 0 12px 1px ${dividerColor}, 0 0 32px 4px ${dividerColor}`,
          }}
        />

        {/* Sparkles around the divider */}
        {sparkles ? (
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 h-full"
            style={{ left: `${value}%` }}
          >
            {sparkleSpecs.map((s) => (
              <span
                key={s.id}
                className="animate-twinkle absolute rounded-full"
                style={
                  {
                    top: `${s.top}%`,
                    left: `${s.dx}px`,
                    width: s.size,
                    height: s.size,
                    background: dividerColor,
                    boxShadow: `0 0 ${s.size * 3}px ${s.size}px ${dividerColor}`,
                    animationDelay: `${s.delay}s`,
                    "--twinkle-duration": `${s.duration}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        ) : null}

        {/* Drag handle */}
        <button
          type="button"
          onPointerDown={startDrag}
          aria-label="Drag to compare"
          className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full bg-white p-2 text-slate-900 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.6)] transition-transform hover:scale-110 active:scale-95"
          style={{ left: `${value}%` }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path
              d="M5 2L1 7L5 12M9 2L13 7L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    );
  }
);
Compare.displayName = "Compare";

export { Compare };
