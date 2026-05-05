"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PinBoardItem {
  id: string | number;
  /** Initial x position in px, measured from the board's left edge. */
  x: number;
  /** Initial y position in px, measured from the board's top edge. */
  y: number;
  /** Initial rotation in degrees. Random within ±6° if omitted. */
  rotate?: number;
  /** Card width in px. Default 160. */
  width?: number;
  /** Card content. */
  content: React.ReactNode;
}

export interface PinBoardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: PinBoardItem[];
  /** Board width in px. Default 560. */
  width?: number;
  /** Board height in px. Default 360. */
  height?: number;
  /** When true, items can be dragged to new positions. Default true. */
  draggable?: boolean;
  /** Color of the pin head dot. */
  pinColor?: string;
  /** Notified when an item is moved, with its new x/y. */
  onChange?: (id: PinBoardItem["id"], x: number, y: number) => void;
}

interface DragState {
  id: PinBoardItem["id"];
  pointerId: number;
  offsetX: number;
  offsetY: number;
}

/**
 * PinBoard — a canvas of pinned cards. Each card is shown with a pin head
 * at the top, a slight random rotation, and a soft drop shadow. Cards can
 * be dragged to new positions; on drop they snap into place. Active card
 * lifts on top with extra shadow for tactile feedback.
 */
const PinBoard = React.forwardRef<HTMLDivElement, PinBoardProps>(
  (
    {
      items,
      width = 560,
      height = 360,
      draggable = true,
      pinColor = "rgb(244, 114, 182)",
      onChange,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Local position map so we can update positions optimistically while
    // dragging without forcing the parent to re-render every move.
    const [positions, setPositions] = React.useState<
      Record<string | number, { x: number; y: number }>
    >(() =>
      Object.fromEntries(items.map((it) => [it.id, { x: it.x, y: it.y }]))
    );
    const [activeId, setActiveId] = React.useState<PinBoardItem["id"] | null>(
      null
    );
    const dragRef = React.useRef<DragState | null>(null);
    const boardRef = React.useRef<HTMLDivElement | null>(null);

    // When the items array shape changes, reset positions for new ids.
    React.useEffect(() => {
      setPositions((prev) => {
        const next = { ...prev };
        for (const it of items) {
          if (!next[it.id]) next[it.id] = { x: it.x, y: it.y };
        }
        return next;
      });
    }, [items]);

    const setBoardRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        boardRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const onPointerDown = (e: React.PointerEvent, item: PinBoardItem) => {
      if (!draggable) return;
      const node = boardRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const pos = positions[item.id] ?? { x: item.x, y: item.y };
      dragRef.current = {
        id: item.id,
        pointerId: e.pointerId,
        offsetX: e.clientX - rect.left - pos.x,
        offsetY: e.clientY - rect.top - pos.y,
      };
      (e.target as Element).setPointerCapture?.(e.pointerId);
      setActiveId(item.id);
    };

    const onPointerMove = (e: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      const node = boardRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const item = items.find((it) => it.id === drag.id);
      const w = item?.width ?? 160;
      // Estimate height from current DOM (cards have variable heights).
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-pin-card]"
      ) as HTMLElement | null;
      const h = el?.offsetHeight ?? 80;
      const x = Math.max(
        0,
        Math.min(width - w, e.clientX - rect.left - drag.offsetX)
      );
      const y = Math.max(
        0,
        Math.min(height - h, e.clientY - rect.top - drag.offsetY)
      );
      setPositions((prev) => ({ ...prev, [drag.id]: { x, y } }));
    };

    const onPointerUp = (e: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      const final = positions[drag.id];
      if (final) onChange?.(drag.id, final.x, final.y);
      dragRef.current = null;
      setActiveId(null);
    };

    return (
      <div
        ref={setBoardRefs}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10",
          className
        )}
        style={{
          width,
          height,
          touchAction: "none",
          ...style,
        }}
        {...props}
      >
        {items.map((item, idx) => {
          const pos = positions[item.id] ?? { x: item.x, y: item.y };
          // Stable per-id rotation: derive from the id if not provided so
          // re-renders don't re-shuffle each card's tilt.
          const tilt =
            item.rotate ??
            ((((typeof item.id === "string"
              ? item.id.charCodeAt(0)
              : Number(item.id)) +
              idx) %
              13) -
              6);
          const isActive = activeId === item.id;
          const cardW = item.width ?? 160;
          return (
            <div
              key={item.id}
              data-pin-card
              onPointerDown={(e) => onPointerDown(e, item)}
              className="absolute"
              style={{
                left: pos.x,
                top: pos.y,
                width: cardW,
                transform: `rotate(${tilt}deg) ${
                  isActive ? "scale(1.04)" : "scale(1)"
                }`,
                transition: dragRef.current
                  ? "none"
                  : "transform 220ms cubic-bezier(0.22,1,0.36,1)",
                zIndex: isActive ? 50 : idx + 1,
                cursor: draggable
                  ? isActive
                    ? "grabbing"
                    : "grab"
                  : "default",
                filter: isActive
                  ? "drop-shadow(0 26px 36px rgba(0,0,0,0.4))"
                  : "drop-shadow(0 12px 20px rgba(0,0,0,0.25))",
              }}
            >
              {/* Pin head — visible at the top center of the card */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 block -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), ${pinColor} 60%, ${pinColor} 100%)`,
                  boxShadow: `0 2px 4px rgba(0,0,0,0.45), 0 0 8px ${pinColor}88`,
                  zIndex: 2,
                }}
              />
              <div className="rounded-xl border border-white/10 bg-neutral-900 text-white">
                {item.content}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
PinBoard.displayName = "PinBoard";

export { PinBoard };
