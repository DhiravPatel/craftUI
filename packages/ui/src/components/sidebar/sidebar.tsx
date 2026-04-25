"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const sidebarVariants = cva(
  "flex flex-col border-r bg-background transition-[width] duration-200",
  {
    variants: {
      variant: {
        default: "",
        floating: "m-2 rounded-lg border shadow-sm",
      },
      state: {
        expanded: "w-64",
        collapsed: "w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "expanded",
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    Omit<VariantProps<typeof sidebarVariants>, "state"> {
  collapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, variant, collapsed = false, children, ...props }, ref) => (
    <aside
      ref={ref}
      data-state={collapsed ? "collapsed" : "expanded"}
      className={cn(
        sidebarVariants({
          variant,
          state: collapsed ? "collapsed" : "expanded",
        }),
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-14 items-center gap-2 border-b px-4", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto p-2", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-t p-2", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarNavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }
>(({ className, active, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
      active && "bg-accent text-accent-foreground",
      className
    )}
    {...props}
  />
));
SidebarNavItem.displayName = "SidebarNavItem";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNavItem,
  sidebarVariants,
};
