"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { isLand, slerpLatLng } from "../../lib/world-data";

export interface GlobeMarker {
  lat: number;
  lng: number;
  color?: string;
  size?: number;
  label?: React.ReactNode;
}

export interface GlobeConnection {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  /** Override color for this single arc. Falls back to `arcColor`. */
  color?: string;
  /** Bow height as a fraction of the globe radius. Default 0.06. */
  altitude?: number;
}

export interface GlobeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Globe diameter in px. Default 420. */
  size?: number;
  /** How many candidate Fibonacci points to sample before filtering by land.
   *  Higher = denser continents. Default 3500 (≈ 850 land dots). */
  dotCount?: number;
  /** Color of the surface dots. Default soft sky. */
  dotColor?: string;
  /** Atmosphere/halo color. Default cyan. */
  atmosphereColor?: string;
  /** Auto-rotate when not interacting. Default true. */
  autoRotate?: boolean;
  /** Auto-rotate speed in deg/s. Default 8. */
  autoRotateSpeed?: number;
  /** City markers to highlight on the surface. */
  markers?: GlobeMarker[];
  /** Animated arcs between two lat/lng points (drawn around the sphere). */
  connections?: GlobeConnection[];
  /** Color of the connection arcs. Default light cyan. */
  arcColor?: string;
  /** Single arc cycle duration in seconds. Default 4. */
  arcDuration?: number;
  /** Stagger between arcs in seconds. Default 0.7. */
  arcStagger?: number;
  /** Number of dot segments per arc. Default 32. */
  arcSegments?: number;
  /** Arc dot size in px. Default 2.4. */
  arcDotSize?: number;
  /** Arc glow radius in px. Default 6. */
  arcGlow?: number;
}

// Fibonacci sphere — evenly distributed lat/lng candidates.
function fibonacciLatLng(count: number) {
  const out: { lat: number; lng: number }[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    const lat = (Math.asin(Math.max(-1, Math.min(1, y))) * 180) / Math.PI;
    const lng = (Math.atan2(z, x) * 180) / Math.PI;
    out.push({ lat, lng });
  }
  return out;
}

const Globe = React.forwardRef<HTMLDivElement, GlobeProps>(
  (
    {
      size = 420,
      dotCount = 3500,
      dotColor = "rgba(125, 211, 252, 0.7)",
      atmosphereColor = "rgba(56, 189, 248, 0.5)",
      autoRotate = true,
      autoRotateSpeed = 8,
      markers = [],
      connections = [],
      arcColor = "rgb(125, 211, 252)",
      arcDuration = 2.4,
      arcStagger = 0.45,
      arcSegments = 28,
      arcDotSize = 2.4,
      arcGlow = 6,
      className,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLDivElement
    );

    const [rot, setRot] = React.useState({ x: -8, y: 0 });
    const [dragging, setDragging] = React.useState(false);
    const dragRef = React.useRef<{
      x: number;
      y: number;
      rx: number;
      ry: number;
    } | null>(null);

    React.useEffect(() => {
      if (!dragging) return;
      const onMove = (e: PointerEvent) => {
        const start = dragRef.current;
        if (!start) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        setRot({
          x: Math.max(-85, Math.min(85, start.rx - dy * 0.4)),
          y: start.ry + dx * 0.4,
        });
      };
      const onUp = () => {
        setDragging(false);
        dragRef.current = null;
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
    }, [dragging]);

    React.useEffect(() => {
      if (!autoRotate || dragging) return;
      let frame = 0;
      let last = performance.now();
      const tick = (now: number) => {
        const dt = (now - last) / 1000;
        last = now;
        setRot((r) => ({ ...r, y: r.y + autoRotateSpeed * dt }));
        frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
      return () => window.cancelAnimationFrame(frame);
    }, [autoRotate, dragging, autoRotateSpeed]);

    // Land-only dots: sample Fibonacci sphere, filter by isLand.
    const dots = React.useMemo(
      () => fibonacciLatLng(dotCount).filter((p) => isLand(p.lat, p.lng)),
      [dotCount]
    );

    // Each connection becomes N points along its great circle, with a slight
    // outward lift so the arc bows away from the surface. Per-arc color and
    // altitude (bow height) are honored.
    const arcs = React.useMemo(
      () =>
        connections.map((c) => {
          const baseAlt = c.altitude ?? 0.06;
          const lift = size * baseAlt;
          const points: { lat: number; lng: number; lift: number }[] = [];
          for (let i = 0; i <= arcSegments; i++) {
            const t = i / arcSegments;
            const p = slerpLatLng(c.start, c.end, t);
            points.push({
              lat: p.lat,
              lng: p.lng,
              lift: lift * Math.sin(Math.PI * t),
            });
          }
          return { points, color: c.color ?? arcColor };
        }),
      [connections, arcSegments, size, arcColor]
    );

    // Stable pseudo-random per-dot variation so continents look organic.
    const hash = (i: number, salt = 0) => {
      const x = Math.sin((i + salt) * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    const radius = size / 2;

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragRef.current = {
        x: e.clientX,
        y: e.clientY,
        rx: rot.x,
        ry: rot.y,
      };
      setDragging(true);
    };

    return (
      <div
        ref={innerRef}
        className={cn(
          "relative inline-block select-none",
          dragging ? "cursor-grabbing" : "cursor-grab",
          className
        )}
        style={{
          width: size,
          height: size,
          perspective: `${size * 2.4}px`,
          ...style,
        }}
        onPointerDown={onPointerDown}
        {...props}
      >
        {/* Atmosphere — outer halo */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-[10%] rounded-full blur-3xl"
          style={{ background: atmosphereColor, opacity: 0.55 }}
        />
        {/* Atmosphere — tight rim */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-[2%] rounded-full"
          style={{
            boxShadow: `0 0 24px 2px ${atmosphereColor}`,
          }}
        />

        {/* Sphere body — deep navy with upper-right lighting */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 62% 28%, rgba(40, 72, 170, 0.55), rgba(8, 20, 70, 0.98) 44%, rgba(4, 10, 40, 0.99) 70%, rgba(1, 4, 20, 1) 100%)`,
            boxShadow:
              "inset -34px -34px 90px rgba(0,0,0,0.9), inset 12px 12px 44px rgba(59,130,246,0.1)",
          }}
        />

        {/* Rotating layer */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            transition: dragging ? "none" : "transform 60ms linear",
          }}
        >
          {/* Continent dots — varied size and opacity per index */}
          {dots.map((d, i) => {
            const sz = 1.5 + hash(i, 1) * 1.1;
            const op = 0.45 + hash(i, 7) * 0.5;
            return (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 block rounded-full"
                style={{
                  width: sz,
                  height: sz,
                  marginLeft: -sz / 2,
                  marginTop: -sz / 2,
                  background: dotColor,
                  opacity: op,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: `rotateY(${d.lng}deg) rotateX(${-d.lat}deg) translateZ(${radius}px)`,
                }}
              />
            );
          })}

          {/* Arcs — series of small dots animated with staggered twinkle so
              the arc reads as a wave traveling between cities. Per-arc color. */}
          {arcs.map((arc, ai) =>
            arc.points.map((p, i) => (
              <span
                key={`arc-${ai}-${i}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: 0,
                  height: 0,
                  transform: `rotateY(${p.lng}deg) rotateX(${-p.lat}deg) translateZ(${radius + p.lift}px)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <span
                  className="animate-world-arc-dot absolute block rounded-full"
                  style={
                    {
                      width: arcDotSize,
                      height: arcDotSize,
                      marginLeft: -arcDotSize / 2,
                      marginTop: -arcDotSize / 2,
                      background: arc.color,
                      boxShadow: `0 0 ${arcGlow}px 1px ${arc.color}`,
                      animationDelay: `${ai * arcStagger + (i / arc.points.length) * arcDuration * 0.85}s`,
                      "--world-arc-duration": `${arcDuration}s`,
                    } as React.CSSProperties
                  }
                />
              </span>
            ))
          )}

          {/* City markers */}
          {markers.map((m, i) => {
            const c = m.color ?? arcColor;
            const sz = m.size ?? 6;
            return (
              <span
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: sz,
                  height: sz,
                  marginLeft: -sz / 2,
                  marginTop: -sz / 2,
                  transform: `rotateY(${m.lng}deg) rotateX(${-m.lat}deg) translateZ(${radius + 1}px)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <span
                  className="block h-full w-full rounded-full"
                  style={{
                    background: c,
                    boxShadow: `0 0 ${sz * 1.6}px ${sz / 2}px ${c}`,
                  }}
                />
                <span
                  className="animate-world-pulse absolute inset-0 rounded-full"
                  style={
                    {
                      border: `1px solid ${c}`,
                      "--world-pulse-duration": "2s",
                    } as React.CSSProperties
                  }
                />
                {m.label ? (
                  <span
                    className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium text-white/80"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
                  >
                    {m.label}
                  </span>
                ) : null}
              </span>
            );
          })}
        </div>

        {/* Front-hemisphere highlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 25%, rgba(255,255,255,0.18), transparent 45%)",
          }}
        />
      </div>
    );
  }
);
Globe.displayName = "Globe";

export { Globe };
