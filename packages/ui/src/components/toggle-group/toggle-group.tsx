"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { toggleVariants } from "../toggle/toggle";
import type { VariantProps } from "class-variance-authority";

type Variant = VariantProps<typeof toggleVariants>;

interface ToggleGroupContextValue extends Variant {
  type: "single" | "multiple";
  value: string | string[] | undefined;
  onValueChange: (next: string) => void;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null
);

interface ToggleGroupBaseProps extends Variant {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

type ToggleGroupProps =
  | (ToggleGroupBaseProps & {
      type: "single";
      value?: string;
      defaultValue?: string;
      onValueChange?: (value: string) => void;
    })
  | (ToggleGroupBaseProps & {
      type: "multiple";
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
    });

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (props, ref) => {
    const { className, children, type, variant, size, disabled } = props;
    const isMultiple = type === "multiple";

    const [uncontrolled, setUncontrolled] = React.useState<
      string | string[] | undefined
    >(props.defaultValue ?? (isMultiple ? [] : undefined));

    const isControlled = props.value !== undefined;
    const value = isControlled ? props.value : uncontrolled;

    const setValue = (next: string) => {
      if (isMultiple) {
        const current = (value as string[] | undefined) ?? [];
        const updated = current.includes(next)
          ? current.filter((v) => v !== next)
          : [...current, next];
        if (!isControlled) setUncontrolled(updated);
        (props.onValueChange as (v: string[]) => void | undefined)?.(updated);
      } else {
        const updated = value === next ? "" : next;
        if (!isControlled) setUncontrolled(updated);
        (props.onValueChange as (v: string) => void | undefined)?.(updated);
      }
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cn("inline-flex items-center gap-1", className)}
      >
        <ToggleGroupContext.Provider
          value={{
            type,
            value,
            onValueChange: setValue,
            variant,
            size,
          }}
        >
          {disabled
            ? React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(
                      child as React.ReactElement<{ disabled?: boolean }>,
                      { disabled: true }
                    )
                  : child
              )
            : children}
        </ToggleGroupContext.Provider>
      </div>
    );
  }
);
ToggleGroup.displayName = "ToggleGroup";

export interface ToggleGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  variant?: Variant["variant"];
  size?: Variant["size"];
}

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, value, variant, size, ...props }, ref) => {
  const ctx = React.useContext(ToggleGroupContext);
  if (!ctx) throw new Error("ToggleGroupItem must be inside <ToggleGroup>");

  const isPressed =
    ctx.type === "multiple"
      ? (ctx.value as string[] | undefined)?.includes(value)
      : ctx.value === value;

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isPressed}
      data-state={isPressed ? "on" : "off"}
      className={cn(
        toggleVariants({
          variant: variant ?? ctx.variant,
          size: size ?? ctx.size,
          className,
        })
      )}
      onClick={() => ctx.onValueChange(value)}
      {...props}
    />
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
