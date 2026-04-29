import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

export interface StepperStep {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: StepperStep[];
  /** Zero-indexed current step. Steps before are completed; after are upcoming. */
  current: number;
  orientation?: "horizontal" | "vertical";
}

const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  (
    { className, steps, current, orientation = "horizontal", ...props },
    ref
  ) => {
    const isVertical = orientation === "vertical";
    return (
      <ol
        ref={ref}
        className={cn(
          isVertical ? "flex flex-col gap-1" : "flex w-full items-start",
          className
        )}
        aria-label="Progress"
        {...props}
      >
        {steps.map((step, index) => {
          const state =
            index < current
              ? "complete"
              : index === current
                ? "current"
                : "upcoming";
          const isLast = index === steps.length - 1;
          return (
            <li
              key={index}
              className={cn(
                "relative",
                isVertical ? "flex gap-3 pb-6 last:pb-0" : "flex-1"
              )}
              aria-current={state === "current" ? "step" : undefined}
            >
              {/* Connector line */}
              {!isLast ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute bg-border transition-colors",
                    isVertical
                      ? "left-[15px] top-8 h-[calc(100%-2rem)] w-px"
                      : "left-[calc(50%+18px)] top-[15px] h-px w-[calc(100%-36px)]",
                    state === "complete" && "bg-foreground"
                  )}
                />
              ) : null}

              <div
                className={cn(
                  isVertical ? "flex gap-3" : "flex flex-col items-center"
                )}
              >
                <span
                  className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    state === "complete" &&
                      "bg-foreground text-background shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
                    state === "current" &&
                      "border-2 border-foreground bg-background text-foreground",
                    state === "upcoming" &&
                      "border border-border bg-background text-muted-foreground"
                  )}
                >
                  {state === "complete" ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    index + 1
                  )}
                </span>

                <div
                  className={cn(
                    isVertical ? "min-w-0 pt-0.5" : "mt-2 text-center"
                  )}
                >
                  <div
                    className={cn(
                      "text-sm font-medium leading-tight",
                      state === "upcoming" && "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description ? (
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }
);
Stepper.displayName = "Stepper";

export { Stepper };
