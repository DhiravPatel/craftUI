"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface EvervaultCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Characters to fill the background grid. Default hex digits. */
  charSet?: string;
  /** Number of characters to render in the background. Default 800. */
  charCount?: number;
  /** Single color for the cursor gradient. Used when `colors` is not provided. */
  cursorColor?: string;
  /** Multi-stop colors for the cursor gradient. Overrides `cursorColor`.
   *  Default = cyan → violet → pink. */
  colors?: string[];
  /** Show a rotating animated gradient border around the card. Default true. */
  animatedBorder?: boolean;
  /** Border thickness when `animatedBorder` is true. Default 1.5. */
  borderWidth?: number;
  /** Animated border spin duration in seconds. Default 5. */
  borderDuration?: number;
  /** Border radius in px. Default 16. */
  radius?: number;
}

const DEFAULT_COLORS = [
  "rgb(34, 211, 238)", // cyan-400
  "rgb(168, 85, 247)", // violet-500
  "rgb(236, 72, 153)", // pink-500
];

const EvervaultCard = React.forwardRef<HTMLDivElement, EvervaultCardProps>(
  (
    {
      charSet = "0123456789ABCDEF",
      charCount = 800,
      cursorColor,
      colors,
      animatedBorder = true,
      borderWidth = 1.5,
      borderDuration = 5,
      radius = 16,
      className,
      children,
      style,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLDivElement
    );
    const [pos, setPos] = React.useState({ x: 50, y: 50, active: false });

    // Resolve color palette: explicit `colors` wins; else build a 3-stop
    // palette around `cursorColor`; else use the default cyan/violet/pink.
    const palette = React.useMemo(() => {
      if (colors && colors.length > 0) return colors;
      if (cursorColor) return [cursorColor, "rgb(168, 85, 247)", "rgb(236, 72, 153)"];
      return DEFAULT_COLORS;
    }, [colors, cursorColor]);

    // Build the cursor gradient as a multi-stop radial gradient.
    const cursorGradient = React.useMemo(() => {
      const stops = palette
        .map((c, i) => {
          const pct = (i / Math.max(1, palette.length - 1)) * 55;
          return `${c} ${pct}%`;
        })
        .join(", ");
      return `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${stops}, transparent 75%)`;
    }, [palette, pos.x, pos.y]);

    // Conic gradient for the rotating border. Closes the loop by repeating
    // the first color so there's no visible seam.
    const borderGradient = React.useMemo(() => {
      const stops = [...palette, palette[0]].join(", ");
      return `conic-gradient(from 0deg, ${stops})`;
    }, [palette]);

    // Generate a stable list of random characters once.
    const chars = React.useMemo(() => {
      const out: string[] = [];
      for (let i = 0; i < charCount; i++) {
        out.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
      }
      return out;
    }, [charSet, charCount]);

    const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(event);
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
        active: true,
      });
    };
    const handleEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(event);
      setPos((p) => ({ ...p, active: true }));
    };
    const handleLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event);
      setPos((p) => ({ ...p, active: false }));
    };

    const innerRadius = Math.max(0, radius - borderWidth);

    return (
      <div
        ref={innerRef}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn("group relative isolate overflow-hidden", className)}
        style={{
          padding: animatedBorder ? borderWidth : 0,
          borderRadius: radius,
          ...style,
        }}
        {...props}
      >
        {/* Rotating gradient border (only when animatedBorder is on) */}
        {animatedBorder ? (
          <span
            aria-hidden
            className="animate-spin pointer-events-none absolute inset-[-200%]"
            style={{
              background: borderGradient,
              animationDuration: `${borderDuration}s`,
            }}
          />
        ) : null}

        {/* Inner card surface */}
        <div
          className={cn(
            "relative h-full w-full overflow-hidden bg-card text-card-foreground",
            !animatedBorder && "border border-border/60"
          )}
          style={{ borderRadius: innerRadius }}
        >
          {/* Random character grid (decorative; brightens on hover) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden font-mono text-[8px] leading-[10px] transition-[opacity,color] duration-300"
            style={{
              opacity: pos.active ? 1 : 0.35,
              color: pos.active
                ? "hsl(var(--foreground) / 0.4)"
                : "hsl(var(--foreground) / 0.18)",
            }}
          >
            <div className="flex h-full w-full flex-wrap content-start gap-x-[3px] break-all p-2">
              {chars.map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
          </div>

          {/* Cursor-tracked multi-color gradient */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              opacity: pos.active ? 1 : 0,
              background: cursorGradient,
              mixBlendMode: "screen",
            }}
          />

          {/* Soft halo behind the cursor — extra glow for the colored area */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              opacity: pos.active ? 0.45 : 0,
              background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${palette[0]}, transparent 50%)`,
              filter: "blur(40px)",
              mixBlendMode: "screen",
            }}
          />

          {/* Content */}
          <div className="relative z-20 flex h-full w-full items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    );
  }
);
EvervaultCard.displayName = "EvervaultCard";

export { EvervaultCard };
