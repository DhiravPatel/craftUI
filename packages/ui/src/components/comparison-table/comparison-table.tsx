"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

/** A column in the table — typically a pricing plan or product tier. */
export interface ComparisonPlan {
  /** Unique key used to look up each feature's value. */
  id: string;
  /** Plan name, e.g. "Pro". */
  name: string;
  /** Optional price string, e.g. "$29/mo". */
  price?: string;
  /** Optional one-line descriptor under the name. */
  tagline?: string;
  /** Highlight this column (accent border + "Popular" ribbon). */
  highlighted?: boolean;
  /** Optional badge text shown on a highlighted column. Default "Popular". */
  badge?: string;
  /** Optional call-to-action rendered in the footer row. */
  cta?: React.ReactNode;
}

/**
 * A feature row. `values` maps a plan id to its cell content:
 *   - `true` / `false` render a check / dash
 *   - a string or number renders verbatim
 *   - a ReactNode renders as-is
 */
export interface ComparisonFeature {
  /** Row label shown in the left column. */
  label: string;
  /** Optional helper text shown under the label. */
  hint?: string;
  /** Per-plan cell values, keyed by plan id. Missing keys render as a dash. */
  values: Record<string, boolean | string | number | React.ReactNode>;
}

/** An optional group header that spans the row, used to section features. */
export interface ComparisonGroup {
  /** Section heading, e.g. "Collaboration". */
  group: string;
  /** Features within this section. */
  features: ComparisonFeature[];
}

export interface ComparisonTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Columns to compare. */
  plans: ComparisonPlan[];
  /** Rows — either a flat list of features or grouped sections. */
  features: ComparisonFeature[] | ComparisonGroup[];
  /** Label for the top-left (features) cell. Default "Features". */
  featuresLabel?: string;
  /** Accent color for highlighted columns + check marks. Default sky-400. */
  accent?: string;
  /** Keep the header row stuck to the top on scroll. Default true. */
  stickyHeader?: boolean;
  /** Tint alternating rows for readability. Default true. */
  zebra?: boolean;
}

function isGrouped(
  features: ComparisonFeature[] | ComparisonGroup[]
): features is ComparisonGroup[] {
  return (
    features.length > 0 &&
    typeof (features as ComparisonGroup[])[0]!.group === "string"
  );
}

function CheckGlyph({ color }: { color: string }) {
  return (
    <svg
      aria-label="Included"
      role="img"
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      className="mx-auto"
    >
      <circle cx={12} cy={12} r={11} fill={`color-mix(in oklab, ${color} 16%, transparent)`} />
      <path
        d="M7 12.5l3.2 3.2L17 9"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashGlyph() {
  return (
    <span
      aria-label="Not included"
      role="img"
      className="mx-auto block h-px w-3.5 bg-white/25"
    />
  );
}

/** Render a single cell value based on its type. */
function renderValue(
  value: boolean | string | number | React.ReactNode | undefined,
  accent: string
): React.ReactNode {
  if (value === true) return <CheckGlyph color={accent} />;
  if (value === false || value === undefined || value === null)
    return <DashGlyph />;
  if (typeof value === "string" || typeof value === "number")
    return <span className="text-sm text-white/85">{value}</span>;
  return value;
}

/**
 * ComparisonTable — a plan / feature comparison matrix for pricing pages.
 * Columns are plans (one can be highlighted with a "Popular" ribbon), rows
 * are features that can be grouped into sections. Cell values accept
 * booleans (rendered as check / dash), strings, numbers, or any node, plus
 * an optional CTA row in the footer.
 */
const ComparisonTable = React.forwardRef<HTMLDivElement, ComparisonTableProps>(
  (
    {
      plans,
      features,
      featuresLabel = "Features",
      accent = "rgb(125, 211, 252)",
      stickyHeader = true,
      zebra = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const grouped = isGrouped(features);
    const hasCta = plans.some((p) => p.cta != null);

    // Flatten to render rows uniformly while tracking group boundaries.
    const rows = React.useMemo(() => {
      if (grouped) {
        return (features as ComparisonGroup[]).flatMap((g) => [
          { kind: "group" as const, label: g.group },
          ...g.features.map((f) => ({ kind: "feature" as const, feature: f })),
        ]);
      }
      return (features as ComparisonFeature[]).map((f) => ({
        kind: "feature" as const,
        feature: f,
      }));
    }, [features, grouped]);

    const gridTemplate = `minmax(150px, 1.4fr) repeat(${plans.length}, minmax(96px, 1fr))`;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full overflow-x-auto rounded-2xl border border-white/10 bg-neutral-950 text-white shadow-[0_18px_36px_-18px_rgba(0,0,0,0.55)]",
          className
        )}
        style={style}
        role="table"
        aria-label="Plan comparison"
        {...props}
      >
        <div className="min-w-[560px]">
          {/* Header */}
          <div
            role="row"
            className={cn(
              "grid border-b border-white/10 bg-neutral-950",
              stickyHeader && "sticky top-0 z-10"
            )}
            style={{ gridTemplateColumns: gridTemplate }}
          >
            <div
              role="columnheader"
              className="flex items-end p-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45"
            >
              {featuresLabel}
            </div>
            {plans.map((plan) => (
              <div
                key={plan.id}
                role="columnheader"
                className="relative flex flex-col items-center gap-0.5 p-4 text-center"
                style={
                  plan.highlighted
                    ? {
                        background: `linear-gradient(180deg, color-mix(in oklab, ${accent} 14%, transparent), transparent)`,
                        boxShadow: `inset 0 2px 0 ${accent}`,
                      }
                    : undefined
                }
              >
                {plan.highlighted ? (
                  <span
                    className="absolute -top-px right-2 translate-y-[-50%] rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-950"
                    style={{ background: accent }}
                  >
                    {plan.badge ?? "Popular"}
                  </span>
                ) : null}
                <span className="text-sm font-semibold tracking-tight">
                  {plan.name}
                </span>
                {plan.price ? (
                  <span className="text-lg font-bold leading-none tracking-tight tabular-nums">
                    {plan.price}
                  </span>
                ) : null}
                {plan.tagline ? (
                  <span className="text-[11px] text-white/50">
                    {plan.tagline}
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          {/* Body */}
          <div role="rowgroup">
            {rows.map((row, i) => {
              if (row.kind === "group") {
                return (
                  <div
                    key={`g-${row.label}-${i}`}
                    role="row"
                    className="grid border-b border-white/[0.06] bg-white/[0.03]"
                    style={{ gridTemplateColumns: gridTemplate }}
                  >
                    <div
                      role="cell"
                      className="col-span-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55"
                      style={{ gridColumn: `1 / -1` }}
                    >
                      {row.label}
                    </div>
                  </div>
                );
              }
              const f = row.feature;
              return (
                <div
                  key={`f-${f.label}-${i}`}
                  role="row"
                  className={cn(
                    "grid border-b border-white/[0.06] transition-colors last:border-b-0 hover:bg-white/[0.04]",
                    zebra && i % 2 === 1 && "bg-white/[0.015]"
                  )}
                  style={{ gridTemplateColumns: gridTemplate }}
                >
                  <div role="cell" className="flex flex-col justify-center p-4">
                    <span className="text-sm font-medium text-white/85">
                      {f.label}
                    </span>
                    {f.hint ? (
                      <span className="mt-0.5 text-[11px] text-white/45">
                        {f.hint}
                      </span>
                    ) : null}
                  </div>
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      role="cell"
                      className="flex items-center justify-center p-4 text-center"
                      style={
                        plan.highlighted
                          ? {
                              background: `color-mix(in oklab, ${accent} 6%, transparent)`,
                            }
                          : undefined
                      }
                    >
                      {renderValue(f.values[plan.id], accent)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* CTA footer */}
          {hasCta ? (
            <div
              role="row"
              className="grid border-t border-white/10"
              style={{ gridTemplateColumns: gridTemplate }}
            >
              <div role="cell" className="p-4" />
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  role="cell"
                  className="flex items-center justify-center p-4"
                  style={
                    plan.highlighted
                      ? {
                          background: `color-mix(in oklab, ${accent} 6%, transparent)`,
                        }
                      : undefined
                  }
                >
                  {plan.cta}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
ComparisonTable.displayName = "ComparisonTable";

export { ComparisonTable };
