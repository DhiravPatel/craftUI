"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface SignaturePadHandle {
  /** Clear the canvas. Does not fire onClear. */
  clear: () => void;
  /** Returns the current signature as a PNG data URL, or null when empty. */
  toDataURL: () => string | null;
  /** True when nothing has been drawn yet. */
  isEmpty: () => boolean;
}

export interface SignaturePadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Canvas width in CSS pixels. Default 480. */
  width?: number;
  /** Canvas height in CSS pixels. Default 180. */
  height?: number;
  /** Stroke color. Default white. */
  penColor?: string;
  /** Stroke width in CSS pixels. Default 2.2. */
  penWidth?: number;
  /** Canvas backing color. Default "transparent". */
  backgroundColor?: string;
  /** Fires after each stroke ends with the latest dataURL + isEmpty flag. */
  onChange?: (dataUrl: string, isEmpty: boolean) => void;
  /** Fires when the Clear button is pressed. */
  onClear?: () => void;
  /** Fires when the Save button is pressed, with the PNG dataURL. */
  onSave?: (dataUrl: string) => void;
  /** Render the Clear button. Default true. */
  showClearButton?: boolean;
  /** Render the Save button. Default true. */
  showSaveButton?: boolean;
  /** Clear button label. Default "Clear". */
  clearLabel?: string;
  /** Save button label. Default "Save signature". */
  saveLabel?: string;
  /** Hint text drawn inside the empty canvas. */
  placeholder?: string;
  /** Disable all interaction. Default false. */
  disabled?: boolean;
}

const DEFAULT_WIDTH = 480;
const DEFAULT_HEIGHT = 180;
const DEFAULT_PEN_COLOR = "#fff";
const DEFAULT_PEN_WIDTH = 2.2;
const DEFAULT_BG = "transparent";

interface PointerSample {
  x: number;
  y: number;
}

/**
 * SignaturePad — a canvas-based signature capture card. Tracks mouse and
 * touch via pointer events, renders smooth strokes using midpoint quadratic
 * curves, and is DPR-aware so the signature stays crisp on retina screens.
 * The empty canvas shows a "Sign here" placeholder; a Clear button resets
 * the surface and a Save button emits the PNG dataURL. `onChange` fires
 * after each stroke ends, and the wrapper exposes an imperative ref with
 * `clear`, `toDataURL`, and `isEmpty`. Drop into contract signing flows,
 * checkout consent screens, or any document workflow.
 */
const SignaturePad = React.forwardRef<SignaturePadHandle, SignaturePadProps>(
  (
    {
      width = DEFAULT_WIDTH,
      height = DEFAULT_HEIGHT,
      penColor = DEFAULT_PEN_COLOR,
      penWidth = DEFAULT_PEN_WIDTH,
      backgroundColor = DEFAULT_BG,
      onChange,
      onClear,
      onSave,
      showClearButton = true,
      showSaveButton = true,
      clearLabel = "Clear",
      saveLabel = "Save signature",
      placeholder = "Sign here",
      disabled = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const drawingRef = React.useRef(false);
    const pointsRef = React.useRef<PointerSample[]>([]);
    const dprRef = React.useRef(1);
    const emptyRef = React.useRef(true);
    const [empty, setEmpty] = React.useState(true);

    const getContext = React.useCallback((): CanvasRenderingContext2D | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      return canvas.getContext("2d");
    }, []);

    const paintBackground = React.useCallback(
      (ctx: CanvasRenderingContext2D) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = dprRef.current || 1;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (backgroundColor === "transparent") {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.restore();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      },
      [backgroundColor]
    );

    // Set up backing store with device-pixel-ratio scaling.
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      dprRef.current = dpr;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
      paintBackground(ctx);
    }, [width, height, penColor, penWidth, paintBackground]);

    const clearCanvas = React.useCallback(() => {
      const ctx = getContext();
      if (!ctx) return;
      paintBackground(ctx);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      emptyRef.current = true;
      setEmpty(true);
    }, [getContext, paintBackground, penColor, penWidth]);

    const getDataUrl = React.useCallback((): string | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      if (emptyRef.current) return null;
      return canvas.toDataURL("image/png");
    }, []);

    React.useImperativeHandle(
      ref,
      () => ({
        clear: clearCanvas,
        toDataURL: getDataUrl,
        isEmpty: () => emptyRef.current,
      }),
      [clearCanvas, getDataUrl]
    );

    const getRelativePoint = (e: React.PointerEvent<HTMLCanvasElement>): PointerSample => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (disabled) return;
      const canvas = canvasRef.current;
      const ctx = getContext();
      if (!canvas || !ctx) return;
      e.preventDefault();
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // Some environments throw on stale pointer ids — ignore.
      }
      drawingRef.current = true;
      const point = getRelativePoint(e);
      pointsRef.current = [point];

      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      // Draw a tiny dot so taps without movement still leave a mark.
      ctx.lineTo(point.x + 0.01, point.y + 0.01);
      ctx.stroke();
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!drawingRef.current || disabled) return;
      const ctx = getContext();
      if (!ctx) return;
      e.preventDefault();
      const point = getRelativePoint(e);
      const points = pointsRef.current;
      points.push(point);

      // Smooth via midpoint quadratic curves between consecutive samples.
      const n = points.length;
      if (n < 3) return;
      const prev = points[n - 2];
      const curr = points[n - 1];
      const earlier = points[n - 3];
      if (!prev || !curr || !earlier) return;

      const midPrev = {
        x: (earlier.x + prev.x) / 2,
        y: (earlier.y + prev.y) / 2,
      };
      const midCurr = {
        x: (prev.x + curr.x) / 2,
        y: (prev.y + curr.y) / 2,
      };
      ctx.beginPath();
      ctx.moveTo(midPrev.x, midPrev.y);
      ctx.quadraticCurveTo(prev.x, prev.y, midCurr.x, midCurr.y);
      ctx.stroke();

      if (emptyRef.current) {
        emptyRef.current = false;
        setEmpty(false);
      }
    };

    const finishStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!drawingRef.current) return;
      drawingRef.current = false;
      const canvas = canvasRef.current;
      const ctx = getContext();
      if (canvas) {
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {
          // Already released — ignore.
        }
      }
      if (ctx) {
        // Flush the final segment so the tail isn't clipped.
        const points = pointsRef.current;
        if (points.length >= 2) {
          const last = points[points.length - 1];
          const prev = points[points.length - 2];
          if (last && prev) {
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(last.x, last.y);
            ctx.stroke();
          }
        }
      }
      pointsRef.current = [];

      if (!emptyRef.current && onChange) {
        const url = canvas?.toDataURL("image/png") ?? "";
        onChange(url, false);
      } else if (emptyRef.current && onChange) {
        onChange("", true);
      }
    };

    const handleClear = () => {
      if (disabled) return;
      clearCanvas();
      onClear?.();
      onChange?.("", true);
    };

    const handleSave = () => {
      if (disabled) return;
      const url = getDataUrl();
      if (url) onSave?.(url);
    };

    return (
      <div
        className={cn(
          "inline-flex w-full max-w-fit flex-col gap-3 rounded-2xl border border-white/10 bg-neutral-950 p-3 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          disabled && "opacity-60",
          className
        )}
        style={style}
        {...props}
      >
        <div
          className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900 ring-1 ring-inset ring-white/5"
          style={{ width, height }}
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Signature canvas"
            className={cn(
              "block touch-none select-none",
              disabled ? "cursor-not-allowed" : "cursor-crosshair"
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishStroke}
            onPointerLeave={(e) => {
              if (drawingRef.current) finishStroke(e);
            }}
            onPointerCancel={finishStroke}
          />
          {empty ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-1.5 text-white/30">
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="craftui-signature-pad-quill"
                  aria-hidden
                >
                  <path
                    d="M3 21h7M14.5 3.5a2.1 2.1 0 1 1 3 3L6.5 17.5 2 19l1.5-4.5L14.5 3.5z"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[11px] font-medium uppercase tracking-widest">
                  {placeholder}
                </span>
              </div>
            </div>
          ) : null}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 bottom-5 border-b border-dashed border-white/10"
          />
        </div>

        {showClearButton || showSaveButton ? (
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] text-white/40">
              {empty ? "Draw to begin" : "Looks good — save when ready"}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              {showClearButton ? (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={disabled || empty}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 text-[11px] font-medium text-white/80 transition-colors",
                    "hover:bg-white/[0.08] hover:text-white",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  )}
                >
                  <svg
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {clearLabel}
                </button>
              ) : null}
              {showSaveButton ? (
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={disabled || empty}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-md bg-sky-300 px-3 text-[11px] font-semibold text-neutral-950 transition-opacity",
                    "hover:opacity-90 active:opacity-95",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  )}
                >
                  <svg
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth={2.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {saveLabel}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        <style>{`
          @keyframes craftui-signature-pad-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          .craftui-signature-pad-quill {
            animation: craftui-signature-pad-float 2.6s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }
);
SignaturePad.displayName = "SignaturePad";

export { SignaturePad };
