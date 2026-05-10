"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type Vote = "up" | "down" | null;

export interface VoteWidgetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The base count BEFORE the user's own vote is added. */
  count: number;
  /** Controlled current vote. */
  vote?: Vote;
  /** Initial vote for uncontrolled use. Default null. */
  defaultVote?: Vote;
  /** Notified when the vote changes. */
  onChange?: (vote: Vote) => void;
  /** Layout. "vertical" stacks the arrows around the count (Reddit-style); "horizontal" puts the count to the side (HN-style). Default "vertical". */
  orientation?: "vertical" | "horizontal";
  /** Color of the active up vote. Default a warm orange. */
  upColor?: string;
  /** Color of the active down vote. Default a cool blue. */
  downColor?: string;
}

/**
 * VoteWidget — up/down voting with an animated count. Clicking an arrow
 * applies that vote (toggles off on a second click). The number between
 * the arrows slides up/down in sync with the score change so the UI feels
 * tactile, not just stateful. Supports controlled and uncontrolled use.
 */
const VoteWidget = React.forwardRef<HTMLDivElement, VoteWidgetProps>(
  (
    {
      count,
      vote: controlledVote,
      defaultVote = null,
      onChange,
      orientation = "vertical",
      upColor = "rgb(249, 115, 22)",
      downColor = "rgb(96, 165, 250)",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState<Vote>(defaultVote);
    const vote = controlledVote ?? uncontrolled;

    const setVote = (next: Vote) => {
      if (controlledVote === undefined) setUncontrolled(next);
      onChange?.(next);
    };

    const adjusted =
      count + (vote === "up" ? 1 : 0) + (vote === "down" ? -1 : 0);

    const isVert = orientation === "vertical";

    const arrowColor = (active: boolean, color: string) =>
      active ? color : "currentColor";

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center text-foreground/65",
          isVert ? "flex-col gap-1" : "gap-1",
          className
        )}
        style={style}
        {...props}
      >
        <button
          type="button"
          aria-label="Upvote"
          aria-pressed={vote === "up"}
          onClick={() => setVote(vote === "up" ? null : "up")}
          className="group inline-flex h-7 w-7 items-center justify-center rounded-md outline-none transition-colors hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-sky-400/60"
          style={{ color: arrowColor(vote === "up", upColor) }}
        >
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill={vote === "up" ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-active:scale-90"
            style={{ transform: vote === "up" ? "translateY(-1px)" : "none" }}
          >
            <path d="M12 4l8 9h-5v7h-6v-7H4z" />
          </svg>
        </button>

        {/* Count window — the active digit slides between two stacked
            numbers (previous & current) when the score changes. */}
        <span
          className="relative inline-flex h-5 items-center justify-center overflow-hidden text-sm font-semibold tabular-nums"
          style={{
            minWidth: `${Math.max(2, String(adjusted).length) * 0.6}em`,
            color:
              vote === "up"
                ? upColor
                : vote === "down"
                ? downColor
                : "currentColor",
          }}
          key={adjusted}
        >
          <span
            className="block leading-5"
            style={{
              animation: "vote-slide 320ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {adjusted.toLocaleString()}
          </span>
          <style>{`
            @keyframes vote-slide {
              0% { transform: translateY(${
                vote === "up" ? "8px" : vote === "down" ? "-8px" : "0"
              }); opacity: 0.4; }
              100% { transform: translateY(0); opacity: 1; }
            }
          `}</style>
        </span>

        <button
          type="button"
          aria-label="Downvote"
          aria-pressed={vote === "down"}
          onClick={() => setVote(vote === "down" ? null : "down")}
          className="group inline-flex h-7 w-7 items-center justify-center rounded-md outline-none transition-colors hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-sky-400/60"
          style={{ color: arrowColor(vote === "down", downColor) }}
        >
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill={vote === "down" ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-active:scale-90"
            style={{
              transform: vote === "down" ? "translateY(1px)" : "none",
            }}
          >
            <path d="M12 20l8-9h-5V4h-6v7H4z" />
          </svg>
        </button>
      </div>
    );
  }
);
VoteWidget.displayName = "VoteWidget";

export { VoteWidget };
