import * as React from "react";
import { cn } from "../../lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

function Skeleton({
  className,
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      // Gradient + background-position animation creates a sweeping shimmer
      // that reads as "actively loading" — a step beyond the basic pulse.
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-foreground/[0.06] before:to-transparent",
        className
      )}
      style={{ width, height, ...style }}
      role="status"
      aria-busy="true"
      aria-label="Loading"
      {...props}
    />
  );
}

export { Skeleton };
