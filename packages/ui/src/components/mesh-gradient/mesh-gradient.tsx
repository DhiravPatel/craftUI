"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface MeshGradientBlob {
  /** Color of the blob. Any CSS color. */
  color: string;
  /** Horizontal position (0–100). */
  x?: number;
  /** Vertical position (0–100). */
  y?: number;
  /** Size of the blob as a percentage of the smaller axis (default 60). */
  size?: number;
  /** Independent animation duration in seconds (default 18). */
  duration?: number;
  /** Drift radius (% of the container) the blob moves through. Default 12. */
  drift?: number;
}

export interface MeshGradientProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Override the default blob palette. */
  blobs?: MeshGradientBlob[];
  /** Background color painted under the mesh. Default neutral-950. */
  background?: string;
  /** Strength of the Gaussian blur in px. Default 90. */
  blur?: number;
  /** Grain noise overlay opacity (0–1). Default 0.08. */
  grain?: number;
  /** Border radius of the surface. Default 0 (no rounding). */
  radius?: number;
  /** Render an inner border for a glass-like edge. Default true. */
  border?: boolean;
  /** Content rendered on top of the gradient. */
  children?: React.ReactNode;
}

const DEFAULT_BLOBS: MeshGradientBlob[] = [
  { color: "rgb(125, 211, 252)", x: 18, y: 28, size: 70, duration: 22, drift: 14 },
  { color: "rgb(168, 85, 247)", x: 78, y: 22, size: 60, duration: 26, drift: 12 },
  { color: "rgb(244, 114, 182)", x: 30, y: 78, size: 55, duration: 24, drift: 16 },
  { color: "rgb(45, 212, 191)", x: 80, y: 72, size: 50, duration: 28, drift: 10 },
];

/**
 * MeshGradient — a Stripe / Linear-style animated mesh-gradient backdrop.
 * Renders 3–6 softly drifting, heavily blurred color blobs over a dark
 * canvas, plus a subtle grain overlay for that "WebGL mesh" feel without
 * any WebGL. Pure CSS — each blob is a `radial-gradient` div translated by
 * its own keyframe loop with an independent period, so motion never loops
 * on a beat. Pass `children` to layer hero copy on top.
 */
const MeshGradient = React.forwardRef<HTMLDivElement, MeshGradientProps>(
  (
    {
      blobs = DEFAULT_BLOBS,
      background = "rgb(10, 10, 10)",
      blur = 90,
      grain = 0.08,
      radius = 0,
      border = true,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Unique-ish suffix per render so keyframes don't collide if multiple
    // instances live on the same page. Derived from blob count + colors —
    // deterministic so SSR and client match.
    const idSuffix = React.useMemo(() => {
      const seed = blobs.map((b) => `${b.color}${b.x}${b.y}`).join("|");
      let hash = 0;
      for (let i = 0; i < seed.length; i++)
        hash = (hash * 31 + seed.charCodeAt(i)) | 0;
      return Math.abs(hash).toString(36).slice(0, 6);
    }, [blobs]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative isolate overflow-hidden",
          border ? "ring-1 ring-inset ring-white/10" : "",
          className
        )}
        style={{
          background,
          borderRadius: radius,
          ...style,
        }}
        {...props}
      >
        {/* Mesh layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ filter: `blur(${blur}px) saturate(140%)` }}
        >
          {blobs.map((b, i) => {
            const size = b.size ?? 60;
            const x = b.x ?? 50;
            const y = b.y ?? 50;
            const drift = b.drift ?? 12;
            const duration = b.duration ?? 18;
            const animName = `craftui-mesh-${idSuffix}-${i}`;
            return (
              <span
                key={i}
                className="absolute block"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}%`,
                  height: `${size}%`,
                  transform: "translate(-50%, -50%)",
                  background: `radial-gradient(closest-side, ${b.color}, ${b.color}00 70%)`,
                  animation: `${animName} ${duration}s ease-in-out ${(i % 3) * -3}s infinite alternate`,
                  willChange: "transform",
                }}
              />
            );
          })}
        </div>

        {/* Grain overlay */}
        {grain > 0 ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              opacity: grain,
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundSize: "160px 160px",
            }}
          />
        ) : null}

        {/* Children */}
        {children ? <div className="relative z-10">{children}</div> : null}

        <style>{`
          ${blobs
            .map((b, i) => {
              const drift = b.drift ?? 12;
              const ax = ((i * 53) % 100) / 100;
              const ay = ((i * 71) % 100) / 100;
              const dx1 = (drift * (ax - 0.5) * 2).toFixed(2);
              const dy1 = (drift * (ay - 0.5) * 2).toFixed(2);
              const dx2 = (-drift * (1 - ax - 0.5) * 2).toFixed(2);
              const dy2 = (drift * (1 - ay - 0.5) * 2).toFixed(2);
              return `
                @keyframes craftui-mesh-${idSuffix}-${i} {
                  0% { transform: translate(calc(-50% + ${dx1}%), calc(-50% + ${dy1}%)) scale(1); }
                  50% { transform: translate(calc(-50% + ${dx2}%), calc(-50% + ${dy2}%)) scale(1.12); }
                  100% { transform: translate(calc(-50% + ${dx1}%), calc(-50% + ${dy1}%)) scale(1); }
                }
              `;
            })
            .join("\n")}
        `}</style>
      </div>
    );
  }
);
MeshGradient.displayName = "MeshGradient";

export { MeshGradient };
