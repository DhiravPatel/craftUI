"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface FoldOutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The cover face — visible when folded. */
  cover: React.ReactNode;
  /** The reveal face — visible when fully unfolded. */
  reveal: React.ReactNode;
  /** Width of the unfolded card in px. Default 360. */
  width?: number;
  /** Height of the card in px. Default 220. */
  height?: number;
  /** Border radius in px. Default 18. */
  radius?: number;
  /** Time (s) for one fold/unfold transition. Default 0.55. */
  duration?: number;
  /** Force open/closed externally. */
  open?: boolean;
  /** Notified when the open state changes. */
  onChange?: (open: boolean) => void;
  /**
   * "click" — toggles open on click. Default.
   * "hover" — opens on hover, closes on leave.
   */
  trigger?: "click" | "hover";
}

/**
 * FoldOut — a card whose left and right halves fold inward like double doors
 * when closed, hiding the reveal layer beneath. Click (or hover) to swing
 * the doors open and read what's behind. Each door rotates around its outer
 * vertical edge with `transformOrigin` set to that edge.
 */
const FoldOut = React.forwardRef<HTMLDivElement, FoldOutProps>(
  (
    {
      cover,
      reveal,
      width = 360,
      height = 220,
      radius = 18,
      duration = 0.55,
      open: controlledOpen,
      onChange,
      trigger = "click",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(false);
    const open = controlledOpen ?? uncontrolled;

    const setOpen = (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolled(next);
      onChange?.(next);
    };

    const handleClick = () => {
      if (trigger === "click") setOpen(!open);
    };
    const handleEnter = () => {
      if (trigger === "hover") setOpen(true);
    };
    const handleLeave = () => {
      if (trigger === "hover") setOpen(false);
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn("relative inline-block select-none", className)}
        style={{
          width,
          height,
          perspective: 1400,
          cursor: trigger === "click" ? "pointer" : undefined,
          ...style,
        }}
        {...props}
      >
        {/* Reveal layer sits flat behind the doors. Its border-radius is
            slightly tighter than the doors so an edge highlight shows. */}
        <div
          className="absolute inset-0 overflow-hidden border border-white/10 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.55)]"
          style={{
            borderRadius: radius,
            transform: open ? "scale(1)" : "scale(0.94)",
            transition: `transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${
              open ? duration * 0.4 : 0
            }s`,
          }}
        >
          {reveal}
        </div>

        {/* Left door — rotates around its left edge */}
        <div
          aria-hidden={open}
          className="absolute left-0 top-0 h-full overflow-hidden border border-white/10 shadow-[0_18px_30px_-14px_rgba(0,0,0,0.55)]"
          style={{
            width: width / 2,
            borderRadius: `${radius}px 0 0 ${radius}px`,
            transformOrigin: "left center",
            transform: open
              ? "rotateY(-180deg) translateZ(2px)"
              : "rotateY(0deg)",
            transition: `transform ${duration}s cubic-bezier(0.22,1,0.36,1)`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: "translateX(0)",
              width: width,
              left: 0,
            }}
          >
            {cover}
          </div>
          {/* Center seam shadow that fades as the door opens */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-full w-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,0,0,0.35))",
            }}
          />
        </div>

        {/* Right door — rotates around its right edge */}
        <div
          aria-hidden={open}
          className="absolute right-0 top-0 h-full overflow-hidden border border-white/10 shadow-[0_18px_30px_-14px_rgba(0,0,0,0.55)]"
          style={{
            width: width / 2,
            borderRadius: `0 ${radius}px ${radius}px 0`,
            transformOrigin: "right center",
            transform: open
              ? "rotateY(180deg) translateZ(2px)"
              : "rotateY(0deg)",
            transition: `transform ${duration}s cubic-bezier(0.22,1,0.36,1)`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translateX(-${width / 2}px)`,
              width: width,
              left: 0,
            }}
          >
            {cover}
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-px"
            style={{
              background:
                "linear-gradient(270deg, transparent, rgba(0,0,0,0.35))",
            }}
          />
        </div>
      </div>
    );
  }
);
FoldOut.displayName = "FoldOut";

export { FoldOut };
