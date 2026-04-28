import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  // Base: smooth motion, focus halo, slight press, contained icons.
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium outline-none transition-[transform,background-color,box-shadow,border-color,color] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Inset top-edge highlight + soft drop shadow gives that "premium" feel.
        default:
          "bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(0,0,0,0.12)] hover:bg-primary/[0.92] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_4px_rgba(0,0,0,0.1),0_6px_16px_-4px_rgba(0,0,0,0.18)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(220,38,38,0.25)] hover:bg-destructive/[0.92]",
        outline:
          "border border-input bg-background text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:border-foreground/30 hover:bg-accent hover:text-accent-foreground hover:shadow-[0_2px_6px_-2px_rgba(0,0,0,0.08)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 text-sm [&_svg]:h-4 [&_svg]:w-4",
        sm: "h-8 rounded-md px-3 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
        lg: "h-11 rounded-lg px-6 text-sm [&_svg]:h-4 [&_svg]:w-4",
        icon: "h-9 w-9 [&_svg]:h-4 [&_svg]:w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    const content = (
      <>
        {loading ? (
          <Loader2
            data-testid="spinner"
            className="h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        ) : leftIcon ? (
          <span className="inline-flex h-4 w-4 items-center" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}
        {children}
        {rightIcon && !loading ? (
          <span className="inline-flex h-4 w-4 items-center" aria-hidden="true">
            {rightIcon}
          </span>
        ) : null}
      </>
    );

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          aria-disabled={isDisabled || undefined}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
