"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

type Direction = "top" | "right" | "bottom" | "left";

export interface DirectionAwareHoverProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Content shown when hovered. Slides in from the cursor entry direction. */
  hoverContent: React.ReactNode;
  /** Translation distance in px when entering/leaving. Default 24. */
  distance?: number;
}

function getEntryDirection(
  rect: DOMRect,
  x: number,
  y: number
): Direction {
  const w = rect.width;
  const h = rect.height;
  const top = y;
  const bottom = h - y;
  const left = x;
  const right = w - x;
  const min = Math.min(top, bottom, left, right);
  if (min === top) return "top";
  if (min === bottom) return "bottom";
  if (min === left) return "left";
  return "right";
}

function offsetForDirection(d: Direction, distance: number) {
  switch (d) {
    case "top":
      return { x: 0, y: -distance };
    case "bottom":
      return { x: 0, y: distance };
    case "left":
      return { x: -distance, y: 0 };
    case "right":
      return { x: distance, y: 0 };
  }
}

const DirectionAwareHover = React.forwardRef<
  HTMLDivElement,
  DirectionAwareHoverProps
>(
  (
    {
      className,
      hoverContent,
      distance = 24,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLDivElement
    );
    const [state, setState] = React.useState<{
      hovered: boolean;
      direction: Direction;
    }>({ hovered: false, direction: "top" });

    const handleEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(event);
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const direction = getEntryDirection(
        rect,
        event.clientX - rect.left,
        event.clientY - rect.top
      );
      setState({ hovered: true, direction });
    };

    const handleLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event);
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const direction = getEntryDirection(
        rect,
        event.clientX - rect.left,
        event.clientY - rect.top
      );
      setState({ hovered: false, direction });
    };

    const offset = offsetForDirection(state.direction, distance);
    const hoverInTransform = state.hovered
      ? "translate3d(0,0,0)"
      : `translate3d(${offset.x}px, ${offset.y}px, 0)`;
    const baseOutTransform = state.hovered
      ? `translate3d(${-offset.x}px, ${-offset.y}px, 0)`
      : "translate3d(0,0,0)";

    return (
      <div
        ref={innerRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {/* Base content */}
        <div
          className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: baseOutTransform }}
        >
          {children}
        </div>
        {/* Hover content slides in from the entry direction */}
        <div
          aria-hidden={!state.hovered}
          className={cn(
            "absolute inset-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          )}
          style={{
            transform: hoverInTransform,
            opacity: state.hovered ? 1 : 0,
          }}
        >
          {hoverContent}
        </div>
      </div>
    );
  }
);
DirectionAwareHover.displayName = "DirectionAwareHover";

export { DirectionAwareHover };
