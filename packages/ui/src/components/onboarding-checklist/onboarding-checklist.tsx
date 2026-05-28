"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  /** Marks the step as completed in uncontrolled mode (seed value). */
  completed?: boolean;
  /** Optional CTA shown beside an incomplete step. */
  action?: {
    label: string;
    onClick?: () => void;
  };
  /** Override the default circle/check glyph. */
  icon?: React.ReactNode;
}

export interface OnboardingChecklistProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  steps: OnboardingStep[];
  /** Header title. Default "Getting started". */
  title?: string;
  /** One-line subtitle under the title. */
  description?: string;
  /** Controlled set of completed step ids. */
  completedIds?: string[];
  /** Called whenever a step is toggled in uncontrolled mode. */
  onCompletedChange?: (ids: string[]) => void;
  /** Whether the body starts collapsed. Default false. */
  defaultCollapsed?: boolean;
  /** Click on the header to collapse/expand. Default true. */
  collapsible?: boolean;
  /** Show the X close button. Default true. */
  dismissible?: boolean;
  onDismiss?: () => void;
  /** Render the celebration block when everything is done. Default true. */
  showCompletionState?: boolean;
  /** Accent color used for the progress bar, links, focus ring. */
  accentColor?: string;
  /** Optional content rendered inside the "all done" state. */
  completionContent?: React.ReactNode;
}

const DEFAULT_ACCENT = "rgb(125, 211, 252)";

/**
 * OnboardingChecklist — a SaaS getting-started widget. Shows a header with
 * a progress bar and X / N completion, then a list of steps that the user
 * can tick off. Each step can carry a description and an optional CTA. When
 * everything is done it animates into a celebration card. Works fully
 * uncontrolled (toggle by clicking the circle) or controlled via
 * `completedIds` + `onCompletedChange`. Self-contained, no dependencies.
 */
const OnboardingChecklist = React.forwardRef<
  HTMLDivElement,
  OnboardingChecklistProps
>(
  (
    {
      steps,
      title = "Getting started",
      description,
      completedIds,
      onCompletedChange,
      defaultCollapsed = false,
      collapsible = true,
      dismissible = true,
      onDismiss,
      showCompletionState = true,
      accentColor = DEFAULT_ACCENT,
      completionContent,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = completedIds !== undefined;
    const [internalIds, setInternalIds] = React.useState<string[]>(() =>
      steps.filter((s) => s.completed).map((s) => s.id)
    );
    const ids = isControlled ? completedIds : internalIds;
    const completedSet = React.useMemo(() => new Set(ids), [ids]);

    const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
    const [dismissed, setDismissed] = React.useState(false);

    const total = steps.length;
    const done = steps.filter((s) => completedSet.has(s.id)).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    const allDone = total > 0 && done === total;

    const toggle = (id: string) => {
      const next = completedSet.has(id)
        ? ids!.filter((x) => x !== id)
        : [...ids!, id];
      if (!isControlled) setInternalIds(next);
      onCompletedChange?.(next);
    };

    const dismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    if (dismissed) return null;

    // First incomplete step is the "current" one — gets a subtle highlight.
    const currentIdx = steps.findIndex((s) => !completedSet.has(s.id));

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 text-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          className
        )}
        style={style}
        {...props}
      >
        {/* ambient glow behind the header */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 opacity-40 blur-3xl"
          style={{
            background: `radial-gradient(closest-side, ${accentColor}, transparent)`,
          }}
        />

        {/* Header */}
        <div className="relative flex items-start gap-3 px-5 pt-5">
          <button
            type="button"
            onClick={() => collapsible && setCollapsed((c) => !c)}
            disabled={!collapsible}
            aria-expanded={!collapsed}
            className={cn(
              "min-w-0 flex-1 text-left",
              collapsible
                ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-md"
                : "cursor-default"
            )}
            style={
              collapsible
                ? ({ "--tw-ring-color": accentColor } as React.CSSProperties)
                : undefined
            }
          >
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold leading-tight">
                {title}
              </h3>
              {collapsible ? (
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  className={cn(
                    "shrink-0 text-white/40 transition-transform duration-300",
                    collapsed ? "-rotate-90" : "rotate-0"
                  )}
                  aria-hidden
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </div>
            {description ? (
              <p className="mt-0.5 truncate text-xs text-white/55">
                {description}
              </p>
            ) : null}
          </button>
          <div className="flex shrink-0 items-center gap-3">
            <span className="font-mono text-[11px] tabular-nums text-white/55">
              {done}/{total}
            </span>
            {dismissible ? (
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/45 transition-colors hover:bg-white/5 hover:text-white"
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mt-3 px-5">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{
                width: `${percent}%`,
                background: `linear-gradient(90deg, ${accentColor}, rgba(255,255,255,0.85))`,
                boxShadow: `0 0 12px ${accentColor}`,
              }}
            />
          </div>
        </div>

        {/* Steps body */}
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
            collapsed
              ? "grid-rows-[0fr] opacity-0"
              : "grid-rows-[1fr] opacity-100"
          )}
        >
          <div className="min-h-0 overflow-hidden">
            {allDone && showCompletionState ? (
              <CompletionState accentColor={accentColor}>
                {completionContent}
              </CompletionState>
            ) : (
              <ul className="flex flex-col gap-1 px-2 pb-3 pt-3">
                {steps.map((step, i) => {
                  const isDone = completedSet.has(step.id);
                  const isCurrent = !isDone && i === currentIdx;
                  return (
                    <li key={step.id}>
                      <div
                        className={cn(
                          "group/step flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors",
                          isCurrent
                            ? "bg-white/[0.04]"
                            : "hover:bg-white/[0.025]"
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => toggle(step.id)}
                          aria-pressed={isDone}
                          aria-label={
                            isDone ? "Mark incomplete" : "Mark complete"
                          }
                          className={cn(
                            "relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
                            isDone
                              ? "border-transparent"
                              : isCurrent
                              ? "border-white/40 bg-white/5"
                              : "border-white/15 group-hover/step:border-white/30"
                          )}
                          style={
                            {
                              "--tw-ring-color": accentColor,
                              background: isDone ? accentColor : undefined,
                              boxShadow: isDone
                                ? `0 0 10px ${accentColor}80`
                                : undefined,
                            } as React.CSSProperties
                          }
                        >
                          {step.icon ? (
                            <span className="text-white/70">{step.icon}</span>
                          ) : isDone ? (
                            <svg
                              width={12}
                              height={12}
                              viewBox="0 0 24 24"
                              fill="none"
                              className="animate-craftui-onboarding-check"
                              aria-hidden
                            >
                              <path
                                d="M5 12l5 5L20 7"
                                stroke="rgb(10,10,10)"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : isCurrent ? (
                            <span
                              className="block h-1.5 w-1.5 rounded-full"
                              style={{ background: accentColor }}
                              aria-hidden
                            />
                          ) : null}
                        </button>

                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "text-sm font-medium leading-tight transition-colors",
                              isDone
                                ? "text-white/45 line-through decoration-white/25"
                                : isCurrent
                                ? "text-white"
                                : "text-white/85"
                            )}
                          >
                            {step.title}
                          </p>
                          {step.description ? (
                            <p
                              className={cn(
                                "mt-0.5 text-xs leading-snug transition-colors",
                                isDone ? "text-white/30" : "text-white/55"
                              )}
                            >
                              {step.description}
                            </p>
                          ) : null}
                        </div>

                        {!isDone && step.action ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              step.action?.onClick?.();
                            }}
                            className={cn(
                              "shrink-0 self-center rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors",
                              isCurrent
                                ? "text-neutral-950"
                                : "text-white/70 hover:text-white"
                            )}
                            style={
                              isCurrent
                                ? { background: accentColor }
                                : undefined
                            }
                          >
                            {step.action.label}
                          </button>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <style>{`
          @keyframes craftui-onboarding-check {
            0% { stroke-dasharray: 0 30; opacity: 0; }
            100% { stroke-dasharray: 30 30; opacity: 1; }
          }
          .animate-craftui-onboarding-check path {
            stroke-dasharray: 30 30;
            animation: craftui-onboarding-check 320ms cubic-bezier(0.22,1,0.36,1) both;
          }
        `}</style>
      </div>
    );
  }
);
OnboardingChecklist.displayName = "OnboardingChecklist";

function CompletionState({
  accentColor,
  children,
}: {
  accentColor: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-7 text-center">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          background: `radial-gradient(closest-side, ${accentColor}, ${accentColor}40 70%, transparent)`,
        }}
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12l5 5L20 7"
            stroke="rgb(10,10,10)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="text-sm font-semibold">You&apos;re all set</p>
      <p className="max-w-[260px] text-xs text-white/55">
        {children ?? "Every step is complete. Welcome aboard!"}
      </p>
    </div>
  );
}

export { OnboardingChecklist };
