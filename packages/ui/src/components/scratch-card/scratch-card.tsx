"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ScratchCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onComplete"> {
  /** Card width in px. Default 280. */
  width?: number;
  /** Card height in px. Default 160. */
  height?: number;
  /** Brush radius in px. Default 26. */
  brushSize?: number;
  /** Two-stop gradient for the scratch-off foil. */
  coverColors?: [string, string];
  /** Hint text drawn on the foil. */
  coverLabel?: string;
  /** Fraction (0–1) scratched before it auto-clears + fires onComplete. Default 0.55. */
  revealThreshold?: number;
  /** Fired once the threshold is crossed. */
  onComplete?: () => void;
  /** The prize revealed underneath. */
  children: React.ReactNode;
}

/**
 * ScratchCard — a scratch-off foil over a hidden reward. Drag across it (mouse
 * or touch) to erase the coating; once enough is cleared it auto-reveals the
 * rest and fires `onComplete`. Great for promos, coupon codes, gamified
 * onboarding, and reward reveals. Renders the prize as children, paints the
 * foil on a canvas, and is dependency-free.
 */
const ScratchCard = React.forwardRef<HTMLDivElement, ScratchCardProps>(
  (
    {
      width = 280,
      height = 160,
      brushSize = 26,
      coverColors = ["#3f3f46", "#18181b"],
      coverLabel = "Scratch here",
      revealThreshold = 0.55,
      onComplete,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const drawing = React.useRef(false);
    const sampleTick = React.useRef(0);
    const [done, setDone] = React.useState(false);
    const doneRef = React.useRef(false);

    const paintCover = React.useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, coverColors[0]);
      grad.addColorStop(1, coverColors[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "600 14px ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(coverLabel, width / 2, height / 2);
    }, [width, height, coverColors, coverLabel]);

    React.useEffect(() => {
      paintCover();
      doneRef.current = false;
      setDone(false);
    }, [paintCover]);

    const erase = (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();

      // Sample the cleared fraction every few moves.
      sampleTick.current += 1;
      if (sampleTick.current % 6 !== 0 || doneRef.current) return;
      const { width: cw, height: ch } = canvas;
      const data = ctx.getImageData(0, 0, cw, ch).data;
      let clear = 0;
      const step = 16; // every 4th pixel (RGBA)
      let total = 0;
      for (let i = 3; i < data.length; i += step) {
        total += 1;
        if (data[i] === 0) clear += 1;
      }
      if (total > 0 && clear / total >= revealThreshold) {
        doneRef.current = true;
        setDone(true);
        onComplete?.();
      }
    };

    return (
      <div
        ref={ref}
        className={cn("relative select-none overflow-hidden rounded-xl", className)}
        style={{ width, height }}
        {...props}
      >
        <div className="absolute inset-0 grid place-items-center bg-neutral-950 text-white">
          {children}
        </div>
        <canvas
          ref={canvasRef}
          style={{ width, height }}
          className={cn(
            "absolute inset-0 cursor-grab touch-none active:cursor-grabbing",
            done && "pointer-events-none opacity-0 transition-opacity duration-500"
          )}
          onPointerDown={(e) => {
            drawing.current = true;
            (e.target as Element).setPointerCapture?.(e.pointerId);
            erase(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (drawing.current) erase(e.clientX, e.clientY);
          }}
          onPointerUp={() => {
            drawing.current = false;
          }}
          onPointerLeave={() => {
            drawing.current = false;
          }}
        />
      </div>
    );
  }
);
ScratchCard.displayName = "ScratchCard";

export { ScratchCard };
