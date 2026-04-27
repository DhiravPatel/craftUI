import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const navbarVariants = cva(
  "sticky top-0 z-40 w-full transition-colors",
  {
    variants: {
      variant: {
        default: "bg-background",
        transparent: "bg-transparent",
        bordered: "bg-background border-b",
      },
    },
    defaultVariants: { variant: "bordered" },
  }
);

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(navbarVariants({ variant }), className)}
      {...props}
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {children}
      </div>
    </header>
  )
);
Navbar.displayName = "Navbar";

const NavbarBrand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 font-semibold", className)}
    {...props}
  />
));
NavbarBrand.displayName = "NavbarBrand";

const NavbarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 items-center gap-6", className)}
    {...props}
  />
));
NavbarContent.displayName = "NavbarContent";

const NavbarActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
NavbarActions.displayName = "NavbarActions";

export { Navbar, NavbarBrand, NavbarContent, NavbarActions, navbarVariants };
