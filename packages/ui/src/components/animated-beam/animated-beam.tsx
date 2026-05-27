"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface AnimatedBeamProps {
  /** The positioned ancestor the beam is drawn inside. */
  containerRef: React.RefObject<HTMLElement>;
  /** Element the beam starts from. */
  fromRef: React.RefObject<HTMLElement>;
  /** Element the beam travels to. */
  toRef: React.RefObject<HTMLElement>;
  /** Bow of the curve in px (positive arcs upward). Default 0. */
  curvature?: number;
  /** Animate from end → start instead. Default false. */
  reverse?: boolean;
  /** Sweep duration in seconds. Default 4. */
  duration?: number;
  /** Delay before the first sweep in seconds. Default 0. */
  delay?: number;
  /** Color of the static base path. */
  pathColor?: string;
  /** Stroke width in px. Default 2. */
  pathWidth?: number;
  /** Opacity of the static base path. Default 0.18. */
  pathOpacity?: number;
  /** Leading color of the moving gradient. */
  gradientStartColor?: string;
  /** Trailing color of the moving gradient. */
  gradientStopColor?: string;
  /** Nudge the start point. */
  startXOffset?: number;
  startYOffset?: number;
  /** Nudge the end point. */
  endXOffset?: number;
  endYOffset?: number;
  className?: string;
}

interface Geometry {
  width: number;
  height: number;
  d: string;
  x1: [number, number];
  x2: [number, number];
  y1: [number, number];
  y2: [number, number];
}

let beamCounter = 0;

/**
 * AnimatedBeam — draws a glowing gradient beam between two elements and sweeps
 * light along it on a loop. Give it a positioned container plus refs to a
 * "from" and "to" node; it measures their centers, draws a curved SVG path
 * between them, and recomputes on resize. Perfect for "connect your tools",
 * integration maps, and network / architecture diagrams. Dependency-free — the
 * sweep uses SVG SMIL, so it runs without JavaScript once painted.
 */
const AnimatedBeam = React.forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false,
      duration = 4,
      delay = 0,
      pathColor = "rgb(115, 115, 115)",
      pathWidth = 2,
      pathOpacity = 0.18,
      gradientStartColor = "rgb(125, 211, 252)",
      gradientStopColor = "rgb(168, 85, 247)",
      startXOffset = 0,
      startYOffset = 0,
      endXOffset = 0,
      endYOffset = 0,
      className,
    },
    ref
  ) => {
    const [geo, setGeo] = React.useState<Geometry | null>(null);
    const gradientId = React.useMemo(() => `beam-gradient-${beamCounter++}`, []);

    React.useEffect(() => {
      const update = () => {
        const container = containerRef.current;
        const from = fromRef.current;
        const to = toRef.current;
        if (!container || !from || !to) return;

        const cRect = container.getBoundingClientRect();
        const aRect = from.getBoundingClientRect();
        const bRect = to.getBoundingClientRect();

        const startX = aRect.left - cRect.left + aRect.width / 2 + startXOffset;
        const startY = aRect.top - cRect.top + aRect.height / 2 + startYOffset;
        const endX = bRect.left - cRect.left + bRect.width / 2 + endXOffset;
        const endY = bRect.top - cRect.top + bRect.height / 2 + endYOffset;

        const controlX = (startX + endX) / 2;
        const controlY = (startY + endY) / 2 - curvature;
        const d = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;

        const dx = endX - startX;
        const dy = endY - startY;
        const tail = 0.35;
        // The colored band sweeps from before the start to past the end.
        const x1: [number, number] = reverse
          ? [endX, startX - dx * tail]
          : [startX - dx * tail, endX];
        const x2: [number, number] = reverse
          ? [endX + dx * tail, startX]
          : [startX, endX + dx * tail];
        const y1: [number, number] = reverse
          ? [endY, startY - dy * tail]
          : [startY - dy * tail, endY];
        const y2: [number, number] = reverse
          ? [endY + dy * tail, startY]
          : [startY, endY + dy * tail];

        setGeo({ width: cRect.width, height: cRect.height, d, x1, x2, y1, y2 });
      };

      update();
      const ro = new ResizeObserver(update);
      if (containerRef.current) ro.observe(containerRef.current);
      if (fromRef.current) ro.observe(fromRef.current);
      if (toRef.current) ro.observe(toRef.current);
      window.addEventListener("resize", update);
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", update);
      };
    }, [
      containerRef,
      fromRef,
      toRef,
      curvature,
      reverse,
      startXOffset,
      startYOffset,
      endXOffset,
      endYOffset,
    ]);

    if (!geo) {
      return (
        <svg
          ref={ref}
          className={cn("pointer-events-none absolute inset-0", className)}
          fill="none"
        />
      );
    }

    const dur = `${duration}s`;
    const begin = `${delay}s`;

    return (
      <svg
        ref={ref}
        width={geo.width}
        height={geo.height}
        viewBox={`0 0 ${geo.width} ${geo.height}`}
        fill="none"
        className={cn("pointer-events-none absolute left-0 top-0", className)}
      >
        <path
          d={geo.d}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          strokeLinecap="round"
        />
        <path
          d={geo.d}
          stroke={`url(#${gradientId})`}
          strokeWidth={pathWidth}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1={geo.x1[0]}
            x2={geo.x2[0]}
            y1={geo.y1[0]}
            y2={geo.y2[0]}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" />
            <stop offset="0.2" stopColor={gradientStartColor} />
            <stop offset="0.5" stopColor={gradientStopColor} />
            <stop offset="1" stopColor={gradientStopColor} stopOpacity="0" />
            <animate
              attributeName="x1"
              values={`${geo.x1[0]};${geo.x1[1]}`}
              dur={dur}
              begin={begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values={`${geo.x2[0]};${geo.x2[1]}`}
              dur={dur}
              begin={begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="y1"
              values={`${geo.y1[0]};${geo.y1[1]}`}
              dur={dur}
              begin={begin}
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values={`${geo.y2[0]};${geo.y2[1]}`}
              dur={dur}
              begin={begin}
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
      </svg>
    );
  }
);
AnimatedBeam.displayName = "AnimatedBeam";

export { AnimatedBeam };
