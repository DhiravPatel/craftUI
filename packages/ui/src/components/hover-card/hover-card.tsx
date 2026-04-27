"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/cn";

interface HoverCardContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  openDelay: number;
  closeDelay: number;
  triggerRef: React.RefObject<HTMLElement>;
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(
  null
);

export interface HoverCardProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function HoverCard({
  children,
  openDelay = 200,
  closeDelay = 150,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
}: HoverCardProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolled;
  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolled(next);
    onOpenChange?.(next);
  };
  const triggerRef = React.useRef<HTMLElement>(null);

  return (
    <HoverCardContext.Provider
      value={{ open, setOpen, openDelay, closeDelay, triggerRef }}
    >
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        {children}
      </PopoverPrimitive.Root>
    </HoverCardContext.Provider>
  );
}

const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
  const ctx = React.useContext(HoverCardContext);
  if (!ctx) throw new Error("HoverCardTrigger must be inside <HoverCard>");
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>();

  const open = (delay: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => ctx.setOpen(true), delay);
  };
  const close = (delay: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => ctx.setOpen(false), delay);
  };

  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        open(ctx.openDelay);
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        close(ctx.closeDelay);
      }}
      onFocus={(event) => {
        onFocus?.(event);
        open(0);
      }}
      onBlur={(event) => {
        onBlur?.(event);
        close(0);
      }}
      {...props}
    />
  );
});
HoverCardTrigger.displayName = "HoverCardTrigger";

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
  (
    { className, align = "center", sideOffset = 4, onMouseEnter, onMouseLeave, ...props },
    ref
  ) => {
    const ctx = React.useContext(HoverCardContext);
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          onMouseEnter={(event) => {
            onMouseEnter?.(event);
            ctx?.setOpen(true);
          }}
          onMouseLeave={(event) => {
            onMouseLeave?.(event);
            ctx?.setOpen(false);
          }}
          onOpenAutoFocus={(event) => event.preventDefault()}
          className={cn(
            "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    );
  }
);
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
