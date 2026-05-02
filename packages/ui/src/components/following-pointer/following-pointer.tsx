"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface FollowingPointerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom indicator. Default: a small arrow + label container. */
  indicator?: React.ReactNode;
  /** Hide the system cursor inside the wrapped area. Default true. */
  hideCursor?: boolean;
}

const FollowingPointer = React.forwardRef<
  HTMLDivElement,
  FollowingPointerProps
>(
  (
    {
      indicator,
      hideCursor = true,
      className,
      children,
      style,
      onMouseMove,
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
    const [pos, setPos] = React.useState({ x: 0, y: 0, visible: false });

    const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event);
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        visible: true,
      });
    };
    const handleEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(event);
      setPos((p) => ({ ...p, visible: true }));
    };
    const handleLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event);
      setPos((p) => ({ ...p, visible: false }));
    };

    return (
      <div
        ref={innerRef}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn("relative", hideCursor && "cursor-none", className)}
        style={style}
        {...props}
      >
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute z-50 transition-opacity duration-200"
          style={{
            left: 0,
            top: 0,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            opacity: pos.visible ? 1 : 0,
            willChange: "transform",
          }}
        >
          {indicator ?? (
            <div className="flex items-center gap-1.5 -translate-x-1 translate-y-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 1L13 5.5L7.2 7.2L5.5 13L1 1Z"
                  fill="hsl(var(--foreground))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="rounded-md bg-foreground px-2 py-0.5 text-[10px] font-medium text-background shadow-md">
                You
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
FollowingPointer.displayName = "FollowingPointer";

export { FollowingPointer };
