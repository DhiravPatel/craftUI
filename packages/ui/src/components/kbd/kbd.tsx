import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const kbdVariants = cva(
  "inline-flex select-none items-center justify-center rounded border border-border/80 bg-muted/40 font-mono font-medium text-foreground/80 shadow-[inset_0_-1px_0_rgba(0,0,0,0.06)]",
  {
    variants: {
      size: {
        sm: "h-4 min-w-[16px] px-1 text-[9px]",
        default: "h-5 min-w-[20px] px-1.5 text-[10px]",
        lg: "h-6 min-w-[24px] px-2 text-xs",
      },
    },
    defaultVariants: { size: "default" },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(kbdVariants({ size, className }))}
      {...props}
    />
  )
);
Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };
