import * as React from "react";
import { cn } from "../../lib/cn";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-background px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      {icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] [&_svg]:h-5 [&_svg]:w-5">
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      {description ? (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
