"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type TaskStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "in_review"
  | "done"
  | "canceled";

export type TaskPriority = "none" | "low" | "medium" | "high" | "urgent";

export interface TaskAssignee {
  name: string;
  avatar?: string;
}

export interface TaskCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Short identifier shown before the title, e.g. "ENG-204". */
  id?: string;
  /** Task title. */
  title: React.ReactNode;
  /** Optional one- or two-line description. */
  description?: React.ReactNode;
  /** Lifecycle status — sets the leading status glyph. */
  status?: TaskStatus;
  /** Priority — sets the priority chip. */
  priority?: TaskPriority;
  /** Up to ~4 tag chips. */
  tags?: string[];
  /** Assignee shown in the bottom-right. */
  assignee?: TaskAssignee;
  /** Due date — human string or ISO. */
  due?: string;
  /** Whether the due date is past. Renders the chip in danger tone. */
  overdue?: boolean;
  /** Subtask completion, e.g. { done: 3, total: 7 }. */
  subtasks?: { done: number; total: number };
  /** Comment count. */
  comments?: number;
}

const STATUS_LABEL: Record<TaskStatus, string> = {
  backlog: "Backlog",
  todo: "Todo",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
  canceled: "Canceled",
};

const STATUS_COLOR: Record<TaskStatus, string> = {
  backlog: "rgb(115, 115, 115)",
  todo: "rgb(229, 229, 229)",
  in_progress: "rgb(251, 191, 36)",
  in_review: "rgb(168, 85, 247)",
  done: "rgb(74, 222, 128)",
  canceled: "rgb(115, 115, 115)",
};

const PRIORITY_LABEL: Record<TaskPriority, string> = {
  none: "No priority",
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

const PRIORITY_TONE: Record<TaskPriority, string> = {
  none: "bg-white/[0.04] text-white/55 ring-1 ring-white/10",
  low: "bg-white/[0.06] text-white/70 ring-1 ring-white/10",
  medium: "bg-sky-400/15 text-sky-300 ring-1 ring-sky-400/25",
  high: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/25",
  urgent: "bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/25",
};

function StatusGlyph({ status }: { status: TaskStatus }) {
  const color = STATUS_COLOR[status];
  if (status === "done") {
    return (
      <span
        className="flex h-3.5 w-3.5 items-center justify-center rounded-full"
        style={{ background: color }}
        aria-hidden
      >
        <svg width={9} height={9} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12l5 5L20 7"
            stroke="rgb(10,10,10)"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (status === "canceled") {
    return (
      <span
        className="flex h-3.5 w-3.5 items-center justify-center rounded-full"
        style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${color}` }}
        aria-hidden
      >
        <svg width={9} height={9} viewBox="0 0 24 24" fill="none">
          <path
            d="M6 6l12 12M6 18L18 6"
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }
  // backlog / todo / in_progress / in_review — concentric rings filled by status.
  const fillFrac =
    status === "in_review" ? 0.75 : status === "in_progress" ? 0.4 : status === "todo" ? 0 : 0;
  return (
    <span className="relative inline-block" style={{ width: 14, height: 14 }} aria-hidden>
      <svg width={14} height={14} viewBox="0 0 14 14">
        <circle cx={7} cy={7} r={5.5} fill="none" stroke={color} strokeWidth={1.4} strokeDasharray={status === "backlog" ? "1 2" : "0"} />
        {fillFrac > 0 ? (
          <circle
            cx={7}
            cy={7}
            r={3}
            fill="none"
            stroke={color}
            strokeWidth={2.6}
            strokeDasharray={`${fillFrac * 18.85} 18.85`}
            transform="rotate(-90 7 7)"
          />
        ) : null}
      </svg>
    </span>
  );
}

/**
 * TaskCard — a Linear / Asana-style task row card. Compact layout: an
 * identifier (e.g. ENG-204), a title and optional description, a status
 * glyph that visually matches Linear's progress dots, a colored priority
 * chip, an assignee avatar, tags, subtask completion, comment count, and
 * a due-date pill that switches to danger tone when overdue. Use as a
 * drop-in inside a list, a column, or a search-result hit row.
 */
const TaskCard = React.forwardRef<HTMLDivElement, TaskCardProps>(
  (
    {
      id,
      title,
      description,
      status = "todo",
      priority = "none",
      tags,
      assignee,
      due,
      overdue,
      subtasks,
      comments,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group/task w-full rounded-xl border border-white/10 bg-neutral-900/60 p-3 text-white transition-colors hover:border-white/20 hover:bg-neutral-900",
          className
        )}
        style={style}
        {...props}
      >
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 shrink-0" title={STATUS_LABEL[status]}>
            <StatusGlyph status={status} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              {id ? (
                <span className="shrink-0 font-mono text-[11px] text-white/40">
                  {id}
                </span>
              ) : null}
              <p
                className={cn(
                  "min-w-0 truncate text-sm font-medium",
                  status === "done" || status === "canceled"
                    ? "text-white/40 line-through decoration-white/25"
                    : "text-white/90"
                )}
              >
                {title}
              </p>
            </div>
            {description ? (
              <p className="mt-1 line-clamp-2 text-[12px] text-white/55">
                {description}
              </p>
            ) : null}

            {/* Meta row */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {priority !== "none" ? (
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[10px] font-medium",
                    PRIORITY_TONE[priority]
                  )}
                  title={`Priority: ${PRIORITY_LABEL[priority]}`}
                >
                  {PRIORITY_LABEL[priority]}
                </span>
              ) : null}
              {tags?.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-white/65 ring-1 ring-white/[0.06]"
                >
                  {t}
                </span>
              ))}
              {subtasks && subtasks.total > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/65 ring-1 ring-white/[0.06]">
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth={2.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {subtasks.done}/{subtasks.total}
                </span>
              ) : null}
              {typeof comments === "number" && comments > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/65 ring-1 ring-white/[0.06]">
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z"
                      stroke="currentColor"
                      strokeWidth={1.6}
                    />
                  </svg>
                  {comments}
                </span>
              ) : null}
              {due ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium",
                    overdue
                      ? "bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/25"
                      : "bg-white/[0.04] text-white/65 ring-1 ring-white/[0.06]"
                  )}
                >
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect
                      x={3}
                      y={5}
                      width={18}
                      height={16}
                      rx={2}
                      stroke="currentColor"
                      strokeWidth={1.6}
                    />
                    <path
                      d="M8 3v4M16 3v4M3 10h18"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                    />
                  </svg>
                  {due}
                </span>
              ) : null}
            </div>
          </div>
          {assignee ? (
            <span
              className="ml-1 mt-0.5 shrink-0"
              title={`Assigned to ${assignee.name}`}
            >
              {assignee.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={assignee.avatar}
                  alt={assignee.name}
                  className="h-6 w-6 rounded-full object-cover ring-1 ring-white/10"
                />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.07] text-[10px] font-semibold text-white/85 ring-1 ring-white/10">
                  {assignee.name
                    .split(" ")
                    .slice(0, 2)
                    .map((p) => p[0]?.toUpperCase())
                    .join("")}
                </span>
              )}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);
TaskCard.displayName = "TaskCard";

export { TaskCard };
