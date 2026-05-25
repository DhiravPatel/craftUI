"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled hex color, e.g. "#7dd3fc". */
  value?: string;
  /** Initial hex when uncontrolled. Default "#7dd3fc". */
  defaultValue?: string;
  /** Fired with the next hex string whenever the color changes. */
  onChange?: (hex: string) => void;
  /** Preset swatches shown below the picker. */
  swatches?: string[];
  /** Hide the hex text field. Default false. */
  hideInput?: boolean;
}

const DEFAULT_SWATCHES = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#7dd3fc",
  "#8b5cf6",
  "#ec4899",
  "#f8fafc",
];

interface HSV {
  h: number; // 0-360
  s: number; // 0-1
  v: number; // 0-1
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function hsvToRgb({ h, s, v }: HSV) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

function hexToHsv(hex: string): HSV | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1]!, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

function hsvToHex(hsv: HSV) {
  const { r, g, b } = hsvToRgb(hsv);
  return rgbToHex(r, g, b);
}

/**
 * ColorPicker — an HSV color picker with a saturation/value square, a hue
 * slider, a live preview, an editable hex field, and preset swatches. Drag
 * inside the square or along the hue bar (mouse or touch) to dial in a color;
 * the component emits a hex string. Works controlled or uncontrolled and ships
 * with no dependencies.
 */
const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      defaultValue = "#7dd3fc",
      onChange,
      swatches = DEFAULT_SWATCHES,
      hideInput = false,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [hsv, setHsv] = React.useState<HSV>(
      () => hexToHsv((isControlled ? value : defaultValue) ?? "#7dd3fc") ?? { h: 199, s: 0.5, v: 0.99 }
    );
    // Keep a free-text hex draft so users can type partial values.
    const [hexDraft, setHexDraft] = React.useState<string | null>(null);

    const hex = hsvToHex(hsv);

    // Sync from a controlled value when it changes externally.
    React.useEffect(() => {
      if (!isControlled) return;
      const parsed = hexToHsv(value!);
      if (parsed && hsvToHex(parsed) !== hex) setHsv(parsed);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const emit = React.useCallback(
      (next: HSV) => {
        setHsv(next);
        onChange?.(hsvToHex(next));
      },
      [onChange]
    );

    const squareRef = React.useRef<HTMLDivElement | null>(null);
    const hueRef = React.useRef<HTMLDivElement | null>(null);

    const handleSquare = React.useCallback(
      (clientX: number, clientY: number) => {
        const el = squareRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const s = clamp01((clientX - rect.left) / rect.width);
        const v = clamp01(1 - (clientY - rect.top) / rect.height);
        emit({ h: hsv.h, s, v });
      },
      [emit, hsv.h]
    );

    const handleHue = React.useCallback(
      (clientX: number) => {
        const el = hueRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const h = clamp01((clientX - rect.left) / rect.width) * 360;
        emit({ ...hsv, h });
      },
      [emit, hsv]
    );

    const makeDragHandler =
      (move: (x: number, y: number) => void) =>
      (e: React.PointerEvent) => {
        e.preventDefault();
        (e.target as Element).setPointerCapture?.(e.pointerId);
        move(e.clientX, e.clientY);
        const onMove = (ev: PointerEvent) => move(ev.clientX, ev.clientY);
        const onUp = () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
        };
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      };

    const hueColor = hsvToHex({ h: hsv.h, s: 1, v: 1 });

    return (
      <div
        ref={ref}
        className={cn(
          "w-60 select-none rounded-xl border border-white/10 bg-neutral-950 p-3 text-white",
          className
        )}
        {...props}
      >
        {/* Saturation / value square */}
        <div
          ref={squareRef}
          onPointerDown={makeDragHandler(handleSquare)}
          className="relative h-36 w-full cursor-crosshair touch-none overflow-hidden rounded-lg"
          style={{ backgroundColor: hueColor }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000, transparent)" }} />
          <span
            className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
            style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, backgroundColor: hex }}
          />
        </div>

        {/* Hue slider */}
        <div
          ref={hueRef}
          onPointerDown={makeDragHandler((x) => handleHue(x))}
          className="relative mt-3 h-3 w-full cursor-pointer touch-none rounded-full"
          style={{
            background:
              "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          }}
        >
          <span
            className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
            style={{ left: `${(hsv.h / 360) * 100}%`, backgroundColor: hueColor }}
          />
        </div>

        {/* Preview + hex input */}
        {!hideInput ? (
          <div className="mt-3 flex items-center gap-2">
            <span
              className="h-7 w-7 shrink-0 rounded-md border border-white/15"
              style={{ backgroundColor: hex }}
            />
            <input
              value={hexDraft ?? hex}
              onChange={(e) => {
                const v = e.target.value;
                setHexDraft(v);
                const parsed = hexToHsv(v);
                if (parsed) emit(parsed);
              }}
              onBlur={() => setHexDraft(null)}
              spellCheck={false}
              className="h-7 w-full rounded-md border border-white/10 bg-white/[0.04] px-2 font-mono text-xs uppercase outline-none focus:border-white/30"
            />
          </div>
        ) : null}

        {/* Swatches */}
        {swatches.length ? (
          <div className="mt-3 grid grid-cols-10 gap-1.5">
            {swatches.map((sw) => (
              <button
                key={sw}
                type="button"
                aria-label={sw}
                onClick={() => {
                  const parsed = hexToHsv(sw);
                  if (parsed) emit(parsed);
                }}
                className={cn(
                  "h-4 w-4 rounded-full border border-white/15 transition-transform hover:scale-110",
                  hex.toLowerCase() === sw.toLowerCase() && "ring-2 ring-white ring-offset-1 ring-offset-neutral-950"
                )}
                style={{ backgroundColor: sw }}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
