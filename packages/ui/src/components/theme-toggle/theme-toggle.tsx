"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Controlled theme. */
  theme?: "light" | "dark";
  /** Initial theme for uncontrolled use. Default "light". */
  defaultTheme?: "light" | "dark";
  /** Notified when the theme toggles. */
  onChange?: (theme: "light" | "dark") => void;
  /** Button diameter in px. Default 36. */
  size?: number;
}

/**
 * ThemeToggle — a sun-to-moon morph button. The sun is a circle with eight
 * radiating rays; on the dark transition the rays retract, the disc shifts
 * left and lights up a "bite" with the moon's shadow disc, completing the
 * crescent. Pure CSS — driven by transform/opacity transitions.
 */
const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  (
    {
      theme: controlledTheme,
      defaultTheme = "light",
      onChange,
      size = 36,
      className,
      style,
      onClick,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultTheme);
    const theme = controlledTheme ?? uncontrolled;
    const isDark = theme === "dark";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      const next = isDark ? "light" : "dark";
      if (controlledTheme === undefined) setUncontrolled(next);
      onChange?.(next);
    };

    const discSize = size * 0.45;
    const rayLength = size * 0.12;
    const rayInset = (size - discSize) / 2 - rayLength - 2;

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-400/60",
          className
        )}
        style={{
          width: size,
          height: size,
          background: isDark
            ? "linear-gradient(180deg, rgb(20,28,52), rgb(8,12,28))"
            : "linear-gradient(180deg, rgb(254,243,199), rgb(252,211,77))",
          color: isDark ? "rgb(226, 232, 240)" : "rgb(202, 138, 4)",
          ...style,
        }}
        {...props}
      >
        {/* Eight sun rays — collapse into the disc when going dark */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (360 / 8) * i;
          return (
            <span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 block rounded-full bg-current"
              style={{
                width: 2,
                height: rayLength,
                marginLeft: -1,
                marginTop: -rayLength / 2,
                transformOrigin: "center",
                transform: `rotate(${angle}deg) translateY(-${
                  rayInset + (isDark ? -rayLength : 0)
                }px)`,
                opacity: isDark ? 0 : 1,
                transition:
                  "transform 380ms cubic-bezier(0.22,1,0.36,1), opacity 280ms ease",
              }}
            />
          );
        })}

        {/* Sun / moon disc. The "bite" disc above it covers the right side
            in dark mode, completing the crescent. */}
        <span
          aria-hidden
          className="relative block rounded-full bg-current"
          style={{
            width: discSize,
            height: discSize,
            transform: isDark ? "translateX(-2px)" : "translateX(0)",
            transition: "transform 380ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <span
          aria-hidden
          className="absolute block rounded-full"
          style={{
            width: discSize,
            height: discSize,
            // Sit just to the right of the disc, then in dark mode shift
            // left to "bite" out the crescent.
            top: "50%",
            left: "50%",
            marginLeft: -discSize / 2,
            marginTop: -discSize / 2,
            background: isDark
              ? "linear-gradient(180deg, rgb(20,28,52), rgb(8,12,28))"
              : "transparent",
            transform: isDark
              ? `translateX(${discSize * 0.45}px)`
              : `translateX(${discSize * 1.6}px)`,
            transition:
              "transform 420ms cubic-bezier(0.22,1,0.36,1), background 220ms ease",
          }}
        />
      </button>
    );
  }
);
ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };
