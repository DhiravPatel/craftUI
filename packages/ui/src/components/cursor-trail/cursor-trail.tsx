"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CursorTrailProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of trail dots kept in the buffer. Default 22. */
  maxDots?: number;
  /** Diameter of the leading dot in px. Default 18. */
  size?: number;
  /** Trail color. Default soft blue. */
  color?: string;
  /** When true, hides the native cursor inside the area. Default false. */
  hideCursor?: boolean;
  /** Whether the trail responds to touch as well as mouse. Default true. */
  enableTouch?: boolean;
}

interface Dot {
  id: number;
  x: number;
  y: number;
  born: number;
}

const CursorTrail = React.forwardRef<HTMLDivElement, CursorTrailProps>(
  (
    {
      maxDots = 22,
      size = 18,
      color = "rgba(125, 211, 252, 0.85)",
      hideCursor = false,
      enableTouch = true,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const [dots, setDots] = React.useState<Dot[]>([]);
    const [active, setActive] = React.useState(false);
    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const idRef = React.useRef(0);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        wrapRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const pushPoint = React.useCallback(
      (clientX: number, clientY: number) => {
        const node = wrapRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        idRef.current += 1;
        const dot: Dot = {
          id: idRef.current,
          x,
          y,
          born: performance.now(),
        };
        setDots((prev) => {
          const next = [...prev, dot];
          if (next.length > maxDots) next.splice(0, next.length - maxDots);
          return next;
        });
      },
      [maxDots]
    );

    React.useEffect(() => {
      if (!active) return;
      const id = window.setInterval(() => {
        const now = performance.now();
        setDots((prev) => prev.filter((d) => now - d.born < 700));
      }, 60);
      return () => window.clearInterval(id);
    }, [active]);

    return (
      <div
        ref={setRefs}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => {
          setActive(false);
          setDots([]);
        }}
        onMouseMove={(e) => pushPoint(e.clientX, e.clientY)}
        onTouchStart={
          enableTouch
            ? (e) => {
                setActive(true);
                const t = e.touches[0];
                if (t) pushPoint(t.clientX, t.clientY);
              }
            : undefined
        }
        onTouchMove={
          enableTouch
            ? (e) => {
                const t = e.touches[0];
                if (t) pushPoint(t.clientX, t.clientY);
              }
            : undefined
        }
        onTouchEnd={
          enableTouch
            ? () => {
                setActive(false);
                setDots([]);
              }
            : undefined
        }
        className={cn("relative overflow-hidden", className)}
        style={{ cursor: hideCursor ? "none" : undefined, ...style }}
        {...props}
      >
        {children}
        <div className="pointer-events-none absolute inset-0">
          {dots.map((d, i) => {
            const t = i / Math.max(1, dots.length - 1);
            const scale = 0.35 + t * 0.65;
            const opacity = 0.15 + t * 0.85;
            const dim = size * scale;
            return (
              <span
                key={d.id}
                aria-hidden
                className="absolute rounded-full"
                style={{
                  left: d.x - dim / 2,
                  top: d.y - dim / 2,
                  width: dim,
                  height: dim,
                  background: color,
                  opacity,
                  filter: `blur(${(1 - t) * 6}px)`,
                  boxShadow: `0 0 ${dim}px ${color}`,
                  mixBlendMode: "screen",
                  transition: "opacity 200ms linear",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);
CursorTrail.displayName = "CursorTrail";

export { CursorTrail };
