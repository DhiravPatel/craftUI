"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PerspectiveBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Edge length of the square base in px. Default 200. */
  size?: number;
  /** Height (depth) of each unfolded flap in px. Default 140. */
  panelHeight?: number;
  /** Tilt of the whole scene in degrees (rotateX). Default 55. */
  tilt?: number;
  /** Spin of the whole scene in degrees (rotateZ). Default -8. */
  spin?: number;
  /** Resting open angle of each flap (90 = flat against the base, 180 = flipped fully open). Default 115. */
  openAngle?: number;
  /** Open angle while hovered. Default 145. */
  hoverOpenAngle?: number;
  /** Perspective distance in px. Default 1400. */
  perspective?: number;
  /** Content for the base (bottom of the box). */
  base?: React.ReactNode;
  /** The four flaps, ordered top, right, bottom, left. */
  panels: [
    React.ReactNode,
    React.ReactNode,
    React.ReactNode,
    React.ReactNode
  ];
  /** Color of every panel surface. Default neutral-900. */
  panelColor?: string;
  /** Border color of every surface. Default a thin white line. */
  borderColor?: string;
}

/**
 * PerspectiveBox — a 3D opened gift-box laid out on the floor with all four
 * inner flaps fanned outward, each carrying its own content. Great for
 * "what's inside" feature reveals, plan upgrades, or product-tour stops.
 * Hover over the box to spread the flaps further. Pure CSS 3D — no
 * dependencies, smooth at any size.
 */
const PerspectiveBox = React.forwardRef<HTMLDivElement, PerspectiveBoxProps>(
  (
    {
      size = 200,
      panelHeight = 140,
      tilt = 55,
      spin = -8,
      openAngle = 115,
      hoverOpenAngle = 145,
      perspective = 1400,
      base,
      panels,
      panelColor = "rgb(23, 23, 23)",
      borderColor = "rgba(255, 255, 255, 0.1)",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = React.useState(false);
    const angle = hovered ? hoverOpenAngle : openAngle;

    const surfaceStyle: React.CSSProperties = {
      background: panelColor,
      boxShadow: `inset 0 0 0 1px ${borderColor}, 0 12px 30px -16px rgba(0,0,0,0.6)`,
    };

    // Pad the wrapper so flaps don't get clipped when spread out.
    const wrapperPad = Math.max(panelHeight, size) * 1.1;

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{
          width: size + wrapperPad,
          height: size + wrapperPad,
          perspective: `${perspective}px`,
          ...style,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...props}
      >
        <div
          className="relative"
          style={{
            width: size,
            height: size,
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt}deg) rotateZ(${spin}deg)`,
            transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Base */}
          <div
            className="absolute inset-0"
            style={{
              ...surfaceStyle,
              transform: "translateZ(0)",
            }}
          >
            <div className="flex h-full w-full items-center justify-center text-white">
              {base}
            </div>
          </div>

          {/* Top flap — hinge along the top edge of the base, opens away. */}
          <div
            className="absolute left-0"
            style={{
              width: size,
              height: panelHeight,
              top: -panelHeight,
              transformOrigin: "bottom center",
              transform: `rotateX(${-angle}deg)`,
              transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
              ...surfaceStyle,
            }}
          >
            <div className="flex h-full w-full items-center justify-center p-3 text-white">
              {panels[0]}
            </div>
          </div>

          {/* Bottom flap */}
          <div
            className="absolute left-0"
            style={{
              width: size,
              height: panelHeight,
              top: size,
              transformOrigin: "top center",
              transform: `rotateX(${angle}deg)`,
              transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
              ...surfaceStyle,
            }}
          >
            <div className="flex h-full w-full items-center justify-center p-3 text-white">
              {panels[2]}
            </div>
          </div>

          {/* Right flap */}
          <div
            className="absolute top-0"
            style={{
              width: panelHeight,
              height: size,
              left: size,
              transformOrigin: "left center",
              transform: `rotateY(${-angle}deg)`,
              transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
              ...surfaceStyle,
            }}
          >
            <div className="flex h-full w-full items-center justify-center p-3 text-white">
              {panels[1]}
            </div>
          </div>

          {/* Left flap */}
          <div
            className="absolute top-0"
            style={{
              width: panelHeight,
              height: size,
              left: -panelHeight,
              transformOrigin: "right center",
              transform: `rotateY(${angle}deg)`,
              transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
              ...surfaceStyle,
            }}
          >
            <div className="flex h-full w-full items-center justify-center p-3 text-white">
              {panels[3]}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
PerspectiveBox.displayName = "PerspectiveBox";

export { PerspectiveBox };
