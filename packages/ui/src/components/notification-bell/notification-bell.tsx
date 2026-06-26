"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface NotificationBellItem {
  /** Stable id used as React key and in the mark-read callback. */
  id: string;
  /** Optional leading glyph. Falls back to a colored dot. */
  icon?: React.ReactNode;
  /** Primary line. Rendered bold when the item is unread. */
  title: React.ReactNode;
  /** Optional secondary line under the title. */
  body?: React.ReactNode;
  /** Right-aligned timestamp string (already humanized). */
  time?: string;
  /** Marks the item as read. Defaults to false. */
  read?: boolean;
  /** When set, clicking the row also navigates here via an <a>. */
  href?: string;
  /** Per-item click handler — fires before `onClickItem`. */
  onClick?: () => void;
}

export interface NotificationBellProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Notifications shown inside the dropdown panel. */
  notifications: NotificationBellItem[];
  /** Override the derived unread count (useful with server-side counts). */
  unreadCount?: number;
  /** Fires when the user clicks "Mark all as read". */
  onMarkAllRead?: () => void;
  /** Fires when a single item is marked read (triggered on click). */
  onMarkRead?: (id: string) => void;
  /** Fires whenever a row is clicked (after `item.onClick`). */
  onClickItem?: (item: NotificationBellItem) => void;
  /** Dropdown header text. Default "Notifications". */
  title?: React.ReactNode;
  /** Message shown when the list is empty. Default "You are all caught up". */
  emptyLabel?: React.ReactNode;
  /** Badge ceiling — counts above render as e.g. "99+". Default 99. */
  maxBadge?: number;
  /** Initial open state (uncontrolled). Default false. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Fires whenever the dropdown opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Accent color used for the badge, unread stripe, and focus ring. */
  accentColor?: string;
  /** Side the dropdown anchors to. Default "right". */
  align?: "left" | "right";
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";

function pickId(): string {
  // Deterministic-ish: counter-based, monotonically increasing per session.
  pickId.counter = (pickId.counter ?? 0) + 1;
  return `craftui-nbell-${pickId.counter}`;
}
pickId.counter = 0 as number;

/**
 * NotificationBell — a top-bar bell icon button with an unread-count badge
 * and a dropdown panel listing recent notifications. Each item carries an
 * icon, title, optional body, and timestamp; unread rows get a sky stripe
 * on the left and a soft tinted background. The bell does a brief wobble
 * when the unread count transitions from 0 to >0. Works fully uncontrolled
 * or controlled via `open` + `onOpenChange`. Closes on outside click and
 * on Escape. Zero dependencies, pure React + Tailwind.
 */
const NotificationBell = React.forwardRef<HTMLDivElement, NotificationBellProps>(
  (
    {
      notifications,
      unreadCount,
      onMarkAllRead,
      onMarkRead,
      onClickItem,
      title = "Notifications",
      emptyLabel = "You are all caught up",
      maxBadge = 99,
      defaultOpen = false,
      open,
      onOpenChange,
      accentColor = DEFAULT_ACCENT,
      align = "right",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = isControlled ? !!open : internalOpen;

    const setOpen = React.useCallback(
      (next: boolean) => {
        if (!isControlled) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [isControlled, onOpenChange]
    );

    const derivedUnread = React.useMemo(
      () => notifications.filter((n) => !n.read).length,
      [notifications]
    );
    const effectiveUnread =
      typeof unreadCount === "number" ? unreadCount : derivedUnread;

    // Bell ring animation when unread count crosses from 0 to >0.
    const prevUnread = React.useRef(effectiveUnread);
    const [ringing, setRinging] = React.useState(false);
    React.useEffect(() => {
      if (prevUnread.current === 0 && effectiveUnread > 0) {
        setRinging(true);
        const t = window.setTimeout(() => setRinging(false), 900);
        return () => window.clearTimeout(t);
      }
      prevUnread.current = effectiveUnread;
      return undefined;
    }, [effectiveUnread]);

    // Outside click + Escape close.
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
      if (!isOpen) return undefined;
      const handleClick = (e: MouseEvent) => {
        const node = rootRef.current;
        if (!node) return;
        if (e.target instanceof Node && !node.contains(e.target)) {
          setOpen(false);
        }
      };
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("click", handleClick);
      window.addEventListener("keydown", handleKey);
      return () => {
        window.removeEventListener("click", handleClick);
        window.removeEventListener("keydown", handleKey);
      };
    }, [isOpen, setOpen]);

    // Stable ARIA ids for button -> panel association.
    const panelIdRef = React.useRef<string | null>(null);
    if (panelIdRef.current === null) panelIdRef.current = pickId();
    const panelId = panelIdRef.current;

    const setNodeRefs = (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    const badgeText =
      effectiveUnread > maxBadge ? `${maxBadge}+` : String(effectiveUnread);

    const handleItemClick = (item: NotificationBellItem) => {
      item.onClick?.();
      if (!item.read) onMarkRead?.(item.id);
      onClickItem?.(item);
    };

    const handleMarkAll = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onMarkAllRead?.();
    };

    return (
      <div
        ref={setNodeRefs}
        className={cn("relative inline-block text-white", className)}
        style={style}
        {...props}
      >
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={
            effectiveUnread > 0
              ? `Notifications — ${effectiveUnread} unread`
              : "Notifications"
          }
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!isOpen);
          }}
          className={cn(
            "relative flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors",
            "hover:bg-white/[0.06] hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
            isOpen && "bg-white/[0.06] text-white"
          )}
          style={{ ["--tw-ring-color" as string]: accentColor } as React.CSSProperties}
        >
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className={cn(
              "origin-top",
              ringing && "craftui-notification-bell-ringing"
            )}
          >
            <path
              d="M6 8a6 6 0 1 1 12 0c0 4.5 1.5 6 2 6.5H4c.5-.5 2-2 2-6.5Z"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 18.5a2 2 0 0 0 4 0"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          </svg>
          {effectiveUnread > 0 ? (
            <span
              aria-hidden
              className={cn(
                "absolute -top-0.5 -right-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none text-neutral-950 ring-2 ring-neutral-950",
                ringing && "craftui-notification-bell-pop"
              )}
              style={{
                background: accentColor,
                boxShadow: `0 0 10px ${accentColor}80`,
              }}
            >
              {badgeText}
            </span>
          ) : null}
        </button>

        {isOpen ? (
          <div
            id={panelId}
            role="dialog"
            aria-label={typeof title === "string" ? title : "Notifications"}
            className={cn(
              "craftui-notification-bell-panel absolute z-50 mt-2 w-[22rem] max-w-[calc(100vw-1rem)] origin-top overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-1 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]",
              align === "right" ? "right-0" : "left-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-3 pb-2 pt-2.5">
              <p className="truncate text-[13px] font-semibold leading-tight">
                {title}
                {effectiveUnread > 0 ? (
                  <span
                    className="ml-1.5 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium text-neutral-950"
                    style={{ background: accentColor }}
                  >
                    {badgeText}
                  </span>
                ) : null}
              </p>
              <button
                type="button"
                onClick={handleMarkAll}
                disabled={effectiveUnread === 0}
                className={cn(
                  "shrink-0 rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
                  effectiveUnread === 0
                    ? "cursor-not-allowed text-white/30"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                )}
                style={
                  { ["--tw-ring-color" as string]: accentColor } as React.CSSProperties
                }
              >
                Mark all as read
              </button>
            </div>

            <div className="mx-2 mb-1 h-px bg-white/[0.06]" aria-hidden />

            {/* Items */}
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: `radial-gradient(closest-side, ${accentColor}30, transparent)`,
                  }}
                  aria-hidden
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l5 5L20 7"
                      stroke={accentColor}
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-xs text-white/55">{emptyLabel}</p>
              </div>
            ) : (
              <ul
                role="list"
                className="craftui-notification-bell-scroll flex max-h-[24rem] flex-col gap-0.5 overflow-y-auto px-1 pb-1"
              >
                {notifications.map((item) => {
                  const isUnread = !item.read;
                  const RowTag = item.href ? "a" : "button";
                  return (
                    <li key={item.id} role="listitem">
                      <RowTag
                        {...(item.href
                          ? { href: item.href }
                          : { type: "button" as const })}
                        onClick={() => handleItemClick(item)}
                        className={cn(
                          "group/nbell-row relative flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                          "hover:bg-white/[0.05]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset",
                          isUnread && "craftui-notification-bell-unread"
                        )}
                        style={
                          {
                            ["--tw-ring-color" as string]: accentColor,
                            ...(isUnread
                              ? {
                                  background: `${accentColor}0D`,
                                }
                              : null),
                          } as React.CSSProperties
                        }
                      >
                        {isUnread ? (
                          <span
                            aria-hidden
                            className="absolute left-0 top-1.5 h-[calc(100%-12px)] w-[3px] rounded-r-full"
                            style={{ background: accentColor }}
                          />
                        ) : null}

                        <span
                          className={cn(
                            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/80",
                            isUnread ? "bg-white/[0.08]" : "bg-white/[0.04]"
                          )}
                          aria-hidden
                        >
                          {item.icon ?? (
                            <span
                              className="block h-1.5 w-1.5 rounded-full"
                              style={{
                                background: isUnread
                                  ? accentColor
                                  : "rgba(255,255,255,0.4)",
                              }}
                            />
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <p
                              className={cn(
                                "min-w-0 flex-1 truncate text-[13px] leading-tight",
                                isUnread
                                  ? "font-semibold text-white"
                                  : "font-medium text-white/75"
                              )}
                            >
                              {item.title}
                            </p>
                            {item.time ? (
                              <span className="shrink-0 font-mono text-[10px] tabular-nums text-white/40">
                                {item.time}
                              </span>
                            ) : null}
                          </div>
                          {item.body ? (
                            <p
                              className={cn(
                                "mt-0.5 line-clamp-2 text-[12px] leading-snug",
                                isUnread ? "text-white/70" : "text-white/50"
                              )}
                            >
                              {item.body}
                            </p>
                          ) : null}
                        </div>

                        {isUnread ? (
                          <span
                            aria-hidden
                            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{
                              background: accentColor,
                              boxShadow: `0 0 8px ${accentColor}`,
                            }}
                          />
                        ) : null}
                      </RowTag>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : null}

        <style>{`
          @keyframes craftui-notification-bell-ring {
            0% { transform: rotate(0deg); }
            15% { transform: rotate(14deg); }
            30% { transform: rotate(-12deg); }
            45% { transform: rotate(10deg); }
            60% { transform: rotate(-8deg); }
            75% { transform: rotate(6deg); }
            100% { transform: rotate(0deg); }
          }
          .craftui-notification-bell-ringing {
            animation: craftui-notification-bell-ring 900ms cubic-bezier(0.36,0.07,0.19,0.97) both;
            transform-origin: 50% 4px;
          }
          @keyframes craftui-notification-bell-pop-kf {
            0% { transform: scale(0.6); opacity: 0; }
            70% { transform: scale(1.18); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .craftui-notification-bell-pop {
            animation: craftui-notification-bell-pop-kf 420ms cubic-bezier(0.22,1,0.36,1) both;
          }
          @keyframes craftui-notification-bell-fade-in {
            0% { opacity: 0; transform: translateY(-4px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .craftui-notification-bell-panel {
            animation: craftui-notification-bell-fade-in 160ms ease-out both;
          }
          .craftui-notification-bell-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .craftui-notification-bell-scroll::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.08);
            border-radius: 9999px;
          }
          .craftui-notification-bell-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
        `}</style>
      </div>
    );
  }
);
NotificationBell.displayName = "NotificationBell";

export { NotificationBell };
