"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PricingSliderTier {
  /** Quantity at or above which this discount applies. */
  from: number;
  /** Decimal discount applied — 0.1 = 10% off. */
  discount: number;
  /** Optional label shown in the tier strip. */
  label?: string;
}

export interface PricingSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Minimum quantity. Default 1. */
  min?: number;
  /** Maximum quantity. Default 100. */
  max?: number;
  /** Step between values. Default 1. */
  step?: number;
  /** Initial quantity (uncontrolled). */
  defaultValue?: number;
  /** Controlled quantity. */
  value?: number;
  /** Per-unit price before any discount. */
  pricePerUnit: number;
  /** Currency symbol shown before the total. Default "$". */
  currency?: string;
  /** Unit label, singular form. Default "seat". */
  unit?: string;
  /** Billing cadence label. Default "month". */
  cadence?: string;
  /** Discount tiers, sorted ascending by `from`. */
  tiers?: PricingSliderTier[];
  /** Fires with (quantity, total) whenever the slider moves. */
  onChange?: (quantity: number, total: number) => void;
  /** Optional CTA rendered under the total. */
  cta?: React.ReactNode;
  /** Accent color. Default sky. */
  accentColor?: string;
}

function activeTier(qty: number, tiers: PricingSliderTier[] | undefined) {
  if (!tiers) return undefined;
  let best: PricingSliderTier | undefined;
  for (const t of tiers) {
    if (qty >= t.from) best = t;
  }
  return best;
}

/**
 * PricingSlider — an interactive seat / usage calculator for SaaS pricing
 * pages. Drag the slider to set quantity; the total updates live with any
 * tier discount applied. Renders a tier strip beneath the track so users
 * can see the breakpoints they're approaching. Self-contained — no
 * dependencies, dark `neutral-950` + sky accent.
 */
const PricingSlider = React.forwardRef<HTMLDivElement, PricingSliderProps>(
  (
    {
      min = 1,
      max = 100,
      step = 1,
      defaultValue,
      value,
      pricePerUnit,
      currency = "$",
      unit = "seat",
      cadence = "month",
      tiers,
      onChange,
      cta,
      accentColor = "rgb(125, 211, 252)",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<number>(
      defaultValue ?? min
    );
    const qty = isControlled ? value! : internal;
    const clamped = Math.max(min, Math.min(max, qty));
    const tier = activeTier(clamped, tiers);
    const discount = tier?.discount ?? 0;
    const subtotal = clamped * pricePerUnit;
    const total = subtotal * (1 - discount);

    const fmt = (n: number) =>
      n.toLocaleString(undefined, {
        minimumFractionDigits: n % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
      });

    const update = (n: number) => {
      const next = Math.max(min, Math.min(max, n));
      if (!isControlled) setInternal(next);
      onChange?.(next, next * pricePerUnit * (1 - (activeTier(next, tiers)?.discount ?? 0)));
    };

    const percent = ((clamped - min) / (max - min)) * 100;

    // Tier markers along the track.
    const markers = React.useMemo(() => {
      if (!tiers) return [];
      return tiers
        .filter((t) => t.from > min && t.from < max)
        .map((t) => ({
          ...t,
          left: ((t.from - min) / (max - min)) * 100,
        }));
    }, [tiers, min, max]);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-6 text-white",
          className
        )}
        style={style}
        {...props}
      >
        <div className="flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-widest text-white/55">
            {unit.charAt(0).toUpperCase() + unit.slice(1)}s
          </p>
          <p className="font-mono text-2xl font-semibold tabular-nums">
            {clamped}
          </p>
        </div>

        {/* Slider */}
        <div className="relative mt-4">
          <div className="relative h-2 rounded-full bg-white/[0.08]">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${percent}%`,
                background: `linear-gradient(90deg, ${accentColor}, white)`,
                boxShadow: `0 0 12px ${accentColor}`,
              }}
            />
            {markers.map((m) => (
              <span
                key={m.from}
                aria-hidden
                className="absolute top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-white/30"
                style={{ left: `${m.left}%` }}
                title={`${m.from}+ ${unit}s · ${Math.round(m.discount * 100)}% off`}
              />
            ))}
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={clamped}
            onChange={(e) => update(parseInt(e.target.value, 10))}
            aria-label={`Number of ${unit}s`}
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
          />
          {/* Visible thumb */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{
              left: `${percent}%`,
              transition: "left 80ms linear",
            }}
          >
            <span
              className="block h-5 w-5 rounded-full border-2 border-neutral-950"
              style={{
                background: accentColor,
                boxShadow: `0 0 0 1px ${accentColor}, 0 4px 14px ${accentColor}66`,
              }}
            />
          </span>
        </div>

        {/* Tier strip */}
        {tiers && tiers.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tiers.map((t) => {
              const isActive = tier?.from === t.from;
              return (
                <span
                  key={t.from}
                  className={cn(
                    "rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
                    isActive
                      ? "text-neutral-950"
                      : "bg-white/[0.06] text-white/60"
                  )}
                  style={isActive ? { background: accentColor } : undefined}
                >
                  {t.label ?? `${t.from}+ ${unit}s`} · {Math.round(t.discount * 100)}% off
                </span>
              );
            })}
          </div>
        ) : null}

        {/* Total */}
        <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-xs text-white/55">Total per {cadence}</p>
            {discount > 0 ? (
              <p className="mt-0.5 text-[11px] text-white/40 line-through">
                {currency}
                {fmt(subtotal)}
              </p>
            ) : null}
          </div>
          <p className="font-mono text-3xl font-semibold tabular-nums">
            {currency}
            {fmt(total)}
          </p>
        </div>

        {cta ? <div className="mt-4">{cta}</div> : null}
      </div>
    );
  }
);
PricingSlider.displayName = "PricingSlider";

export { PricingSlider };
