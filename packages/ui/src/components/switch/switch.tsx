"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../lib/cn";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      // Inset shadow on the track adds depth that flat fills don't have.
      "peer inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        // Subtle vertical gradient + soft drop shadow makes the thumb pop.
        "pointer-events-none block h-[18px] w-[18px] rounded-full bg-gradient-to-b from-white to-white/85 shadow-[0_1px_3px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)] ring-0 transition-transform duration-200 ease-out data-[state=checked]:translate-x-[19px] data-[state=unchecked]:translate-x-[1px]"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
