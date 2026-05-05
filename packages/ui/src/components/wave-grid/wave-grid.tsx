"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface WaveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns of dots. Default 22. */
  columns?: number;
  /** Number of rows of dots. Default 14. */
  rows?: number;
  /** Diameter of each dot in px. Default 5. */
  dotSize?: number;
  /** Color of each dot. */
  dotColor?: string;
  /** Peak vertical lift each dot can reach in px. Default 28. */
  amplitude?: number;
  /** Speed of the wave radius growth in px/sec. Default 360. */
  speed?: number;
  /** How fast the ripple decays with distance from origin. Default 200. */
  decay?: number;
  /** When true, an automatic ripple fires every `autoInterval` seconds. */
  auto?: boolean;
  /** Auto ripple interval in seconds. Default 3. */
  autoInterval?: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  born: number;
}

/**
 * WaveGrid — a grid of dots that ripple in 3D when you click anywhere on
 * the surface. Every dot offsets in Y based on its distance from each
 * ripple's origin, modulated by a damped sine wave. Multiple ripples can
 * coexist; they sum until each one decays out.
 */
const WaveGrid = React.forwardRef<HTMLDivElement, WaveGridProps>(
  (
    {
      columns = 22,
      rows = 14,
      dotSize = 5,
      dotColor = "rgb(125, 211, 252)",
      amplitude = 28,
      speed = 360,
      decay = 200,
      auto = false,
      autoInterval = 3,
      className,
      style,
      onClick,
      ...props
    },
    ref
  ) => {
    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const idRef = React.useRef(0);
    const ripplesRef = React.useRef<Ripple[]>([]);
    const dotElsRef = React.useRef<HTMLSpanElement[]>([]);
    const dotPositionsRef = React.useRef<Array<{ x: number; y: number }>>([]);
    const rafRef = React.useRef<number | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        wrapRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    // Recompute dot screen positions whenever the grid size changes.
    const recomputePositions = React.useCallback(() => {
      const node = wrapRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cellW = rect.width / columns;
      const cellH = rect.height / rows;
      const positions: Array<{ x: number; y: number }> = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          positions.push({
            x: cellW * (c + 0.5),
            y: cellH * (r + 0.5),
          });
        }
      }
      dotPositionsRef.current = positions;
    }, [columns, rows]);

    React.useEffect(() => {
      recomputePositions();
      const ro = new ResizeObserver(() => recomputePositions());
      if (wrapRef.current) ro.observe(wrapRef.current);
      return () => ro.disconnect();
    }, [recomputePositions]);

    const addRipple = React.useCallback((x: number, y: number) => {
      idRef.current += 1;
      ripplesRef.current.push({
        id: idRef.current,
        x,
        y,
        born: performance.now(),
      });
    }, []);

    React.useEffect(() => {
      if (!auto) return;
      const id = window.setInterval(() => {
        const node = wrapRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        addRipple(
          Math.random() * rect.width,
          Math.random() * rect.height
        );
      }, autoInterval * 1000);
      return () => window.clearInterval(id);
    }, [auto, autoInterval, addRipple]);

    // Animation loop: for each dot, sum the contribution of every active
    // ripple, then write transform directly to the DOM (skip React renders).
    React.useEffect(() => {
      const tick = () => {
        const now = performance.now();
        // Drop ripples older than ~3.5s; their amplitude is negligible by then.
        ripplesRef.current = ripplesRef.current.filter(
          (r) => now - r.born < 3500
        );
        const positions = dotPositionsRef.current;
        const dots = dotElsRef.current;
        for (let i = 0; i < dots.length; i++) {
          const pos = positions[i];
          const el = dots[i];
          if (!pos || !el) continue;
          let lift = 0;
          for (const ripple of ripplesRef.current) {
            const dt = (now - ripple.born) / 1000;
            const radius = dt * speed;
            const dx = pos.x - ripple.x;
            const dy = pos.y - ripple.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const phase = (dist - radius) / 30;
            // Gaussian envelope around the wave front, fading with distance.
            const envelope =
              Math.exp(-Math.pow(dist - radius, 2) / 1400) *
              Math.exp(-dist / decay);
            lift += Math.cos(phase) * envelope * amplitude;
          }
          el.style.transform = `translate3d(0, ${lift.toFixed(2)}px, 0) scale(${
            1 + Math.min(0.6, Math.abs(lift) / amplitude / 2)
          })`;
          el.style.opacity = String(
            Math.min(1, 0.55 + Math.abs(lift) / amplitude / 1.5)
          );
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      };
    }, [amplitude, decay, speed]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      const rect = e.currentTarget.getBoundingClientRect();
      addRipple(e.clientX - rect.left, e.clientY - rect.top);
    };

    const total = columns * rows;

    return (
      <div
        ref={setRefs}
        onClick={handleClick}
        className={cn("relative cursor-pointer overflow-hidden", className)}
        style={style}
        {...props}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) dotElsRef.current[i] = el;
              }}
              className="m-auto block rounded-full"
              style={{
                width: dotSize,
                height: dotSize,
                background: dotColor,
                boxShadow: `0 0 ${dotSize * 2}px ${dotColor}`,
                opacity: 0.55,
                willChange: "transform, opacity",
                transition: "opacity 80ms linear",
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);
WaveGrid.displayName = "WaveGrid";

export { WaveGrid };
