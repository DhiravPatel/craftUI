import * as React from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "../../lib/cn";

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Pre-formatted delta string (e.g. "+12.4%"). The trend prop drives the icon and color. */
  delta?: React.ReactNode;
  trend?: "up" | "down" | "flat";
  /** Optional small icon shown opposite the label. */
  icon?: React.ReactNode;
  /** Additional helper text under the value (e.g. "vs. last month"). */
  helper?: React.ReactNode;
}

const trendStyles: Record<NonNullable<StatProps["trend"]>, string> = {
  up: "text-success",
  down: "text-destructive",
  flat: "text-muted-foreground",
};

const trendIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
};

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  (
    {
      className,
      label,
      value,
      delta,
      trend = "flat",
      icon,
      helper,
      ...props
    },
    ref
  ) => {
    const TrendIcon = trendIcon[trend];
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border/60 bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_4px_16px_-6px_rgba(0,0,0,0.05)] transition-shadow",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          {icon ? (
            <span className="text-muted-foreground [&_svg]:h-3.5 [&_svg]:w-3.5">
              {icon}
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        {delta || helper ? (
          <div className="mt-2 flex items-center gap-2 text-xs">
            {delta ? (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-medium",
                  trendStyles[trend]
                )}
              >
                <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
                {delta}
              </span>
            ) : null}
            {helper ? (
              <span className="text-muted-foreground">{helper}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
Stat.displayName = "Stat";

export { Stat };
