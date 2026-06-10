"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PlanUsageMetric {
  /** Label, e.g. "Seats", "Storage". */
  label: string;
  /** Current value. */
  value: number;
  /** Limit. Use Infinity for unlimited. */
  limit: number;
  /** Unit suffix. */
  unit?: string;
  /** Override the rendered count. */
  formatCount?: (value: number, limit: number) => React.ReactNode;
}

export interface PlanCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Plan name, e.g. "Pro", "Team". */
  plan: string;
  /** Status badge text, e.g. "Active", "Trial". */
  status?: string;
  /** Status tone. Default "success". */
  statusTone?: "success" | "warning" | "danger" | "neutral";
  /** Headline price text, e.g. "$20" or "$240/yr". */
  price?: string;
  /** Price suffix shown next to the headline price. */
  priceSuffix?: string;
  /** Renewal date string, e.g. "Renews Jan 15, 2027". */
  renewalText?: string;
  /** One-line plan description. */
  description?: string;
  /** Up to ~3 usage rows shown in the body. */
  usage?: PlanUsageMetric[];
  /** Primary CTA. */
  primaryAction?: { label: string; onClick?: () => void };
  /** Secondary CTA, e.g. "Manage billing". */
  secondaryAction?: { label: string; onClick?: () => void };
  /** Accent color. Default sky. */
  accentColor?: string;
}

const TONE_CLASSES: Record<NonNullable<PlanCardProps["statusTone"]>, string> = {
  success: "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/25",
  warning: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/25",
  danger: "bg-rose-400/15 text-rose-300 ring-1 ring-rose-400/25",
  neutral: "bg-white/[0.06] text-white/70 ring-1 ring-white/10",
};

function MiniUsageRow({
  metric,
  accentColor,
}: {
  metric: PlanUsageMetric;
  accentColor: string;
}) {
  const unlimited = !Number.isFinite(metric.limit);
  const frac = unlimited
    ? 0
    : Math.max(0, Math.min(1, metric.value / metric.limit));
  const tone = frac >= 0.9 ? "danger" : frac >= 0.75 ? "warn" : "ok";
  const color =
    tone === "danger"
      ? "rgb(244, 114, 182)"
      : tone === "warn"
        ? "rgb(251, 191, 36)"
        : accentColor;

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-[12px]">
        <span className="truncate text-white/70">{metric.label}</span>
        <span className="text-white/70">
          {metric.formatCount ? (
            metric.formatCount(metric.value, metric.limit)
          ) : (
            <>
              <span className="font-mono tabular-nums">{fmt(metric.value)}</span>
              <span className="text-white/40">
                {" / "}
                {unlimited ? "∞" : fmt(metric.limit)}
                {metric.unit ? ` ${metric.unit}` : ""}
              </span>
            </>
          )}
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
        {unlimited ? (
          <div
            className="h-full"
            style={{
              background: `repeating-linear-gradient(45deg, ${accentColor}33 0 6px, transparent 6px 12px)`,
            }}
          />
        ) : (
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{
              width: `${frac * 100}%`,
              background: color,
            }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * PlanCard — the "current plan" summary card you see at the top of a
 * SaaS billing or settings page. Shows the plan name, a status pill,
 * headline price, renewal date, and a stack of usage rows (with their
 * own progress bars and warning tones), plus two CTA buttons. Distinct
 * from `PricingCards`, which is the plan-comparison grid for marketing
 * pages — this is the in-app billing widget.
 */
const PlanCard = React.forwardRef<HTMLDivElement, PlanCardProps>(
  (
    {
      plan,
      status,
      statusTone = "success",
      price,
      priceSuffix = "/mo",
      renewalText,
      description,
      usage,
      primaryAction,
      secondaryAction,
      accentColor = "rgb(125, 211, 252)",
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-5 text-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]",
          className
        )}
        style={style}
        {...props}
      >
        {/* ambient corner glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-40 blur-3xl"
          style={{ background: accentColor }}
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[11px] uppercase tracking-widest text-white/55">
                  Current plan
                </p>
                {status ? (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest",
                      TONE_CLASSES[statusTone]
                    )}
                  >
                    {status}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                {plan}
              </h3>
              {description ? (
                <p className="mt-1 text-sm text-white/60">{description}</p>
              ) : null}
            </div>
            {price ? (
              <div className="shrink-0 text-right">
                <p className="font-mono text-2xl font-semibold tabular-nums">
                  {price}
                </p>
                {priceSuffix ? (
                  <p className="text-[11px] text-white/45">{priceSuffix}</p>
                ) : null}
              </div>
            ) : null}
          </div>

          {usage && usage.length > 0 ? (
            <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
              {usage.map((u) => (
                <MiniUsageRow key={u.label} metric={u} accentColor={accentColor} />
              ))}
            </div>
          ) : null}

          {renewalText ? (
            <p className="mt-4 text-[12px] text-white/55">{renewalText}</p>
          ) : null}

          {(primaryAction || secondaryAction) && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {primaryAction ? (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className="rounded-md px-3 py-1.5 text-[12px] font-medium text-neutral-950 transition-opacity hover:opacity-90"
                  style={{ background: accentColor }}
                >
                  {primaryAction.label}
                </button>
              ) : null}
              {secondaryAction ? (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className="rounded-md bg-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-white/85 transition-colors hover:bg-white/[0.1]"
                >
                  {secondaryAction.label}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
);
PlanCard.displayName = "PlanCard";

export { PlanCard };
