import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const badgeVariants = cva(
  // Subtle inset highlight on solid badges — looks great on dark primaries.
  "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-[1.2] transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20 [&_svg]:h-3 [&_svg]:w-3",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-primary/85",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-destructive/85",
        success:
          "border-transparent bg-success text-success-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-success/85",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-warning/85",
        outline: "border-border text-foreground hover:bg-muted/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
