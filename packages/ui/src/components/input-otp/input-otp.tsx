"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface InputOTPProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "defaultValue" | "type"
  > {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
}

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      length = 6,
      value: controlled,
      defaultValue = "",
      onChange,
      onComplete,
      className,
      autoFocus,
      disabled,
      ...rest
    },
    forwardedRef
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(forwardedRef, () => inputRef.current!);

    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const isControlled = controlled !== undefined;
    const value = (isControlled ? controlled : uncontrolled).slice(0, length);

    const setValue = (next: string) => {
      const clipped = next.slice(0, length);
      if (!isControlled) setUncontrolled(clipped);
      onChange?.(clipped);
      if (clipped.length === length) onComplete?.(clipped);
    };

    const [focused, setFocused] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = event.target.value.replace(/\D/g, "");
      setValue(sanitized);
    };

    const focusIndex = Math.min(value.length, length - 1);
    const cells = Array.from({ length }, (_, i) => i);

    return (
      <div
        className={cn(
          "relative inline-flex items-center gap-2",
          disabled && "opacity-50",
          className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          maxLength={length}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          autoFocus={autoFocus}
          className="absolute inset-0 z-10 h-full w-full opacity-0"
          aria-label="One-time password"
          {...rest}
        />
        {cells.map((i) => {
          const char = value[i] ?? "";
          const isActive = focused && i === focusIndex;
          const isFilled = !!char;
          return (
            <div
              key={i}
              className={cn(
                "relative flex h-11 w-10 items-center justify-center rounded-md border bg-background text-base font-medium shadow-sm transition-all",
                isActive && "border-foreground/40 ring-2 ring-ring/30",
                isFilled && !isActive && "border-foreground/20"
              )}
            >
              {char || ""}
              {isActive && !isFilled ? (
                <span className="pointer-events-none absolute h-5 w-px animate-pulse bg-foreground/70" />
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
);
InputOTP.displayName = "InputOTP";

export { InputOTP };
