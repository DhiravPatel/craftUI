"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PhoneMockupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Phone width in px. Height is derived from a 19.5:9 ratio. Default 280. */
  width?: number;
  /** Frame color. Default a neutral graphite. */
  frameColor?: string;
  /** Color of the screen bezel surrounding the content. Default near-black. */
  bezelColor?: string;
  /** Show a centered notch / dynamic island. Default true. */
  notch?: boolean;
  /** When true, the phone tilts toward the cursor on hover. Default true. */
  tilt?: boolean;
  /** Maximum tilt in degrees. Default 8. */
  tiltStrength?: number;
}

/**
 * PhoneMockup — a phone frame with rounded corners, a centered notch, side
 * hardware buttons, and a screen slot for `children`. Optional cursor tilt
 * gives the showcase a tactile, modern feel — perfect for SaaS hero shots
 * showing mobile app screens.
 */
const PhoneMockup = React.forwardRef<HTMLDivElement, PhoneMockupProps>(
  (
    {
      width = 280,
      frameColor = "linear-gradient(180deg, rgb(30,32,36) 0%, rgb(14,16,20) 100%)",
      bezelColor = "rgb(8, 10, 12)",
      notch = true,
      tilt = true,
      tiltStrength = 8,
      className,
      style,
      children,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const aspect = 19.5 / 9; // height / width
    const height = width * aspect;
    const frameRadius = width * 0.16;
    const screenInset = width * 0.045;
    const screenRadius = frameRadius - screenInset * 0.6;

    const [hover, setHover] = React.useState(false);
    const [pointer, setPointer] = React.useState({ x: 0, y: 0 });
    const innerRef = React.useRef<HTMLDivElement | null>(null);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      if (!tilt) return;
      const node = innerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
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

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        style={{ perspective: 1400, ...style }}
        {...props}
      >
        <div
          ref={innerRef}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onMouseMove={handleMove}
          className="relative shadow-[0_60px_120px_-40px_rgba(0,0,0,0.65)]"
          style={{
            width,
            height,
            background: frameColor,
            borderRadius: frameRadius,
            transformStyle: "preserve-3d",
            transform:
              tilt && hover
                ? `rotateX(${-pointer.y * tiltStrength}deg) rotateY(${
                    pointer.x * tiltStrength
                  }deg)`
                : "rotateX(0deg) rotateY(0deg)",
            transition: "transform 240ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Frame highlight ring */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: frameRadius,
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)",
            }}
          />

          {/* Power button (right) */}
          <span
            aria-hidden
            className="absolute"
            style={{
              top: height * 0.18,
              right: -2,
              width: 3,
              height: width * 0.22,
              background: "linear-gradient(180deg, rgb(20,22,26), rgb(8,10,12))",
              borderRadius: 2,
            }}
          />
          {/* Volume buttons (left) */}
          <span
            aria-hidden
            className="absolute"
            style={{
              top: height * 0.14,
              left: -2,
              width: 3,
              height: width * 0.06,
              background: "linear-gradient(180deg, rgb(20,22,26), rgb(8,10,12))",
              borderRadius: 2,
            }}
          />
          <span
            aria-hidden
            className="absolute"
            style={{
              top: height * 0.22,
              left: -2,
              width: 3,
              height: width * 0.14,
              background: "linear-gradient(180deg, rgb(20,22,26), rgb(8,10,12))",
              borderRadius: 2,
            }}
          />
          <span
            aria-hidden
            className="absolute"
            style={{
              top: height * 0.38,
              left: -2,
              width: 3,
              height: width * 0.14,
              background: "linear-gradient(180deg, rgb(20,22,26), rgb(8,10,12))",
              borderRadius: 2,
            }}
          />

          {/* Screen */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: screenInset,
              left: screenInset,
              right: screenInset,
              bottom: screenInset,
              borderRadius: screenRadius,
              background: bezelColor,
            }}
          >
            <div className="relative h-full w-full overflow-hidden">
              {children}
              {/* Dynamic island on top of screen content, with a visible
                  camera lens on the right edge for realism. */}
              {notch ? (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-2 z-20 -translate-x-1/2 rounded-full"
                  style={{
                    width: width * 0.34,
                    height: width * 0.078,
                    background: "rgb(0, 0, 0)",
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute top-1/2 block -translate-y-1/2 rounded-full"
                    style={{
                      right: width * 0.013,
                      width: width * 0.024,
                      height: width * 0.024,
                      background:
                        "radial-gradient(circle at 35% 30%, rgb(40,55,80), rgb(0,5,15) 70%)",
                      boxShadow:
                        "inset 0 0 0 1px rgba(60,80,120,0.5), 0 0 0 0.5px rgba(0,0,0,0.6)",
                    }}
                  />
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
PhoneMockup.displayName = "PhoneMockup";

export { PhoneMockup };
