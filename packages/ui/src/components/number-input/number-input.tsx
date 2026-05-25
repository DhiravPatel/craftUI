"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type" | "min" | "max" | "step"
  > {
  /** Controlled value. Use null for an empty field. */
  value?: number | null;
  /** Initial value when uncontrolled. */
  defaultValue?: number;
  /** Fired with the parsed number (or null when cleared). */
  onChange?: (value: number | null) => void;
  /** Minimum allowed value. Clamped on blur and via the steppers. */
  min?: number;
  /** Maximum allowed value. */
  max?: number;
  /** Amount added / removed per step. Default 1. */
  step?: number;
  /** Decimal places to round to. Default derived from `step`. */
  precision?: number;
  /** Text shown before the number, e.g. "$". */
  prefix?: string;
  /** Text shown after the number, e.g. "kg", "%". */
  suffix?: string;
  /** Error state styling. */
  error?: boolean;
  disabled?: boolean;
}

/** Count decimals in a step like 0.01 so rounding matches the increment. */
function decimalsOf(n: number) {
  const s = String(n);
  const i = s.indexOf(".");
  return i === -1 ? 0 : s.length - i - 1;
}

function ChevronUp() {
  return (
    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * NumberInput — a numeric field with increment / decrement steppers. Holding a
 * stepper repeats with acceleration; ArrowUp / ArrowDown nudge by `step` (×10
 * with Shift); values are clamped to [min, max] and rounded to `precision` on
 * blur. Optional prefix / suffix for currency or units. Controlled or not.
 */
const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      precision,
      prefix,
      suffix,
      error,
      disabled,
      className,
      onBlur,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<number | null>(
      defaultValue ?? null
    );
    const current = isControlled ? value! : internal;
    const [text, setText] = React.useState(current == null ? "" : String(current));

    const places = precision ?? decimalsOf(step);
    const round = React.useCallback(
      (n: number) => {
        const f = Math.pow(10, places);
        return Math.round(n * f) / f;
      },
      [places]
    );
    const clamp = React.useCallback(
      (n: number) => {
        let r = n;
        if (min != null) r = Math.max(min, r);
        if (max != null) r = Math.min(max, r);
        return r;
      },
      [min, max]
    );

    // Re-sync the visible text when the value is changed from outside, but not
    // while the user is mid-edit on an equal value.
    React.useEffect(() => {
      const parsed = text.trim() === "" ? null : Number(text);
      if (parsed !== current) setText(current == null ? "" : String(current));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    const setValue = React.useCallback(
      (n: number | null) => {
        if (!isControlled) setInternal(n);
        onChange?.(n);
      },
      [isControlled, onChange]
    );

    const nudge = React.useCallback(
      (dir: 1 | -1, mult = 1) => {
        const base = current ?? min ?? 0;
        const next = round(clamp(base + dir * step * mult));
        setValue(next);
        setText(String(next));
      },
      [current, min, step, round, clamp, setValue]
    );

    // Hold-to-repeat with acceleration.
    const repeat = React.useRef<{ timer: number; delay: number } | null>(null);
    const stopRepeat = React.useCallback(() => {
      if (repeat.current) {
        window.clearTimeout(repeat.current.timer);
        repeat.current = null;
      }
    }, []);
    const startRepeat = React.useCallback(
      (dir: 1 | -1) => {
        if (disabled) return;
        nudge(dir);
        const tick = () => {
          nudge(dir);
          const delay = Math.max(40, (repeat.current?.delay ?? 300) * 0.82);
          repeat.current = { delay, timer: window.setTimeout(tick, delay) };
        };
        repeat.current = { delay: 300, timer: window.setTimeout(tick, 380) };
      },
      [disabled, nudge]
    );
    React.useEffect(() => stopRepeat, [stopRepeat]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw !== "" && !/^-?\d*\.?\d*$/.test(raw)) return;
      setText(raw);
      const n = raw.trim() === "" || raw === "-" ? null : Number(raw);
      if (n === null || Number.isFinite(n)) setValue(n);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      if (text.trim() === "" || text === "-") {
        setText(current == null ? "" : String(current));
        return;
      }
      const n = round(clamp(Number(text)));
      setValue(n);
      setText(String(n));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        nudge(1, e.shiftKey ? 10 : 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        nudge(-1, e.shiftKey ? 10 : 1);
      }
    };

    const reachedMax = max != null && current != null && current >= max;
    const reachedMin = min != null && current != null && current <= min;

    return (
      <div
        className={cn(
          "inline-flex h-9 w-full items-center rounded-md border border-input bg-background pl-3 text-sm shadow-sm transition-colors focus-within:border-foreground/40 focus-within:ring-2 focus-within:ring-ring/30",
          error && "border-destructive focus-within:ring-destructive",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {prefix ? (
          <span className="pointer-events-none mr-1 select-none text-muted-foreground">
            {prefix}
          </span>
        ) : null}
        <input
          ref={ref}
          inputMode="decimal"
          value={text}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="h-full w-full min-w-0 bg-transparent tabular-nums outline-none placeholder:text-muted-foreground/70 disabled:cursor-not-allowed"
          {...props}
        />
        {suffix ? (
          <span className="pointer-events-none select-none px-1 text-muted-foreground">
            {suffix}
          </span>
        ) : null}
        <div className="flex h-full flex-col border-l border-input">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Increment"
            disabled={disabled || reachedMax}
            onPointerDown={(e) => {
              e.preventDefault();
              startRepeat(1);
            }}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            className="flex flex-1 items-center justify-center rounded-tr-md px-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronUp />
          </button>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Decrement"
            disabled={disabled || reachedMin}
            onPointerDown={(e) => {
              e.preventDefault();
              startRepeat(-1);
            }}
            onPointerUp={stopRepeat}
            onPointerLeave={stopRepeat}
            className="flex flex-1 items-center justify-center rounded-br-md border-t border-input px-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronDown />
          </button>
        </div>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
