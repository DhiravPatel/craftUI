"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface MagicLayerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Stack of layers to render. Each entry is a ReactNode that fills the box.
   * Index 0 is the back-most layer; the last index is the closest to the viewer.
   */
  layers: React.ReactNode[];
  /** Box width in px. Default 360. */
  width?: number;
  /** Box height in px. Default 240. */
  height?: number;
  /** Z-spacing between layers when expanded, in px. Default 60. */
  spacing?: number;
  /** Max tilt in degrees applied while hovering. Default 14. */
  tilt?: number;
  /** Border radius in px applied to each layer. Default 18. */
  radius?: number;
}

/**
 * MagicLayer — a stack of N layers that lives flat by default, then on
 * hover separates into discrete Z-depths revealing the structure between
 * them (X-ray view). The whole stack also tilts toward the cursor for a
 * subtle parallax read.
 */
const MagicLayer = React.forwardRef<HTMLDivElement, MagicLayerProps>(
  (
    {
      layers,
      width = 360,
      height = 240,
      spacing = 60,
      tilt = 14,
      radius = 18,
      className,
      style,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [hover, setHover] = React.useState(false);
    const [pointer, setPointer] = React.useState({ x: 0, y: 0 });
    const innerRef = React.useRef<HTMLDivElement | null>(null);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      const node = innerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      // Map cursor to a -1..1 range based on the box center.
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setPointer({ x: nx, y: ny });
    };

    const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      setHover(true);
    };
    const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      setHover(false);
      setPointer({ x: 0, y: 0 });
    };

    const last = layers.length - 1;
    // Center the stack around z=0 so the front layer sits closest to the viewer.
    const centerOffset = (last * spacing) / 2;

    return (
      <div
        ref={ref}
        className={cn("relative inline-block select-none", className)}
        style={{
          width,
          height,
          perspective: 1100,
          ...style,
        }}
        {...props}
      >
        <div
          ref={innerRef}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onMouseMove={handleMove}
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: hover
              ? `rotateX(${-pointer.y * tilt}deg) rotateY(${
                  pointer.x * tilt
                }deg)`
              : "rotateX(0deg) rotateY(0deg)",
            transition: "transform 240ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {layers.map((layer, i) => {
            // When hovered, separate layers into discrete Z planes.
            // When idle, all layers collapse to z=0.
            const z = hover ? i * spacing - centerOffset : 0;
            const layerOpacity = hover ? (i === last ? 1 : 0.85) : 1;
            return (
              <div
                key={i}
                aria-hidden={i !== last}
                className="absolute inset-0 overflow-hidden border border-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
                style={{
                  borderRadius: radius,
                  transform: `translateZ(${z}px)`,
                  transition:
                    "transform 380ms cubic-bezier(0.22,1,0.36,1), opacity 240ms ease",
                  opacity: layerOpacity,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  zIndex: i,
                }}
              >
                {layer}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
MagicLayer.displayName = "MagicLayer";

export { MagicLayer };
