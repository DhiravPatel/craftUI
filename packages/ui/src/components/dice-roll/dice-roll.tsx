"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;

export interface DiceRollProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  /** Edge length of the die in px. Default 120. */
  size?: number;
  /** Roll duration in ms. Default 1200. */
  duration?: number;
  /** Initial face shown. Default 1. */
  defaultFace?: DiceFace;
  /** Controlled face (skips internal randomization while controlled). */
  face?: DiceFace;
  /** Fires every time a new face settles. */
  onRoll?: (face: DiceFace) => void;
  /** Color of the die body. Default white. */
  color?: string;
  /** Color of the pips. Default black. */
  pipColor?: string;
  /** Perspective distance in px. Default 900. */
  perspective?: number;
  /** Disable the click-to-roll interaction. */
  disabled?: boolean;
}

// Rotations that bring each face into view (looking from +Z).
const faceRotations: Record<DiceFace, [number, number]> = {
  1: [0, 0],
  2: [-90, 0],
  3: [0, -90],
  4: [0, 90],
  5: [90, 0],
  6: [0, 180],
};

// Pip layout per face — coordinates are within a 3×3 grid.
const pipLayouts: Record<DiceFace, Array<[number, number]>> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

function Face({
  face,
  size,
  pipColor,
  color,
  transform,
}: {
  face: DiceFace;
  size: number;
  pipColor: string;
  color: string;
  transform: string;
}) {
  const pips = pipLayouts[face];
  const pad = size * 0.16;
  const inner = size - pad * 2;
  const pipSize = size * 0.16;
  return (
    <div
      className="absolute inset-0 grid grid-cols-3 grid-rows-3 rounded-[18%]"
      style={{
        transform,
        background: color,
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,0.08), inset 0 -10px 24px rgba(0,0,0,0.12), inset 0 10px 24px rgba(255,255,255,0.55)",
        padding: pad,
      }}
    >
      <div
        className="relative col-span-3 row-span-3"
        style={{ width: inner, height: inner }}
      >
        {pips.map(([r, c], i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: pipSize,
              height: pipSize,
              background: pipColor,
              top: `${(r / 2) * (inner - pipSize)}px`,
              left: `${(c / 2) * (inner - pipSize)}px`,
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * DiceRoll — an interactive 6-sided 3D die. Click (or call the `roll()`
 * imperative — wire by reading the rendered face via `onRoll`) to tumble
 * for `duration`ms then settle on a new random face. The die is fully
 * CSS-3D (six faces translated outward + parent `transform-style: preserve-3d`),
 * so there's no canvas, no dependency, and it remains crisp on any DPR.
 */
const DiceRoll = React.forwardRef<HTMLDivElement, DiceRollProps>(
  (
    {
      size = 120,
      duration = 1200,
      defaultFace = 1,
      face,
      onRoll,
      color = "rgb(250, 250, 250)",
      pipColor = "rgb(15, 15, 15)",
      perspective = 900,
      disabled = false,
      className,
      style,
      onClick,
      ...props
    },
    ref
  ) => {
    const isControlled = face !== undefined;
    const [internalFace, setInternalFace] = React.useState<DiceFace>(defaultFace);
    const current = isControlled ? face : internalFace;

    const [rolling, setRolling] = React.useState(false);
    const [target, setTarget] = React.useState<DiceFace>(defaultFace);
    const spinsRef = React.useRef({ x: 0, y: 0 });

    // Whenever target changes, we accumulate full rotations + the resting face
    // rotation so the die keeps spinning forward instead of unwinding.
    React.useEffect(() => {
      const [rx, ry] = faceRotations[target];
      spinsRef.current = {
        x: rx + 360 * 3,
        y: ry + 360 * 3,
      };
    }, [target]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (disabled || rolling || isControlled) return;
      const next = (Math.floor(Math.random() * 6) + 1) as DiceFace;
      // Accumulate spin offsets so we always tumble forward.
      spinsRef.current = {
        x: spinsRef.current.x + 360 * (3 + Math.floor(Math.random() * 2)) + faceRotations[next][0] - faceRotations[current][0],
        y: spinsRef.current.y + 360 * (3 + Math.floor(Math.random() * 2)) + faceRotations[next][1] - faceRotations[current][1],
      };
      setRolling(true);
      setTarget(next);
      window.setTimeout(() => {
        setRolling(false);
        setInternalFace(next);
        onRoll?.(next);
      }, duration);
    };

    const half = size / 2;
    const restRx = faceRotations[current][0];
    const restRy = faceRotations[current][1];
    const liveRx = rolling ? spinsRef.current.x : restRx;
    const liveRy = rolling ? spinsRef.current.y : restRy;

    return (
      <div
        ref={ref}
        role="button"
        aria-label={`Dice showing ${current}. Click to roll.`}
        aria-disabled={disabled || rolling}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (disabled || rolling) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        className={cn(
          "relative inline-block select-none outline-none",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          "focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 rounded-2xl",
          className
        )}
        style={{
          width: size,
          height: size,
          perspective: `${perspective}px`,
          ...style,
        }}
        {...props}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${liveRx}deg) rotateY(${liveRy}deg)`,
            transition: rolling
              ? `transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`
              : "transform 280ms ease-out",
          }}
        >
          <Face face={1} size={size} color={color} pipColor={pipColor} transform={`translateZ(${half}px)`} />
          <Face face={6} size={size} color={color} pipColor={pipColor} transform={`rotateY(180deg) translateZ(${half}px)`} />
          <Face face={3} size={size} color={color} pipColor={pipColor} transform={`rotateY(90deg) translateZ(${half}px)`} />
          <Face face={4} size={size} color={color} pipColor={pipColor} transform={`rotateY(-90deg) translateZ(${half}px)`} />
          <Face face={2} size={size} color={color} pipColor={pipColor} transform={`rotateX(90deg) translateZ(${half}px)`} />
          <Face face={5} size={size} color={color} pipColor={pipColor} transform={`rotateX(-90deg) translateZ(${half}px)`} />
        </div>

        {/* contact shadow */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 rounded-full bg-black/40 blur-md"
          style={{
            width: size * 0.7,
            height: size * 0.12,
            transform: `translate(-50%, ${size * 0.2}px)`,
            opacity: rolling ? 0.25 : 0.5,
            transition: `opacity ${duration}ms ease-out`,
          }}
        />
      </div>
    );
  }
);
DiceRoll.displayName = "DiceRoll";

export { DiceRoll };
