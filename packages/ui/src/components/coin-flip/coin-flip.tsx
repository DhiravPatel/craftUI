"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CoinFlipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Heads face content. Centered inside the coin. */
  heads: React.ReactNode;
  /** Tails face content. Centered inside the coin. */
  tails: React.ReactNode;
  /** Coin diameter in px. Default 160. */
  size?: number;
  /** Visual edge thickness in px. Default 8. */
  thickness?: number;
  /** Time (s) for one flip. Default 0.8. */
  duration?: number;
  /**
   * "click" — a single flip per click.
   * "hover" — flip continuously while hovered.
   * "auto" — flip continuously, ignoring user input.
   * Default "click".
   */
  trigger?: "click" | "hover" | "auto";
  /** Auto-flip interval (s), used when trigger="auto". Default 1.6. */
  autoInterval?: number;
  /** Notified after each flip with the new face. */
  onChange?: (face: "heads" | "tails") => void;
  /**
   * Color used for the chiseled rim highlight + inner ring on each face.
   * Default a metallic gold gradient pair.
   */
  rimColor?: string;
}

/**
 * CoinFlip — a 3D flipping coin with two custom faces. Each face is a flat
 * disc with a chiseled metallic rim drawn via layered inset shadows, so the
 * faces *look* like a real coin without the rendering artifacts that come
 * from trying to render a true segmented cylinder rim. The two faces sit at
 * +/- thickness/2 on the Z axis with `backface-visibility: hidden`, so each
 * face cleanly disappears when it rotates away from the camera.
 */
const CoinFlip = React.forwardRef<HTMLDivElement, CoinFlipProps>(
  (
    {
      heads,
      tails,
      size = 160,
      thickness = 8,
      duration = 0.8,
      trigger = "click",
      autoInterval = 1.6,
      onChange,
      rimColor = "rgba(255, 230, 160, 0.85)",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [flips, setFlips] = React.useState(0);
    const [hover, setHover] = React.useState(false);

    React.useEffect(() => {
      if (trigger !== "auto") return;
      const id = window.setInterval(
        () => setFlips((f) => f + 1),
        autoInterval * 1000
      );
      return () => window.clearInterval(id);
    }, [trigger, autoInterval]);

    React.useEffect(() => {
      if (trigger !== "hover" || !hover) return;
      const id = window.setInterval(
        () => setFlips((f) => f + 1),
        duration * 1000
      );
      return () => window.clearInterval(id);
    }, [trigger, hover, duration]);

    const lastFaceRef = React.useRef<"heads" | "tails">("heads");
    React.useEffect(() => {
      const face = flips % 2 === 0 ? "heads" : "tails";
      if (face !== lastFaceRef.current) {
        lastFaceRef.current = face;
        onChange?.(face);
      }
    }, [flips, onChange]);

    const handleClick = () => {
      if (trigger === "click") setFlips((f) => f + 1);
    };

    // Each click adds a full 360deg turn on top of the +180 to land on the
    // opposite face — gives a satisfying double-flip on every interaction.
    const rotation = flips * 540;

    // Layered shadow stack for the chiseled rim look. The inset shadows make
    // the disc read as a coin with depth, even though it is only 1 layer.
    const faceShadow = [
      // Outer ring (the visible "edge band" when face-on)
      `inset 0 0 0 1px rgba(0,0,0,0.35)`,
      // Bright top highlight
      `inset 0 ${thickness * 0.4}px ${thickness * 0.6}px ${rimColor}`,
      // Dark bottom shadow (gives the disc volume)
      `inset 0 -${thickness * 0.4}px ${thickness * 0.6}px rgba(0,0,0,0.35)`,
      // Inner concentric "ridge" line
      `inset 0 0 0 ${Math.max(2, thickness * 0.6)}px rgba(0,0,0,0.12)`,
      // Drop shadow under the coin
      `0 ${thickness * 2}px ${thickness * 5}px -${thickness}px rgba(0,0,0,0.55)`,
    ].join(", ");

    return (
      <div
        ref={ref}
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn("inline-block", className)}
        style={{
          width: size,
          height: size,
          perspective: size * 6,
          cursor: trigger === "click" ? "pointer" : undefined,
          ...style,
        }}
        {...props}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: `transform ${duration}s cubic-bezier(0.5, 0.05, 0.4, 1)`,
          }}
        >
          {/* Heads face — sits at +thickness/2 along Z */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full"
            style={{
              transform: `translateZ(${thickness / 2}px)`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              boxShadow: faceShadow,
            }}
          >
            {heads}
          </div>

          {/* Tails face — sits at -thickness/2 along Z, pre-rotated 180deg
              so it reads correctly when the coin is flipped. */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full"
            style={{
              transform: `translateZ(-${thickness / 2}px) rotateY(180deg)`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              boxShadow: faceShadow,
            }}
          >
            {tails}
          </div>
        </div>
      </div>
    );
  }
);
CoinFlip.displayName = "CoinFlip";

export { CoinFlip };
