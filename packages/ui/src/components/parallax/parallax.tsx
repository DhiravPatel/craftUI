"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

interface ParallaxContextValue {
  /** Cursor offset from center, normalized -1 to 1. */
  x: number;
  y: number;
  active: boolean;
}

const ParallaxContext = React.createContext<ParallaxContextValue>({
  x: 0,
  y: 0,
  active: false,
});

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Perspective distance in px. Default 1000. */
  perspective?: number;
}

const Parallax = React.forwardRef<HTMLDivElement, ParallaxProps>(
  (
    {
      className,
      children,
      perspective = 1000,
      style,
      onMouseMove,
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
    const [coords, setCoords] = React.useState<ParallaxContextValue>({
      x: 0,
      y: 0,
      active: false,
    });

    return (
      <ParallaxContext.Provider value={coords}>
        <div
          ref={innerRef}
          onMouseMove={(event) => {
            onMouseMove?.(event);
            const rect = innerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
            setCoords({ x, y, active: true });
          }}
          onMouseLeave={(event) => {
            onMouseLeave?.(event);
            setCoords({ x: 0, y: 0, active: false });
          }}
          className={cn("relative", className)}
          style={{
            perspective: `${perspective}px`,
            transformStyle: "preserve-3d",
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </ParallaxContext.Provider>
    );
  }
);
Parallax.displayName = "Parallax";

export interface ParallaxLayerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Distance in px the layer moves at extreme cursor positions. Default 20. */
  depth?: number;
  /** Z translation for layered depth. Default 0. */
  z?: number;
  /** Invert direction so the layer moves opposite to the cursor. */
  invert?: boolean;
}

const ParallaxLayer = React.forwardRef<HTMLDivElement, ParallaxLayerProps>(
  (
    { className, depth = 20, z = 0, invert = false, style, ...props },
    ref
  ) => {
    const { x, y, active } = React.useContext(ParallaxContext);
    const sign = invert ? -1 : 1;
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0", className)}
        style={{
          transform: `translate3d(${x * depth * sign}px, ${y * depth * sign}px, ${z}px)`,
          transition: active
            ? "transform 180ms cubic-bezier(0.22,1,0.36,1)"
            : "transform 500ms cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
          ...style,
        }}
        {...props}
      />
    );
  }
);
ParallaxLayer.displayName = "ParallaxLayer";

export { Parallax, ParallaxLayer };
