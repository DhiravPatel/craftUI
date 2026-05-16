"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ChatBubbleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Where the bubble sits — incoming on the left, outgoing on the right. Default "incoming". */
  variant?: "incoming" | "outgoing";
  /** Avatar image URL for the sender. */
  avatarSrc?: string;
  /** Sender name. Used for the alt text and the optional name label. */
  name?: string;
  /** Show the sender name above the bubble. Default false. */
  showName?: boolean;
  /** Timestamp shown beneath the bubble (e.g. "2m ago"). */
  timestamp?: string;
  /** Render a typing indicator (three bouncing dots) instead of the children. */
  typing?: boolean;
  /** Read receipt — "sent" | "delivered" | "read". Outgoing bubbles only. */
  status?: "sent" | "delivered" | "read";
  /** Background of the bubble. Defaults differ by variant. */
  background?: string;
  /** Text color of the bubble. Defaults differ by variant. */
  color?: string;
  /** Bubble contents. */
  children?: React.ReactNode;
}

/** Two stacked checkmarks to show "delivered"/"read" status. */
function StatusGlyph({ status }: { status: NonNullable<ChatBubbleProps["status"]> }) {
  const color =
    status === "read" ? "rgb(125, 211, 252)" : "rgba(255,255,255,0.55)";
  if (status === "sent") {
    return (
      <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12l5 5L20 7"
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width={16} height={12} viewBox="0 0 32 24" fill="none">
      <path
        d="M3 14l5 5L18 9"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 14l5 5L29 7"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * ChatBubble — a single message in a conversation thread, with optional
 * avatar, sender name, timestamp, and read receipt. Set `typing` to render
 * a three-dot animated indicator. Pair with sibling bubbles to mock up an
 * AI assistant, support inbox, or product demo.
 */
const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    {
      variant = "incoming",
      avatarSrc,
      name,
      showName = false,
      timestamp,
      typing = false,
      status,
      background,
      color,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isOut = variant === "outgoing";
    const bubbleBg =
      background ??
      (isOut
        ? "linear-gradient(135deg, rgb(125, 211, 252), rgb(99, 102, 241))"
        : "rgba(255, 255, 255, 0.06)");
    const bubbleColor = color ?? "white";

    const meta = (
      <div
        className={cn(
          "mt-1 flex items-center gap-1.5 text-[11px] text-white/45",
          isOut ? "justify-end" : "justify-start"
        )}
      >
        {timestamp ? <span>{timestamp}</span> : null}
        {isOut && status ? <StatusGlyph status={status} /> : null}
      </div>
    );

    const bubble = (
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)]",
          isOut ? "rounded-br-md" : "rounded-bl-md"
        )}
        style={{ background: bubbleBg, color: bubbleColor }}
      >
        {typing ? (
          <span className="inline-flex items-center gap-1 py-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-1.5 w-1.5 rounded-full bg-current opacity-70"
                style={{
                  animation: `craftui-bubble-bounce 1.1s ${i * 150}ms ease-in-out infinite`,
                }}
              />
            ))}
            <style>{`@keyframes craftui-bubble-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: 0.45; } 30% { transform: translateY(-3px); opacity: 1; } }`}</style>
          </span>
        ) : (
          children
        )}
      </div>
    );

    const avatar = avatarSrc ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarSrc}
        alt={name ?? "Avatar"}
        className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-neutral-950"
        draggable={false}
      />
    ) : name ? (
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-[11px] font-semibold text-white ring-2 ring-neutral-950"
        aria-label={name}
      >
        {name
          .split(" ")
          .slice(0, 2)
          .map((p) => p[0]?.toUpperCase())
          .join("")}
      </span>
    ) : null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full items-end gap-2",
          isOut ? "justify-end" : "justify-start",
          className
        )}
        style={style}
        {...props}
      >
        {!isOut && avatar ? avatar : null}
        <div
          className={cn(
            "flex min-w-0 flex-col",
            isOut ? "items-end" : "items-start"
          )}
        >
          {showName && name ? (
            <span className="mb-1 text-[11px] font-medium text-white/55">
              {name}
            </span>
          ) : null}
          {bubble}
          {timestamp || (isOut && status) ? meta : null}
        </div>
        {isOut && avatar ? avatar : null}
      </div>
    );
  }
);
ChatBubble.displayName = "ChatBubble";

export { ChatBubble };
