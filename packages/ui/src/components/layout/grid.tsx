import * as React from "react";
import { cn } from "../../lib/cn";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: "none" | "xs" | "sm" | "default" | "md" | "lg" | "xl";
  rowGap?: "none" | "xs" | "sm" | "default" | "md" | "lg" | "xl";
  colGap?: "none" | "xs" | "sm" | "default" | "md" | "lg" | "xl";
}

const colsMap: Record<NonNullable<GridProps["cols"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const gapMap: Record<NonNullable<GridProps["gap"]>, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  default: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

const rowGapMap: Record<NonNullable<GridProps["rowGap"]>, string> = {
  none: "gap-y-0",
  xs: "gap-y-1",
  sm: "gap-y-2",
  default: "gap-y-4",
  md: "gap-y-6",
  lg: "gap-y-8",
  xl: "gap-y-12",
};

const colGapMap: Record<NonNullable<GridProps["colGap"]>, string> = {
  none: "gap-x-0",
  xs: "gap-x-1",
  sm: "gap-x-2",
  default: "gap-x-4",
  md: "gap-x-6",
  lg: "gap-x-8",
  xl: "gap-x-12",
};

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap, rowGap, colGap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid",
        colsMap[cols],
        gap && gapMap[gap],
        rowGap && rowGapMap[rowGap],
        colGap && colGapMap[colGap],
        !gap && !rowGap && !colGap && gapMap.default,
        className
      )}
      {...props}
    />
  )
);
Grid.displayName = "Grid";

export { Grid };
