"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { isLand, project } from "../../lib/world-data";

export interface LatLng {
  lat: number;
  lng: number;
}

export interface WorldMapConnection {
  start: LatLng;
  end: LatLng;
  /** Optional override label for the route. */
  label?: string;
}

export interface WorldMapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Routes to animate. Each route draws as an arc, then erases, then repeats. */
  connections?: WorldMapConnection[];
  /** Color of the arcs and endpoint dots. Default light cyan. */
  lineColor?: string;
  /** Color of the dots that paint the continents. Default subtle white. */
  dotColor?: string;
  /** Single arc cycle duration in seconds. Default 4. */
  duration?: number;
  /** Stagger between arcs in seconds. Default 0.6. */
  stagger?: number;
  /** Continent dot grid resolution (longitude columns). Default 90 (≈ 4° spacing). */
  resolution?: number;
}

const WorldMap = React.forwardRef<HTMLDivElement, WorldMapProps>(
  (
    {
      connections = [],
      lineColor = "rgb(125, 211, 252)",
      dotColor = "rgba(255, 255, 255, 0.32)",
      duration = 4,
      stagger = 0.6,
      resolution = 90,
      className,
      ...props
    },
    ref
  ) => {
    // Sample a regular lat/lng grid; keep only points that fall on land.
    const dots = React.useMemo(() => {
      const out: { x: number; y: number }[] = [];
      const cols = resolution;
      const rows = Math.round(resolution / 2);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const lat = 90 - ((r + 0.5) / rows) * 180;
          const lng = -180 + ((c + 0.5) / cols) * 360;
          if (!isLand(lat, lng)) continue;
          const [x, y] = project(lat, lng);
          out.push({ x, y });
        }
      }
      return out;
    }, [resolution]);

    return (
      <div
        ref={ref}
        className={cn("relative w-full overflow-hidden", className)}
        {...props}
      >
        <svg
          viewBox="0 0 1000 500"
          className="block h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Continent dots */}
          <g fill={dotColor}>
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="0.95" />
            ))}
          </g>

          {/* Arcs */}
          {connections.map((conn, i) => {
            const [sx, sy] = project(conn.start.lat, conn.start.lng);
            const [ex, ey] = project(conn.end.lat, conn.end.lng);
            const mx = (sx + ex) / 2;
            // Lift the curve by 35% of the horizontal distance.
            const my = (sy + ey) / 2 - Math.abs(ex - sx) * 0.35;
            const path = `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
            const delay = i * stagger;
            return (
              <g key={i}>
                <path
                  d={path}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeDasharray={1000}
                  className="animate-world-arc"
                  style={
                    {
                      filter: `drop-shadow(0 0 2px ${lineColor})`,
                      animationDelay: `${delay}s`,
                      "--world-arc-duration": `${duration}s`,
                    } as React.CSSProperties
                  }
                />
                {/* Endpoint dots with pulse */}
                {[
                  [sx, sy],
                  [ex, ey],
                ].map(([cx, cy], j) => (
                  <g key={j}>
                    <circle cx={cx} cy={cy} r={2.5} fill={lineColor} />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={2.5}
                      fill="none"
                      stroke={lineColor}
                      strokeWidth="1"
                      className="animate-world-pulse"
                      style={
                        {
                          transformOrigin: `${cx}px ${cy}px`,
                          animationDelay: `${delay + j * 0.2}s`,
                          "--world-pulse-duration": `${Math.max(1.6, duration / 2)}s`,
                        } as React.CSSProperties
                      }
                    />
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
);
WorldMap.displayName = "WorldMap";

export { WorldMap };
