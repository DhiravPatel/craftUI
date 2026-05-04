"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface SwipeStackItem {
  id: string | number;
  /** Optional image URL painted as the card background. */
  image?: string;
  /** Title rendered at the bottom-left of the card. */
  title?: React.ReactNode;
  /** Subtitle rendered under the title. */
  subtitle?: React.ReactNode;
  /** Custom content; overrides image/title/subtitle when provided. */
  content?: React.ReactNode;
}

export interface SwipeStackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: SwipeStackItem[];
  /** Width of the stack in px. Default 320. */
  width?: number;
  /** Height of the stack in px. Default 420. */
  height?: number;
  /** How many cards behind the top one are visible. Default 3. */
  visibleDepth?: number;
  /** Pixels of horizontal drag required to dismiss. Default 110. */
  dismissThreshold?: number;
  /** Fired with the swipe direction when a card is dismissed. */
  onSwipe?: (direction: "left" | "right", item: SwipeStackItem) => void;
  /** Fired with the new top index after a swipe. */
  onChange?: (index: number) => void;
}

const SwipeStack = React.forwardRef<HTMLDivElement, SwipeStackProps>(
  (
    {
      items,
      width = 320,
      height = 420,
      visibleDepth = 3,
      dismissThreshold = 110,
      onSwipe,
      onChange,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [topIndex, setTopIndex] = React.useState(0);
    const [drag, setDrag] = React.useState({ x: 0, y: 0 });
    const [dragging, setDragging] = React.useState(false);
    const [flying, setFlying] = React.useState<null | "left" | "right">(null);
    const startRef = React.useRef<{ x: number; y: number; id: number } | null>(
      null
    );
    const cardRef = React.useRef<HTMLDivElement | null>(null);

    const cycleNext = React.useCallback(() => {
      setTopIndex((i) => {
        const next = (i + 1) % items.length;
        onChange?.(next);
        return next;
      });
    }, [items.length, onChange]);

    const release = React.useCallback(
      (dx: number) => {
        if (Math.abs(dx) >= dismissThreshold) {
          const dir = dx > 0 ? "right" : "left";
          setFlying(dir);
          onSwipe?.(dir, items[topIndex]!);
          window.setTimeout(() => {
            setFlying(null);
            setDrag({ x: 0, y: 0 });
            cycleNext();
          }, 280);
        } else {
          setDrag({ x: 0, y: 0 });
        }
      },
      [cycleNext, dismissThreshold, items, onSwipe, topIndex]
    );

    const onPointerDown = (e: React.PointerEvent) => {
      if (flying) return;
      cardRef.current?.setPointerCapture(e.pointerId);
      startRef.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
      setDragging(true);
    };
    const onPointerMove = (e: React.PointerEvent) => {
      if (!startRef.current || startRef.current.id !== e.pointerId) return;
      setDrag({
        x: e.clientX - startRef.current.x,
        y: e.clientY - startRef.current.y,
      });
    };
    const onPointerUp = (e: React.PointerEvent) => {
      if (!startRef.current || startRef.current.id !== e.pointerId) return;
      const dx = e.clientX - startRef.current.x;
      cardRef.current?.releasePointerCapture(e.pointerId);
      startRef.current = null;
      setDragging(false);
      release(dx);
    };

    const order = React.useMemo(() => {
      const slots: Array<{ item: SwipeStackItem; depth: number }> = [];
      for (let d = 0; d <= visibleDepth; d++) {
        const idx = (topIndex + d) % items.length;
        slots.push({ item: items[idx]!, depth: d });
      }
      // Render back-to-front so the top card is the last DOM node.
      return slots.reverse();
    }, [items, topIndex, visibleDepth]);

    return (
      <div
        ref={ref}
        className={cn("relative select-none", className)}
        style={{
          width,
          height,
          perspective: 1100,
          touchAction: "none",
          ...style,
        }}
        {...props}
      >
        {order.map(({ item, depth }) => {
          const isTop = depth === 0;
          let transform: string;
          let transition: string;
          let opacity = 1;

          if (isTop) {
            const rot = drag.x * 0.06;
            if (flying) {
              const dir = flying === "right" ? 1 : -1;
              transform = `translate3d(${dir * (width + 200)}px, ${
                drag.y - 60
              }px, 0) rotate(${dir * 28}deg)`;
              transition = "transform 280ms ease-out, opacity 280ms ease-out";
              opacity = 0;
            } else {
              transform = `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${rot}deg)`;
              transition = dragging ? "none" : "transform 220ms ease-out";
            }
          } else {
            const scale = 1 - depth * 0.05;
            const ty = depth * 14;
            transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
            transition = "transform 280ms ease-out, opacity 280ms ease-out";
            opacity = depth >= visibleDepth ? 0 : 1 - depth * 0.12;
          }

          const tilt = isTop ? Math.max(-1, Math.min(1, drag.x / 200)) : 0;

          return (
            <div
              key={`${item.id}-${depth}`}
              ref={isTop ? cardRef : undefined}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
              className={cn(
                "absolute inset-0 overflow-hidden rounded-[22px] border border-white/15 bg-neutral-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]",
                isTop ? "cursor-grab active:cursor-grabbing" : ""
              )}
              style={{
                transform,
                transition,
                opacity,
                zIndex: 100 - depth,
                willChange: "transform",
              }}
            >
              {item.content ? (
                item.content
              ) : (
                <>
                  {item.image ? (
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("${item.image}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ) : null}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 100%)",
                    }}
                  />
                  {(item.title || item.subtitle) && (
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      {item.title ? (
                        <div className="text-lg font-semibold leading-tight">
                          {item.title}
                        </div>
                      ) : null}
                      {item.subtitle ? (
                        <div className="mt-1 text-sm text-white/80">
                          {item.subtitle}
                        </div>
                      ) : null}
                    </div>
                  )}
                </>
              )}
              {/* Swipe hint badges on the top card */}
              {isTop ? (
                <>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-5 top-5 rounded-md border-2 px-3 py-1 text-sm font-bold uppercase tracking-wider"
                    style={{
                      color: "rgb(248, 113, 113)",
                      borderColor: "rgb(248, 113, 113)",
                      transform: `rotate(-12deg)`,
                      opacity: tilt < 0 ? Math.min(1, -tilt * 1.6) : 0,
                    }}
                  >
                    Nope
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-5 rounded-md border-2 px-3 py-1 text-sm font-bold uppercase tracking-wider"
                    style={{
                      color: "rgb(74, 222, 128)",
                      borderColor: "rgb(74, 222, 128)",
                      transform: `rotate(12deg)`,
                      opacity: tilt > 0 ? Math.min(1, tilt * 1.6) : 0,
                    }}
                  >
                    Like
                  </span>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
);
SwipeStack.displayName = "SwipeStack";

export { SwipeStack };
