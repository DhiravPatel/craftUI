"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface FloatingDockItem {
  /** Icon node rendered inside the dock tile. */
  icon: React.ReactNode;
  /** Tooltip label shown above the tile. */
  label?: string;
  /** Optional href — turns the tile into an anchor. */
  href?: string;
  /** Click handler. Used when no href is provided. */
  onClick?: () => void;
}

export interface FloatingDockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onMouseLeave" | "onMouseMove"> {
  items: FloatingDockItem[];
  /** Resting tile size in px. Default 44. */
  baseSize?: number;
  /** Maximum hover size in px. Default 68. */
  magnifySize?: number;
  /** Magnify radius — distance in px from cursor where influence falls off. Default 110. */
  range?: number;
}

const FloatingDock = React.forwardRef<HTMLDivElement, FloatingDockProps>(
  (
    {
      items,
      baseSize = 44,
      magnifySize = 68,
      range = 110,
      className,
      ...props
    },
    ref
  ) => {
    const [pointer, setPointer] = React.useState<number | null>(null);
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-end gap-2 rounded-2xl border border-border/60 bg-background/85 p-3 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl",
          className
        )}
        onMouseMove={(e) => setPointer(e.clientX)}
        onMouseLeave={() => setPointer(null)}
        {...props}
      >
        {items.map((item, i) => (
          <DockTile
            key={i}
            item={item}
            cursorX={pointer}
            baseSize={baseSize}
            magnifySize={magnifySize}
            range={range}
          />
        ))}
      </div>
    );
  }
);
FloatingDock.displayName = "FloatingDock";

interface DockTileProps {
  item: FloatingDockItem;
  cursorX: number | null;
  baseSize: number;
  magnifySize: number;
  range: number;
}

function DockTile({
  item,
  cursorX,
  baseSize,
  magnifySize,
  range,
}: DockTileProps) {
  const tileRef = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState(baseSize);

  React.useEffect(() => {
    const el = tileRef.current;
    if (!el) {
      setSize(baseSize);
      return;
    }
    if (cursorX === null) {
      setSize(baseSize);
      return;
    }
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const distance = Math.abs(cursorX - center);
    if (distance > range) {
      setSize(baseSize);
      return;
    }
    // Cosine falloff for smoother magnification.
    const t = 0.5 + Math.cos((distance / range) * Math.PI) * 0.5;
    setSize(baseSize + (magnifySize - baseSize) * t);
  }, [cursorX, baseSize, magnifySize, range]);

  const tile = (
    <div
      ref={tileRef}
      className="group relative flex items-end justify-center"
      style={{ width: magnifySize, height: magnifySize }}
    >
      {item.label ? (
        <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
          {item.label}
        </span>
      ) : null}
      <span
        className="flex items-center justify-center rounded-2xl bg-card text-card-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_12px_-4px_rgba(0,0,0,0.2)] transition-[width,height] duration-100 ease-out"
        style={{ width: size, height: size }}
      >
        {item.icon}
      </span>
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} aria-label={item.label} className="contents">
        {tile}
      </a>
    );
  }
  return (
    <button
      type="button"
      aria-label={item.label}
      onClick={item.onClick}
      className="contents"
    >
      {tile}
    </button>
  );
}

export { FloatingDock };
