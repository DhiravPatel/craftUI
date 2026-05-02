"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "../../lib/cn";

export interface MultiStepLoaderStep {
  /** Step label. */
  text: React.ReactNode;
}

export interface MultiStepLoaderProps {
  /** Whether the loader is visible. */
  loading: boolean;
  /** Steps to advance through. */
  steps: MultiStepLoaderStep[];
  /** Time spent on each step in ms. Default 2000. */
  duration?: number;
  /** Loop forever once the last step is reached. Default false. */
  loop?: boolean;
  /** Called when the last step finishes (only when `loop=false`). */
  onComplete?: () => void;
  /** Show a close button in the corner. Default true. */
  closable?: boolean;
  /** Called when the close button is clicked. */
  onClose?: () => void;
}

const MultiStepLoader: React.FC<MultiStepLoaderProps> = ({
  loading,
  steps,
  duration = 2000,
  loop = false,
  onComplete,
  closable = true,
  onClose,
}) => {
  const [current, setCurrent] = React.useState(0);
  const onCompleteRef = React.useRef(onComplete);
  React.useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  React.useEffect(() => {
    if (!loading) {
      setCurrent(0);
      return;
    }
    if (steps.length === 0) return;
    const id = window.setInterval(() => {
      setCurrent((prev) => {
        const next = prev + 1;
        if (next >= steps.length) {
          if (loop) return 0;
          window.clearInterval(id);
          onCompleteRef.current?.();
          return prev;
        }
        return next;
      });
    }, duration);
    return () => window.clearInterval(id);
  }, [loading, duration, loop, steps.length]);

  if (!loading) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-2xl"
    >
      {/* Soft floor glow — Aceternity-style */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[420px] -translate-x-1/2 -translate-y-[15%] rounded-full bg-sky-500/30 blur-3xl"
      />

      {closable ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      ) : null}

      {/* Steps — the active step is centered; completed slide up, upcoming slide down */}
      <ol className="relative">
        {steps.map((step, idx) => {
          const state =
            idx < current
              ? "complete"
              : idx === current
                ? "active"
                : "upcoming";
          const distance = idx - current;
          const opacity =
            distance < 0
              ? Math.max(0.1, 1 + distance * 0.25)
              : distance === 0
                ? 1
                : Math.max(0.1, 1 - distance * 0.25);

          return (
            <li
              key={idx}
              aria-current={state === "active" ? "step" : undefined}
              className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                top: "50%",
                transform: `translate(-50%, calc(-50% + ${distance * 44}px))`,
                opacity,
              }}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                  state === "complete" &&
                    "bg-foreground/15 text-foreground/70",
                  state === "active" &&
                    "bg-emerald-500 text-white shadow-[0_0_24px_rgba(16,185,129,0.55)]",
                  state === "upcoming" &&
                    "bg-foreground/5 text-foreground/40 ring-1 ring-foreground/10"
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span
                className={cn(
                  "text-base font-medium transition-colors md:text-lg",
                  state === "complete" && "text-foreground/60",
                  state === "active" && "text-emerald-400",
                  state === "upcoming" && "text-muted-foreground/60"
                )}
              >
                {step.text}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export { MultiStepLoader };
