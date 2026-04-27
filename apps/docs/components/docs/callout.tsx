import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@craftui/utils";

const calloutVariants = cva(
  "relative my-6 rounded-lg border p-4 text-sm [&>p]:m-0",
  {
    variants: {
      variant: {
        note: "border-border bg-muted/40 text-foreground",
        info: "border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.06)] text-foreground",
        warning:
          "border-[hsl(var(--warning)/0.4)] bg-[hsl(var(--warning)/0.08)] text-foreground [&>.icon]:text-warning",
        danger:
          "border-[hsl(var(--destructive)/0.4)] bg-[hsl(var(--destructive)/0.08)] text-foreground [&>.icon]:text-destructive",
        tip: "border-[hsl(var(--success)/0.4)] bg-[hsl(var(--success)/0.08)] text-foreground [&>.icon]:text-success",
      },
    },
    defaultVariants: { variant: "note" },
  }
);

const icons = {
  note: Info,
  info: Info,
  warning: TriangleAlert,
  danger: AlertCircle,
  tip: Lightbulb,
};

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string;
}

export function Callout({
  className,
  variant,
  title,
  children,
  ...props
}: CalloutProps) {
  const Icon = icons[variant ?? "note"];
  return (
    <div className={cn(calloutVariants({ variant }), className)} {...props}>
      <div className="flex gap-3">
        <Icon className="icon mt-0.5 h-4 w-4 shrink-0" />
        <div className="flex-1 space-y-1">
          {title ? (
            <p className="font-semibold leading-tight">{title}</p>
          ) : null}
          <div className="text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}
