"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

interface FlipCardContextValue {
  flipped: boolean;
  axis: "x" | "y";
}

const FlipCardContext = React.createContext<FlipCardContextValue | null>(null);

export interface FlipCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** What triggers the flip. Default "hover". */
  trigger?: "hover" | "click";
  /** "y" rotates around the vertical axis (default), "x" around the horizontal. */
  axis?: "x" | "y";
  /** Flip duration in ms (default 700). */
  duration?: number;
  /** Controlled flipped state. Omit for uncontrolled. */
  flipped?: boolean;
  /** Initial state when uncontrolled. */
  defaultFlipped?: boolean;
  onFlippedChange?: (flipped: boolean) => void;
}

const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>(
  (
    {
      className,
      trigger = "hover",
      axis = "y",
      duration = 700,
      flipped: controlled,
      defaultFlipped = false,
      onFlippedChange,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultFlipped);
    const isControlled = controlled !== undefined;
    const flipped = isControlled ? controlled : uncontrolled;

    const setFlipped = (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onFlippedChange?.(next);
    };

    const rotation = axis === "y" ? "rotateY" : "rotateX";

    return (
      <FlipCardContext.Provider value={{ flipped, axis }}>
        <div
          ref={ref}
          role={trigger === "click" ? "button" : undefined}
          tabIndex={trigger === "click" ? 0 : undefined}
          onClick={(event) => {
            onClick?.(event);
            if (trigger === "click") setFlipped(!flipped);
          }}
          onMouseEnter={(event) => {
            onMouseEnter?.(event);
            if (trigger === "hover") setFlipped(true);
          }}
          onMouseLeave={(event) => {
            onMouseLeave?.(event);
            if (trigger === "hover") setFlipped(false);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (trigger === "click" && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              setFlipped(!flipped);
            }
          }}
          className={cn(
            "group relative",
            trigger === "click" && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className
          )}
          style={{
            perspective: "1200px",
            ...style,
          }}
          {...props}
        >
          <div
            className="relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
              transition: `transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`,
              transform: flipped ? `${rotation}(180deg)` : "none",
            }}
          >
            {children}
          </div>
        </div>
      </FlipCardContext.Provider>
    );
  }
);
FlipCard.displayName = "FlipCard";

const FlipCardFront = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]",
      className
    )}
    style={{
      transform: "rotateY(0deg)",
      ...style,
    }}
    {...props}
  />
));
FlipCardFront.displayName = "FlipCardFront";

const FlipCardBack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const ctx = React.useContext(FlipCardContext);
  const axis = ctx?.axis ?? "y";
  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]",
        className
      )}
      style={{
        transform: axis === "y" ? "rotateY(180deg)" : "rotateX(180deg)",
        ...style,
      }}
      {...props}
    />
  );
});
FlipCardBack.displayName = "FlipCardBack";

export { FlipCard, FlipCardFront, FlipCardBack };
