"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "unknown";

export interface PaymentCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Raw card number (digits or with spaces). Auto-formatted on display. */
  number?: string;
  /** Cardholder name shown on the front. */
  name?: string;
  /** Expiry in MM/YY form. */
  expiry?: string;
  /** CVV — shown on the back. */
  cvv?: string;
  /** Show the back side. */
  flipped?: boolean;
  /** Override the auto-detected brand. */
  brand?: CardBrand;
  /** Width of the card in px. Default 360. */
  width?: number;
  /** Background gradient. Defaults to a deep sky/indigo blend. */
  background?: string;
}

/** Naive prefix-based brand detection — covers the common cases. */
function detectBrand(num: string): CardBrand {
  const digits = num.replace(/\D/g, "");
  if (/^4/.test(digits)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^6(011|5)/.test(digits)) return "discover";
  return "unknown";
}

/** Format a card number — Amex uses 4-6-5, everyone else 4-4-4-4. */
function formatNumber(num: string, brand: CardBrand): string {
  const d = num.replace(/\D/g, "").slice(0, brand === "amex" ? 15 : 16);
  if (brand === "amex") {
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)]
      .filter(Boolean)
      .join(" ");
  }
  return (d.match(/.{1,4}/g) || []).join(" ");
}

function BrandMark({ brand }: { brand: CardBrand }) {
  const common = "h-7 select-none";
  if (brand === "visa") {
    return (
      <span
        className={cn(common, "font-serif text-2xl font-bold italic tracking-tight text-white")}
      >
        VISA
      </span>
    );
  }
  if (brand === "mastercard") {
    return (
      <span className={cn(common, "relative flex items-center")} aria-label="Mastercard">
        <span className="block h-7 w-7 rounded-full bg-[#eb001b]" />
        <span className="-ml-3 block h-7 w-7 rounded-full bg-[#f79e1b] mix-blend-screen" />
      </span>
    );
  }
  if (brand === "amex") {
    return (
      <span className={cn(common, "rounded-md bg-[#2e77bb] px-2 py-1 text-[11px] font-bold uppercase tracking-widest text-white")}>
        Amex
      </span>
    );
  }
  if (brand === "discover") {
    return (
      <span className={cn(common, "rounded-full bg-[#ff6000] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white")}>
        Discover
      </span>
    );
  }
  return (
    <span className={cn(common, "rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70")}>
      Card
    </span>
  );
}

/**
 * PaymentCard — a live-binding credit-card preview. Pass the form values
 * (`number`, `name`, `expiry`, `cvv`) and the card renders them in their
 * proper positions, formats the number per brand, and auto-detects the
 * brand from the prefix. Toggle `flipped` to reveal the back side with the
 * CVV (typically driven by the CVV input's focus). Pure CSS 3D — no
 * dependencies.
 */
const PaymentCard = React.forwardRef<HTMLDivElement, PaymentCardProps>(
  (
    {
      number = "",
      name = "",
      expiry = "",
      cvv = "",
      flipped = false,
      brand: brandProp,
      width = 360,
      background = "linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 58, 138) 45%, rgb(125, 211, 252) 110%)",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const brand = brandProp ?? detectBrand(number);
    const formatted = formatNumber(number, brand);
    const maxLen = brand === "amex" ? 17 : 19; // 15+2 spaces vs 16+3 spaces
    const placeholder =
      brand === "amex" ? "•••• •••••• •••••" : "•••• •••• •••• ••••";
    // Pad missing positions with bullets so the field always reads as a card.
    const displayNumber = formatted
      .padEnd(maxLen, placeholder.charAt(formatted.length))
      .slice(0, maxLen);

    const height = width * 0.6;

    const surface: React.CSSProperties = {
      position: "absolute",
      inset: 0,
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      borderRadius: 20,
      background,
      color: "white",
      boxShadow:
        "0 26px 48px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)",
      overflow: "hidden",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-block", className)}
        style={{ width, height, perspective: 1400, ...style }}
        {...props}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${flipped ? 180 : 0}deg)`,
            transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Front */}
          <div style={surface}>
            {/* sheen */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-1 opacity-60"
              style={{
                background:
                  "radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,0.22), transparent 60%)",
              }}
            />
            <div className="relative flex h-full flex-col justify-between p-5">
              <div className="flex items-start justify-between">
                {/* Chip */}
                <span
                  aria-hidden
                  className="flex h-8 w-10 items-center justify-center rounded-md"
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(253, 224, 71), rgb(202, 138, 4))",
                    boxShadow:
                      "inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 -4px 6px rgba(0,0,0,0.25)",
                  }}
                >
                  <span
                    className="block h-4 w-6 rounded-sm"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 5px), repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 5px)",
                    }}
                  />
                </span>
                <BrandMark brand={brand} />
              </div>

              <p className="font-mono text-[20px] tracking-[0.18em] [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                {displayNumber}
              </p>

              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/55">
                    Card holder
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium uppercase tracking-wider">
                    {name || "FULL NAME"}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/55">
                    Expires
                  </p>
                  <p className="mt-0.5 font-mono text-sm tracking-wider">
                    {expiry || "MM/YY"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            style={{
              ...surface,
              transform: "rotateY(180deg)",
            }}
          >
            {/* magnetic stripe */}
            <span
              aria-hidden
              className="absolute left-0 right-0 top-6 h-10"
              style={{ background: "rgba(0,0,0,0.85)" }}
            />
            <div className="absolute left-5 right-5 top-[88px] flex items-center gap-3">
              {/* signature strip */}
              <div className="relative h-9 flex-1 rounded-[4px] bg-white/95 text-neutral-900">
                <span
                  className="absolute inset-0 rounded-[4px]"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg, rgba(15,23,42,0.06) 0 6px, transparent 6px 12px)",
                  }}
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-sm tracking-widest text-neutral-700">
                  {(cvv || "•••").slice(0, brand === "amex" ? 4 : 3)}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/55">
                CVV
              </span>
            </div>
            <p className="absolute bottom-5 left-5 right-5 text-[10px] leading-snug text-white/55">
              This card is property of the issuing bank. Use of this card
              constitutes acceptance of the cardholder agreement.
            </p>
          </div>
        </div>
      </div>
    );
  }
);
PaymentCard.displayName = "PaymentCard";

export { PaymentCard };
