"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ContextMenuOption {
  /** Row label. */
  label: string;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Optional right-aligned shortcut hint, e.g. "⌘C". */
  shortcut?: string;
  /** Click handler. The menu closes after it runs. */
  onSelect?: () => void;
  /** Dim and disable the row. */
  disabled?: boolean;
  /** Render in a red, destructive tone. */
  destructive?: boolean;
}

export type ContextMenuEntry =
  | ContextMenuOption
  | { type: "separator" }
  | { type: "label"; label: string };

export interface ContextMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Menu rows — options, separators, and section labels. */
  items: ContextMenuEntry[];
  /** The area that opens the menu on right-click. */
  children: React.ReactNode;
}

interface Point {
  x: number;
  y: number;
}

function isOption(e: ContextMenuEntry): e is ContextMenuOption {
  return !("type" in e);
}

/**
 * ContextMenu — wraps any area and opens a menu at the cursor on right-click.
 * Supports option rows (with icons, shortcuts, disabled and destructive
 * styles), separators, and section labels. Closes on selection, Escape, or an
 * outside click, and clamps itself to stay inside the viewport. Dependency-free
 * and keyboard-dismissable.
 */
const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ items, children, className, ...props }, ref) => {
    const [point, setPoint] = React.useState<Point | null>(null);
    const menuRef = React.useRef<HTMLDivElement | null>(null);

    const close = React.useCallback(() => setPoint(null), []);

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setPoint({ x: e.clientX, y: e.clientY });
    };

    // Clamp the menu inside the viewport once it has measured.
    React.useLayoutEffect(() => {
      if (!point || !menuRef.current) return;
      const el = menuRef.current;
      const { offsetWidth: w, offsetHeight: h } = el;
      const pad = 8;
      const x = Math.min(point.x, window.innerWidth - w - pad);
      const y = Math.min(point.y, window.innerHeight - h - pad);
      if (x !== point.x || y !== point.y) setPoint({ x: Math.max(pad, x), y: Math.max(pad, y) });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [point?.x, point?.y]);

    React.useEffect(() => {
      if (!point) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      const onScroll = () => close();
      window.addEventListener("keydown", onKey);
      window.addEventListener("resize", close);
      window.addEventListener("scroll", onScroll, true);
      return () => {
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", close);
        window.removeEventListener("scroll", onScroll, true);
      };
    }, [point, close]);

    return (
      <div ref={ref} onContextMenu={handleContextMenu} className={className} {...props}>
        {children}
        {point ? (
          <>
            {/* Outside-click + right-click-elsewhere catcher. */}
            <div
              className="fixed inset-0 z-40"
              onClick={close}
              onContextMenu={(e) => {
                e.preventDefault();
                close();
              }}
            />
            <div
              ref={menuRef}
              role="menu"
              className="fixed z-50 min-w-[11rem] overflow-hidden rounded-lg border border-white/10 bg-neutral-900 p-1 text-white shadow-xl shadow-black/40"
              style={{ left: point.x, top: point.y }}
            >
              {items.map((item, i) => {
                if (!isOption(item)) {
                  if (item.type === "separator")
                    return <div key={i} className="my-1 h-px bg-white/10" />;
                  return (
                    <div
                      key={i}
                      className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/35"
                    >
                      {item.label}
                    </div>
                  );
                }
                return (
                  <button
                    key={i}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={() => {
                      item.onSelect?.();
                      close();
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors",
                      item.disabled
                        ? "cursor-not-allowed opacity-40"
                        : item.destructive
                          ? "text-red-400 hover:bg-red-500/15"
                          : "text-white/85 hover:bg-white/10"
                    )}
                  >
                    {item.icon ? (
                      <span className="flex h-4 w-4 items-center justify-center">
                        {item.icon}
                      </span>
                    ) : null}
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut ? (
                      <span className="text-xs text-white/35">{item.shortcut}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    );
  }
);
ContextMenu.displayName = "ContextMenu";

export { ContextMenu };
