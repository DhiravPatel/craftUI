import * as React from "react";
import { cn } from "../../lib/cn";

const Timeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("relative flex flex-col", className)}
    {...props}
  />
));
Timeline.displayName = "Timeline";

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  /** Custom marker dot (e.g. an icon). Defaults to a small filled circle. */
  marker?: React.ReactNode;
  /** When true, the connector line below the marker is omitted. Use on the last item. */
  isLast?: boolean;
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, marker, isLast, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "relative flex gap-4 pb-6 last:pb-0",
        isLast && "pb-0",
        className
      )}
      {...props}
    >
      {/* Marker column */}
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
            "[&_svg]:h-3.5 [&_svg]:w-3.5"
          )}
        >
          {marker ?? (
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
          )}
        </div>
        {!isLast ? (
          <span
            aria-hidden
            className="absolute left-1/2 top-7 h-[calc(100%-1.75rem)] w-px -translate-x-1/2 bg-border"
          />
        ) : null}
      </div>
      {/* Content */}
      <div className="min-w-0 flex-1 pt-0.5">{children}</div>
    </li>
  )
);
TimelineItem.displayName = "TimelineItem";

const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
      className
    )}
    {...props}
  />
));
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-semibold tracking-tight", className)}
    {...props}
  />
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineTime = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn("font-mono text-xs text-muted-foreground", className)}
    {...props}
  />
));
TimelineTime.displayName = "TimelineTime";

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-1 text-sm leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
TimelineDescription.displayName = "TimelineDescription";

export {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
};
