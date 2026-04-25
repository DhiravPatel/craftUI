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
      className={cn("animate-pulse rounded-md bg-muted", className)}
      style={{ width, height, ...style }}
      role="status"
      aria-busy="true"
      aria-label="Loading"
      {...props}
    />
  );
}

export { Skeleton };
