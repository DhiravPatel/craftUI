"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/cn";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  // Render one thumb per value so range mode works automatically.
  const values = (value ?? defaultValue ?? [0]) as number[];
  return (
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
        <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-primary to-primary/85" />
      </SliderPrimitive.Track>
      {values.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          // Vertical gradient + layered shadow gives the thumb a tactile "lifted" look.
          className="block h-[18px] w-[18px] rounded-full border-0 bg-gradient-to-b from-white to-white/85 shadow-[0_1px_3px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)] transition-transform duration-150 ease-out hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-foreground/15 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
