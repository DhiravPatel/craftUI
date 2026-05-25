"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ResizableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  /** Split axis. "horizontal" places panels side by side. Default horizontal. */
  direction?: "horizontal" | "vertical";
  /** Initial size of the first panel as a percent (0–100) when uncontrolled. Default 50. */
  defaultSize?: number;
  /** Controlled size of the first panel as a percent. */
  size?: number;
  /** Fired with the first panel's size (percent) while dragging. */
  onChange?: (size: number) => void;
  /** Smallest size the first panel can shrink to, in percent. Default 10. */
  min?: number;
  /** Largest size the first panel can grow to, in percent. Default 90. */
  max?: number;
  /** Exactly two panels. */
  children: [React.ReactNode, React.ReactNode];
}

/**
 * Resizable — two panels separated by a draggable handle. Drag the divider
 * (mouse or touch) to repartition the space; sizes are expressed as a percent
 * of the first panel and clamped to [min, max]. Supports horizontal or
 * vertical splits, controlled or uncontrolled sizing, and double-click to
 * reset to the default. Dependency-free — ideal for editors, inspectors, and
 * dashboard layouts.
 */
const Resizable = React.forwardRef<HTMLDivElement, ResizableProps>(
  (
    {
      direction = "horizontal",
      defaultSize = 50,
      size,
      onChange,
      min = 10,
      max = 90,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = size !== undefined;
    const [internal, setInternal] = React.useState(defaultSize);
    const current = isControlled ? size! : internal;
    const isHorizontal = direction === "horizontal";

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [dragging, setDragging] = React.useState(false);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const apply = React.useCallback(
      (pct: number) => {
        const clamped = Math.min(max, Math.max(min, pct));
        if (!isControlled) setInternal(clamped);
        onChange?.(clamped);
      },
      [isControlled, onChange, min, max]
    );

    const handlePointerDown = (e: React.PointerEvent) => {
      e.preventDefault();
      setDragging(true);
      (e.target as Element).setPointerCapture?.(e.pointerId);
      const move = (clientX: number, clientY: number) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const pct = isHorizontal
          ? ((clientX - rect.left) / rect.width) * 100
          : ((clientY - rect.top) / rect.height) * 100;
        apply(pct);
      };
      const onMove = (ev: PointerEvent) => move(ev.clientX, ev.clientY);
      const onUp = () => {
        setDragging(false);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const dec = isHorizontal ? "ArrowLeft" : "ArrowUp";
      const inc = isHorizontal ? "ArrowRight" : "ArrowDown";
      if (e.key === dec) {
        e.preventDefault();
        apply(current - 2);
      } else if (e.key === inc) {
        e.preventDefault();
        apply(current + 2);
      }
    };

    return (
      <div
        ref={setRefs}
        className={cn(
          "flex overflow-hidden rounded-xl border border-white/10 bg-neutral-950 text-white",
          isHorizontal ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      >
        <div
          className="min-h-0 min-w-0 overflow-auto"
          style={{ flexBasis: `${current}%` }}
        >
          {children[0]}
        </div>
        <div
          role="separator"
          aria-orientation={isHorizontal ? "vertical" : "horizontal"}
          aria-valuenow={Math.round(current)}
          aria-valuemin={min}
          aria-valuemax={max}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          onDoubleClick={() => apply(defaultSize)}
          className={cn(
            "group relative flex shrink-0 items-center justify-center bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
            dragging && "bg-sky-400/60",
            isHorizontal
              ? "w-1 cursor-col-resize"
              : "h-1 cursor-row-resize"
          )}
        >
          <span
            className={cn(
              "absolute rounded-full bg-white/30 transition-colors group-hover:bg-white/60",
              isHorizontal ? "h-7 w-0.5" : "h-0.5 w-7"
            )}
          />
        </div>
        <div
          className="min-h-0 min-w-0 flex-1 overflow-auto"
          style={{ flexBasis: `${100 - current}%` }}
        >
          {children[1]}
        </div>
      </div>
    );
  }
);
Resizable.displayName = "Resizable";

export { Resizable };
