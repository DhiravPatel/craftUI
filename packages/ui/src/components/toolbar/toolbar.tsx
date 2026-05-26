"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lay the items out vertically instead of horizontally. */
  orientation?: "horizontal" | "vertical";
}

/**
 * Toolbar — a compact action bar that groups buttons, toggles, separators, and
 * groups onto a single rounded surface. Compose it from ToolbarButton,
 * ToolbarToggle (a pressable state), ToolbarSeparator, and ToolbarGroup. Pairs
 * well with rich-text editors, canvas tools, and table headers. Dependency-free
 * and matches the dark surfaces in this kit.
 */
const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ orientation = "horizontal", className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      aria-orientation={orientation}
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-white/10 bg-neutral-950 p-1 text-white",
        orientation === "vertical" && "flex-col",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Toolbar.displayName = "Toolbar";

export interface ToolbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional label rendered after the icon. */
  label?: string;
}

const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, children, label, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-lg px-2 text-sm text-white/70 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children}
      {label ? <span>{label}</span> : null}
    </button>
  )
);
ToolbarButton.displayName = "ToolbarButton";

export interface ToolbarToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Whether the toggle is pressed. */
  pressed?: boolean;
  /** Fired with the next pressed state. */
  onPressedChange?: (pressed: boolean) => void;
  /** Optional label rendered after the icon. */
  label?: string;
}

const ToolbarToggle = React.forwardRef<HTMLButtonElement, ToolbarToggleProps>(
  ({ className, children, label, pressed = false, onPressedChange, onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      data-state={pressed ? "on" : "off"}
      onClick={(e) => {
        onClick?.(e);
        onPressedChange?.(!pressed);
      }}
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-lg px-2 text-sm outline-none transition-colors focus-visible:ring-1 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-40",
        pressed
          ? "bg-sky-400/20 text-sky-300"
          : "text-white/70 hover:bg-white/10 hover:text-white",
        className
      )}
      {...props}
    >
      {children}
      {label ? <span>{label}</span> : null}
    </button>
  )
);
ToolbarToggle.displayName = "ToolbarToggle";

export interface ToolbarSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

const ToolbarSeparator = React.forwardRef<HTMLDivElement, ToolbarSeparatorProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-white/10",
        orientation === "vertical" ? "mx-1 h-5 w-px" : "my-1 h-px w-5",
        className
      )}
      {...props}
    />
  )
);
ToolbarSeparator.displayName = "ToolbarSeparator";

const ToolbarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-0.5", className)} {...props} />
));
ToolbarGroup.displayName = "ToolbarGroup";

export {
  Toolbar,
  ToolbarButton,
  ToolbarToggle,
  ToolbarSeparator,
  ToolbarGroup,
};
