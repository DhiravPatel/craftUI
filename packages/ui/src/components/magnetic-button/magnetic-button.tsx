"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** How strongly the inner content tracks the cursor. 0..1. Default 0.4. */
  strength?: number;
  /** Maximum displacement in px the inner content can move. Default 18. */
  maxOffset?: number;
  /** Optional decorative glow that follows the cursor inside the button. */
  glow?: boolean;
}

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      strength = 0.4,
      maxOffset = 18,
      glow = true,
      className,
      style,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLSpanElement | null>(null);
    const glowRef = React.useRef<HTMLSpanElement | null>(null);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref]
    );

    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(e);
      const node = buttonRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      const clamp = (v: number) =>
        Math.max(-maxOffset, Math.min(maxOffset, v));
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${clamp(dx)}px, ${clamp(
          dy
        )}px, 0)`;
      }
      if (glowRef.current) {
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        glowRef.current.style.background = `radial-gradient(140px circle at ${localX}px ${localY}px, rgba(255,255,255,0.35), transparent 60%)`;
        glowRef.current.style.opacity = "1";
      }
    };

    const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(e);
      if (innerRef.current) {
        innerRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
      }
    };

    return (
      <button
        ref={setRefs}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-900 px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-14px_rgba(0,0,0,0.55)] transition-shadow hover:shadow-[0_22px_44px_-12px_rgba(0,0,0,0.7)]",
          className
        )}
        style={style}
        {...props}
      >
        {glow ? (
          <span
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
          />
        ) : null}
        <span
          ref={innerRef}
          className="relative z-10 inline-flex items-center gap-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          {children}
        </span>
      </button>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

export { MagneticButton };
