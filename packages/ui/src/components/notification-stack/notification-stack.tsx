"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface NotificationItem {
  id: string | number;
  /** App / source icon shown on the left of the notification. */
  icon: React.ReactNode;
  /** Source / app name shown above the message. */
  source: string;
  /** Notification body. */
  message: React.ReactNode;
  /** Optional time stamp shown on the right (e.g. "now", "2m"). */
  time?: string;
  /** Background painted on the icon tile. */
  iconBackground?: string;
}

export interface NotificationStackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  notifications: NotificationItem[];
  /** Width of the stack in px. Default 340. */
  width?: number;
  /** How many notifications are visible at once. Default 3. */
  visible?: number;
  /** Time between each new notification, in seconds. Default 2.4. */
  interval?: number;
}

/**
 * NotificationStack — a stack of iOS-style push notifications that
 * automatically cycles through a list. Each new notification slides in at
 * the top; older ones shift down with a slight scale + opacity falloff,
 * giving the recognizable "stacked notifications" depth from a real phone
 * lock screen. Useful as a hero decoration on a notification-heavy SaaS.
 */
const NotificationStack = React.forwardRef<
  HTMLDivElement,
  NotificationStackProps
>(
  (
    {
      notifications,
      width = 340,
      visible = 3,
      interval = 2.4,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [head, setHead] = React.useState(0);

    React.useEffect(() => {
      if (notifications.length === 0) return;
      const id = window.setInterval(() => {
        setHead((h) => (h + 1) % notifications.length);
      }, interval * 1000);
      return () => window.clearInterval(id);
    }, [notifications.length, interval]);

    // Compose a small window of notifications to render: the current head,
    // plus the previous `visible - 1` items behind it.
    const slots = React.useMemo(() => {
      const out: Array<{ item: NotificationItem; depth: number }> = [];
      const total = notifications.length;
      for (let d = 0; d < visible; d++) {
        const idx = (head - d + total * 10) % total;
        const item = notifications[idx];
        if (item) out.push({ item, depth: d });
      }
      return out;
    }, [head, visible, notifications]);

    const cardHeight = 72;

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{
          width,
          height: cardHeight + (visible - 1) * 18 + 12,
          ...style,
        }}
        {...props}
      >
        {slots.map(({ item, depth }) => {
          const isHead = depth === 0;
          // Each older card sits a bit lower, scales slightly down, and
          // fades — the classic stacked-notifications look.
          const translate = depth * 14;
          const scale = 1 - depth * 0.04;
          const opacity = depth >= visible - 1 ? 0 : 1 - depth * 0.18;
          return (
            <div
              key={`${item.id}-${depth}`}
              className="absolute inset-x-0 top-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/85 p-3 text-black shadow-[0_18px_36px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md"
              style={{
                transform: `translateY(${translate}px) scale(${scale})`,
                opacity,
                zIndex: 100 - depth,
                transition:
                  "transform 480ms cubic-bezier(0.22,1,0.36,1), opacity 380ms ease",
                // Frosted-look in dark themes, solid-look in light themes.
                background: isHead
                  ? "rgba(255,255,255,0.92)"
                  : "rgba(255,255,255,0.78)",
              }}
            >
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-white"
                style={{
                  background:
                    item.iconBackground ??
                    "linear-gradient(135deg, rgb(125,211,252), rgb(99,102,241))",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                {item.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[12px] font-semibold leading-tight">
                    {item.source}
                  </p>
                  {item.time ? (
                    <span className="shrink-0 text-[10px] text-black/55">
                      {item.time}
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-black/75">
                  {item.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);
NotificationStack.displayName = "NotificationStack";

export { NotificationStack };
