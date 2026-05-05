"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PricingTier {
  id: string | number;
  /** Tier name, e.g. "Starter", "Pro". */
  name: string;
  /** Optional one-line tagline shown under the name. */
  tagline?: string;
  /** Numeric price (per `period`). When `null`, treated as a "Custom"/"Contact us" tier. */
  price: number | null;
  /** Currency symbol prefix. Default "$". */
  currency?: string;
  /** Period label shown after the price, e.g. "/mo". Default "/mo". */
  period?: string;
  /** List of included features, each rendered with a checkmark. */
  features: string[];
  /** Call-to-action button label. */
  ctaLabel?: string;
  /** Click handler for the CTA. */
  onCtaClick?: () => void;
  /** When true, this tier is rendered elevated and highlighted. */
  featured?: boolean;
  /** Tag shown above a featured tier (e.g. "Most popular"). */
  badge?: string;
}

export interface PricingCardsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tiers: PricingTier[];
  /** Currency applied to tiers that don't override it. Default "$". */
  currency?: string;
  /** Period applied to tiers that don't override it. Default "/mo". */
  period?: string;
  /** Width of each card in px. Default 280. */
  cardWidth?: number;
}

/**
 * PricingCards — a row of pricing tiers, with the featured tier visually
 * elevated above its neighbors and given a subtle glow. Each card lifts
 * further on hover. Drop into any landing-page pricing section.
 */
const PricingCards = React.forwardRef<HTMLDivElement, PricingCardsProps>(
  (
    {
      tiers,
      currency = "$",
      period = "/mo",
      cardWidth = 280,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-stretch justify-center gap-5", className)}
        style={style}
        {...props}
      >
        {tiers.map((tier) => {
          const isFeatured = !!tier.featured;
          const cur = tier.currency ?? currency;
          const per = tier.period ?? period;
          return (
            <div
              key={tier.id}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border bg-neutral-950 p-6 text-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isFeatured
                  ? "border-sky-400/40 shadow-[0_30px_60px_-20px_rgba(56,189,248,0.45)]"
                  : "border-white/10 shadow-[0_18px_36px_-18px_rgba(0,0,0,0.5)]"
              )}
              style={{
                width: cardWidth,
                transform: isFeatured ? "translateY(-12px)" : "translateY(0)",
              }}
            >
              {/* Hover lift — applied via class so it stacks with the
                  featured offset for an extra step up on hover. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: isFeatured
                    ? "radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 60%)"
                    : "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 60%)",
                }}
              />

              {tier.badge && isFeatured ? (
                <span className="absolute right-5 top-5 inline-flex items-center rounded-full bg-sky-400/20 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-sky-200">
                  {tier.badge}
                </span>
              ) : null}

              <div>
                <p className="text-sm font-semibold">{tier.name}</p>
                {tier.tagline ? (
                  <p className="mt-1 text-xs text-white/60">{tier.tagline}</p>
                ) : null}
              </div>

              <div className="mt-5 flex items-baseline gap-1">
                {tier.price === null ? (
                  <span className="text-3xl font-bold tracking-tight">
                    Custom
                  </span>
                ) : (
                  <>
                    <span className="text-sm font-medium text-white/60">
                      {cur}
                    </span>
                    <span className="text-4xl font-bold tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-sm text-white/60">{per}</span>
                  </>
                )}
              </div>

              <ul className="mt-6 space-y-2.5 text-sm">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/85">
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      width={14}
                      height={14}
                      fill="none"
                      stroke={isFeatured ? "rgb(125, 211, 252)" : "rgb(163, 230, 53)"}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* mt-auto sticks the CTA to the bottom of the flex column so
                  every card's button aligns at the same Y, regardless of
                  how many features the tier lists. The pt-6 spacer below
                  the features list keeps a minimum gap above the button. */}
              <div aria-hidden className="pt-6" />
              <button
                type="button"
                onClick={tier.onCtaClick}
                className={cn(
                  "relative mt-auto inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-shadow",
                  isFeatured
                    ? "bg-sky-400 text-neutral-950 hover:shadow-[0_18px_36px_-12px_rgba(56,189,248,0.6)]"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                )}
              >
                {tier.ctaLabel ?? (tier.price === null ? "Contact us" : "Get started")}
              </button>
            </div>
          );
        })}
      </div>
    );
  }
);
PricingCards.displayName = "PricingCards";

export { PricingCards };
