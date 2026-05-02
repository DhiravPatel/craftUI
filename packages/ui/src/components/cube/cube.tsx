"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type CubeFaceName =
  | "front"
  | "back"
  | "right"
  | "left"
  | "top"
  | "bottom";

interface CubeContextValue {
  size: number;
}

const CubeContext = React.createContext<CubeContextValue | null>(null);

export interface CubeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which face should be facing the viewer. Defaults to "front". */
  face?: CubeFaceName;
  /** Edge length of the cube in pixels (the rendered size). Default 240. */
  size?: number;
  /** Perspective distance. Smaller = more dramatic. Default 1200. */
  perspective?: number;
  /** Transition duration in ms. Default 800. */
  duration?: number;
}

// Rotation applied to the cube container so that `face` is shown to the viewer.
const cubeRotations: Record<CubeFaceName, string> = {
  front: "rotateY(0deg)",
  back: "rotateY(-180deg)",
  right: "rotateY(-90deg)",
  left: "rotateY(90deg)",
  top: "rotateX(-90deg)",
  bottom: "rotateX(90deg)",
};

const Cube = React.forwardRef<HTMLDivElement, CubeProps>(
  (
    {
      className,
      face = "front",
      size = 240,
      perspective = 1200,
      duration = 800,
      style,
      children,
      ...props
    },
    ref
  ) => (
    <CubeContext.Provider value={{ size }}>
      <div
        ref={ref}
        className={cn(className)}
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
            transition: `transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`,
            transform: cubeRotations[face],
          }}
        >
          {children}
        </div>
      </div>
    </CubeContext.Provider>
  )
);
Cube.displayName = "Cube";

// Each face is positioned at one side of a cube of edge `size`. We translate
// by half the size on Z (after rotating into position) so faces align with the
// cube's surfaces.
function faceTransform(face: CubeFaceName, half: number): string {
  switch (face) {
    case "front":
      return `translateZ(${half}px)`;
    case "back":
      return `rotateY(180deg) translateZ(${half}px)`;
    case "right":
      return `rotateY(90deg) translateZ(${half}px)`;
    case "left":
      return `rotateY(-90deg) translateZ(${half}px)`;
    case "top":
      return `rotateX(90deg) translateZ(${half}px)`;
    case "bottom":
      return `rotateX(-90deg) translateZ(${half}px)`;
  }
}

export interface CubeFaceProps extends React.HTMLAttributes<HTMLDivElement> {
  face: CubeFaceName;
}

const CubeFace = React.forwardRef<HTMLDivElement, CubeFaceProps>(
  ({ className, face, style, ...props }, ref) => {
    const ctx = React.useContext(CubeContext);
    const half = (ctx?.size ?? 240) / 2;
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0", className)}
        style={{
          transform: faceTransform(face, half),
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          ...style,
        }}
        {...props}
      />
    );
  }
);
CubeFace.displayName = "CubeFace";

export { Cube, CubeFace };
