"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ConfettiOptions {
  /** Number of pieces to launch. Default 90. */
  particleCount?: number;
  /** Cone width in degrees around straight up. Default 70. */
  spread?: number;
  /** Initial speed in px/frame. Default 42. */
  startVelocity?: number;
  /** Downward acceleration per frame. Default 0.45. */
  gravity?: number;
  /** Piece colors, picked at random. */
  colors?: string[];
  /** Launch origin relative to the canvas (0–1). Default center-bottom-ish. */
  origin?: { x: number; y: number };
}

export interface ConfettiHandle {
  /** Launch a burst, optionally overriding the default options. */
  fire: (options?: ConfettiOptions) => void;
}

export interface ConfettiProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement>,
    ConfettiOptions {
  /** Fire once automatically when mounted. */
  autoFire?: boolean;
}

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  w: number;
  h: number;
  angle: number;
  spin: number;
  tick: number;
  life: number;
}

const DEFAULT_COLORS = [
  "#7dd3fc",
  "#a855f7",
  "#ec4899",
  "#22c55e",
  "#eab308",
  "#f97316",
];

/**
 * Confetti — a celebratory particle burst on a transparent canvas. Drop it
 * inside a `relative` container (or a `fixed inset-0` one for full screen) and
 * call `fire()` on its ref — on a successful payment, a finished onboarding
 * step, a won game. Pieces are flung in a cone, tumble under gravity, and fade
 * out, then the animation stops on its own. Dependency-free, ref-driven, and
 * `pointer-events-none` so it never blocks clicks.
 */
const Confetti = React.forwardRef<ConfettiHandle, ConfettiProps>(
  (
    {
      particleCount = 90,
      spread = 70,
      startVelocity = 42,
      gravity = 0.45,
      colors,
      origin = { x: 0.5, y: 0.5 },
      autoFire = false,
      className,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const piecesRef = React.useRef<Piece[]>([]);
    const rafRef = React.useRef<number | null>(null);

    const palette = colors ?? DEFAULT_COLORS;

    const sizeCanvas = React.useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return { w: 0, h: 0 };
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? canvas.clientWidth;
      const h = parent?.clientHeight ?? canvas.clientHeight;
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    }, []);

    const loop = React.useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const pieces = piecesRef.current;
      for (const p of pieces) {
        p.tick += 1;
        p.vy += gravity;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        const alpha = Math.max(0, 1 - p.tick / p.life);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.cos(p.tick * 0.1));
        ctx.restore();
      }

      piecesRef.current = pieces.filter(
        (p) => p.tick < p.life && p.y < canvas.height / dpr + 40
      );

      if (piecesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
      }
    }, [gravity]);

    const fire = React.useCallback(
      (options?: ConfettiOptions) => {
        const { w, h } = sizeCanvas();
        if (w === 0 || h === 0) return;
        const count = options?.particleCount ?? particleCount;
        const sprd = options?.spread ?? spread;
        const vel = options?.startVelocity ?? startVelocity;
        const cols = options?.colors ?? palette;
        const orig = options?.origin ?? origin;
        const ox = orig.x * w;
        const oy = orig.y * h;

        for (let i = 0; i < count; i++) {
          const dir = (-90 + (Math.random() - 0.5) * sprd) * (Math.PI / 180);
          const speed = vel * (0.5 + Math.random() * 0.5);
          piecesRef.current.push({
            x: ox,
            y: oy,
            vx: Math.cos(dir) * speed,
            vy: Math.sin(dir) * speed,
            color: cols[Math.floor(Math.random() * cols.length)] ?? "#7dd3fc",
            w: 6 + Math.random() * 6,
            h: 8 + Math.random() * 6,
            angle: Math.random() * Math.PI,
            spin: (Math.random() - 0.5) * 0.4,
            tick: 0,
            life: 90 + Math.random() * 50,
          });
        }
        if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop);
      },
      [sizeCanvas, particleCount, spread, startVelocity, palette, origin, loop]
    );

    React.useImperativeHandle(ref, () => ({ fire }), [fire]);

    React.useEffect(() => {
      sizeCanvas();
      if (autoFire) fire();
      return () => {
        if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
        {...props}
      />
    );
  }
);
Confetti.displayName = "Confetti";

export { Confetti };
