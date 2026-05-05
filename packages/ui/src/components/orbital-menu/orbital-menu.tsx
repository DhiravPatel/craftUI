"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface OrbitalMenuItem {
  id: string | number;
  /** Icon or short content rendered inside the satellite button. */
  icon: React.ReactNode;
  /** Tooltip / aria-label for the satellite. */
  label?: string;
  onClick?: () => void;
}

export interface OrbitalMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: OrbitalMenuItem[];
  /** Distance of satellite buttons from the center, in px. Default 92. */
  radius?: number;
  /** Total arc the satellites span, in degrees. Default 180 (half circle). */
  arc?: number;
  /** Center of the arc, in degrees (0 = right, 90 = down, 180 = left, 270 = up). Default 270 (upward). */
  centerAngle?: number;
  /** Size of the center FAB in px. Default 56. */
  size?: number;
  /** Size of each satellite button in px. Default 44. */
  satelliteSize?: number;
  /** Stagger between satellites on open/close, in seconds. Default 0.04. */
  stagger?: number;
  /** Element rendered inside the center button when closed. */
  trigger?: React.ReactNode;
  /** Element rendered inside the center button when open. Defaults to a rotated trigger. */
  triggerOpen?: React.ReactNode;
  /** Force open state from outside. */
  open?: boolean;
  /** Notified when the open state changes. */
  onOpenChange?: (open: boolean) => void;
}

/**
 * OrbitalMenu — a center FAB that fans out a set of satellite buttons along
 * an arc when toggled. Pure CSS transitions; works without JS animation libs.
 *
 * Common arrangements:
 *   - quarter arc (arc=90, centerAngle=315) sweeping up-right
 *   - half arc (arc=180, centerAngle=270) blooming straight up
 *   - full circle (arc=300, centerAngle=270) for radial menus
 */
const OrbitalMenu = React.forwardRef<HTMLDivElement, OrbitalMenuProps>(
  (
    {
      items,
      radius = 92,
      arc = 180,
      centerAngle = 270,
      size = 56,
      satelliteSize = 44,
      stagger = 0.04,
      trigger,
      triggerOpen,
      open: controlledOpen,
      onOpenChange,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(false);
    const open = controlledOpen ?? uncontrolled;

    const setOpen = (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    };

    const stage = Math.max(radius * 2 + satelliteSize, size + 8);

    const angles = React.useMemo(() => {
      if (items.length === 0) return [];
      // Distribute items evenly across the arc, centered on `centerAngle`.
      // For a single item, place it exactly at centerAngle.
      const startAngle = centerAngle - arc / 2;
      const step = items.length === 1 ? 0 : arc / (items.length - 1);
      return items.map((_, i) => startAngle + step * i);
    }, [items, arc, centerAngle]);

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        style={{ width: stage, height: stage, ...style }}
        {...props}
      >
        {/* Satellites, absolutely centered. Their open transform pushes them
            out along the precomputed angle. */}
        {items.map((item, i) => {
          const angle = angles[i]!;
          const rad = (angle * Math.PI) / 180;
          const dx = Math.cos(rad) * radius;
          const dy = Math.sin(rad) * radius;
          const delay = open ? i * stagger : (items.length - 1 - i) * stagger;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              title={item.label}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              tabIndex={open ? 0 : -1}
              className="absolute left-1/2 top-1/2 inline-flex items-center justify-center rounded-full border border-white/15 bg-neutral-900 text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.55)] outline-none transition-shadow hover:shadow-[0_18px_36px_-10px_rgba(0,0,0,0.7)] focus-visible:ring-2 focus-visible:ring-sky-400/60"
              style={{
                width: satelliteSize,
                height: satelliteSize,
                marginLeft: -satelliteSize / 2,
                marginTop: -satelliteSize / 2,
                transform: open
                  ? `translate(${dx}px, ${dy}px) scale(1)`
                  : "translate(0, 0) scale(0.4)",
                opacity: open ? 1 : 0,
                pointerEvents: open ? "auto" : "none",
                transition: `transform 360ms cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 220ms ease ${delay}s`,
              }}
            >
              {item.icon}
            </button>
          );
        })}

        {/* Center FAB. Sits on top of everything. */}
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="absolute left-1/2 top-1/2 inline-flex items-center justify-center rounded-full bg-foreground text-background shadow-[0_18px_36px_-10px_rgba(0,0,0,0.55)] outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-sky-400/60"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
        >
          <span
            className="inline-flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: open ? "rotate(135deg)" : "rotate(0deg)" }}
          >
            {open ? (triggerOpen ?? trigger) : trigger}
          </span>
        </button>
      </div>
    );
  }
);
OrbitalMenu.displayName = "OrbitalMenu";

export { OrbitalMenu };
