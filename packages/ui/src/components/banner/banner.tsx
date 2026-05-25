"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type BannerVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "promo";

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Visual tone. "promo" uses a gradient for announcements. Default "info". */
  variant?: BannerVariant;
  /** Leading icon. Pass a node to override, or `false` to hide it. */
  icon?: React.ReactNode | false;
  /** Trailing call-to-action (a link or button). */
  action?: React.ReactNode;
  /** Show the dismiss (×) button. Default true. */
  dismissible?: boolean;
  /** Controlled visibility. */
  open?: boolean;
  /** Initial visibility when uncontrolled. Default true. */
  defaultOpen?: boolean;
  /** Fired when the banner is dismissed. */
  onDismiss?: () => void;
  /** Stick to the top of the viewport while scrolling. Default false. */
  sticky?: boolean;
  /** Center the message instead of left-aligning it. Default false. */
  center?: boolean;
}

const VARIANTS: Record<
  BannerVariant,
  { bg: string; fg: string; border: string; ring: string }
> = {
  info: {
    bg: "rgba(56, 189, 248, 0.12)",
    fg: "rgb(125, 211, 252)",
    border: "rgba(56, 189, 248, 0.28)",
    ring: "rgba(56, 189, 248, 0.18)",
  },
  success: {
    bg: "rgba(34, 197, 94, 0.12)",
    fg: "rgb(74, 222, 128)",
    border: "rgba(34, 197, 94, 0.28)",
    ring: "rgba(34, 197, 94, 0.18)",
  },
  warning: {
    bg: "rgba(234, 179, 8, 0.12)",
    fg: "rgb(250, 204, 21)",
    border: "rgba(234, 179, 8, 0.3)",
    ring: "rgba(234, 179, 8, 0.18)",
  },
  danger: {
    bg: "rgba(239, 68, 68, 0.12)",
    fg: "rgb(248, 113, 113)",
    border: "rgba(239, 68, 68, 0.3)",
    ring: "rgba(239, 68, 68, 0.18)",
  },
  promo: {
    bg: "linear-gradient(90deg, rgba(125,211,252,0.16), rgba(168,85,247,0.16))",
    fg: "rgb(216, 180, 254)",
    border: "rgba(168, 85, 247, 0.3)",
    ring: "rgba(168, 85, 247, 0.18)",
  },
};

function DefaultIcon({ variant }: { variant: BannerVariant }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 16,
    height: 16,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (variant) {
    case "success":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "warning":
      return (
        <svg {...common}>
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );
    case "danger":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6M9 9l6 6" />
        </svg>
      );
    case "promo":
      return (
        <svg {...common}>
          <path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
  }
}

/**
 * Banner — a full-width announcement bar for product updates, promos, or
 * status notices. Five tones, an optional leading icon and trailing CTA, an
 * optional sticky position, and a dismiss button. Works controlled (via
 * `open`) or uncontrolled, calling `onDismiss` when closed.
 */
const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      variant = "info",
      icon,
      action,
      dismissible = true,
      open,
      defaultOpen = true,
      onDismiss,
      sticky = false,
      center = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = open !== undefined;
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const visible = isControlled ? open! : internalOpen;

    const dismiss = () => {
      if (!isControlled) setInternalOpen(false);
      onDismiss?.();
    };

    if (!visible) return null;
    const v = VARIANTS[variant];

    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          "flex w-full items-center gap-3 border-b px-4 py-2.5 text-sm",
          sticky && "sticky top-0 z-40",
          className
        )}
        style={{
          background: v.bg,
          borderColor: v.border,
          color: v.fg,
          ...style,
        }}
        {...props}
      >
        {icon !== false ? (
          <span className="flex shrink-0 items-center" style={{ color: v.fg }}>
            {icon ?? <DefaultIcon variant={variant} />}
          </span>
        ) : null}

        <div
          className={cn(
            "min-w-0 flex-1 text-foreground/90",
            center && "text-center"
          )}
        >
          {children}
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}

        {dismissible ? (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={dismiss}
            className="-mr-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-foreground/50 transition-colors hover:bg-foreground/10 hover:text-foreground/80"
          >
            <svg
              viewBox="0 0 24 24"
              width={14}
              height={14}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </div>
    );
  }
);
Banner.displayName = "Banner";

export { Banner };
