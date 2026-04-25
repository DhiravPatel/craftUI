import * as React from "react";
import { cn } from "../../lib/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const inputBase =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leftElement, rightElement, ...props }, ref) => {
    if (leftElement || rightElement) {
      return (
        <div className="relative flex items-center">
          {leftElement ? (
            <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
              {leftElement}
            </div>
          ) : null}
          <input
            type={type}
            className={cn(
              inputBase,
              error && "border-destructive focus-visible:ring-destructive",
              leftElement && "pl-10",
              rightElement && "pr-10",
              className
            )}
            ref={ref}
            aria-invalid={error || undefined}
            {...props}
          />
          {rightElement ? (
            <div className="absolute right-3 flex items-center text-muted-foreground">
              {rightElement}
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          inputBase,
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
