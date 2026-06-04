"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Backdrop blur strength in px. Default 22. */
  blur?: number;
  /** Surface tint color — usually a translucent white. */
  tint?: string;
  /** Color of the gradient ring around the edge. */
  ringColor?: string;
  /** Border radius in px. Default 20. */
  radius?: number;
  /** Render a soft animated highlight that sweeps once on mount. Default true. */
  sheen?: boolean;
  /** Render an interactive 3D tilt on hover. Default false. */
  interactive?: boolean;
}

/**
 * GlassCard — a frosted-glass surface with a refracted edge. Built from a
 * backdrop-blurred translucent fill, a CSS mask-stenciled gradient border
 * (so the rim catches light like real glass), and a soft sheen that
 * sweeps across once on mount. Drop content in as `children`; works best
 * over a colored or gradient backdrop (pair with MeshGradient or any
 * busy image).
 */
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      blur = 22,
      tint = "rgba(255, 255, 255, 0.06)",
      ringColor = "rgba(255, 255, 255, 0.18)",
      radius = 20,
      sheen = true,
      interactive = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const [tilt, setTilt] = React.useState<{ rx: number; ry: number }>({
      rx: 0,
      ry: 0,
    });

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !wrapperRef.current) return;
      const r = wrapperRef.current.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ rx: -y * 6, ry: x * 8 });
    };
    const handleLeave = () => {
      if (interactive) setTilt({ rx: 0, ry: 0 });
    };

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "group/glass relative overflow-hidden",
          interactive ? "transition-transform duration-200 ease-out" : "",
          className
        )}
        style={{
          borderRadius: radius,
          background: tint,
          backdropFilter: `blur(${blur}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
          boxShadow:
            "0 30px 60px -30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          transform: interactive
            ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            : undefined,
          ...style,
        }}
        {...props}
      >
        {/* Gradient ring (uses a masked border so it looks refracted) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: radius,
            padding: 1,
            background: `linear-gradient(135deg, ${ringColor} 0%, transparent 35%, transparent 65%, ${ringColor} 100%)`,
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Sheen sweep on mount */}
        {sheen ? (
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/3 rotate-12"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
              animation:
                "craftui-glass-sheen 1.2s cubic-bezier(0.22,1,0.36,1) 200ms both",
            }}
          />
        ) : null}

        {/* Content */}
        <div className="relative">{children}</div>

        <style>{`
          @keyframes craftui-glass-sheen {
            from { transform: translateX(0) rotate(12deg); opacity: 0; }
            20% { opacity: 1; }
            to { transform: translateX(420%) rotate(12deg); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
