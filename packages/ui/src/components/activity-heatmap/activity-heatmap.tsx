"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface ActivityHeatmapValue {
  /** ISO date string (YYYY-MM-DD) for this cell. */
  date: string;
  /** Raw count for the day. Bucketed into 5 intensity levels for color. */
  count: number;
}

export interface ActivityHeatmapProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Daily values. Missing days render as the lowest intensity. */
  values?: ActivityHeatmapValue[];
  /** Number of weeks to render, ending today. Default 26 (~6 months). */
  weeks?: number;
  /** Cell size in px. Default 12. */
  cellSize?: number;
  /** Gap between cells in px. Default 3. */
  gap?: number;
  /** Border radius for each cell in px. Default 3. */
  cellRadius?: number;
  /** Color used for the highest intensity. Lower buckets are derived from this. */
  accent?: string;
  /** Color used for empty / lowest-intensity cells. */
  emptyColor?: string;
  /** When true, cells animate in on mount in a diagonal sweep. Default true. */
  animate?: boolean;
  /** Show the month labels above the grid. Default true. */
  showMonths?: boolean;
  /** Show the intensity legend below the grid. Default true. */
  showLegend?: boolean;
  /** Fired when a cell is clicked. */
  onSelect?: (value: ActivityHeatmapValue) => void;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Format a Date as YYYY-MM-DD in local time, matching the input format. */
function isoDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Bucket a count into 0..4 using a soft, log-ish scale that handles small
 *  and large datasets without needing the caller to pass thresholds. */
function bucket(count: number, max: number) {
  if (count <= 0 || max <= 0) return 0;
  const r = count / max;
  if (r > 0.66) return 4;
  if (r > 0.33) return 3;
  if (r > 0.12) return 2;
  return 1;
}

/**
 * ActivityHeatmap — a GitHub-style contribution calendar. Renders the last
 * `weeks` weeks as a 7-row grid of intensity cells, with month labels along
 * the top and an optional legend underneath.
 */
const ActivityHeatmap = React.forwardRef<HTMLDivElement, ActivityHeatmapProps>(
  (
    {
      values = [],
      weeks = 26,
      cellSize = 12,
      gap = 3,
      cellRadius = 3,
      accent = "rgb(125, 211, 252)",
      emptyColor = "rgba(255, 255, 255, 0.06)",
      animate = true,
      showMonths = true,
      showLegend = true,
      className,
      style,
      onSelect,
      ...props
    },
    ref
  ) => {
    const lookup = React.useMemo(() => {
      const m = new Map<string, number>();
      for (const v of values) m.set(v.date, v.count);
      return m;
    }, [values]);

    const max = React.useMemo(
      () => values.reduce((acc, v) => Math.max(acc, v.count), 0),
      [values]
    );

    // Build the grid of weeks ending today, walking back to the most recent
    // Saturday so each column is a clean Sun→Sat week.
    const grid = React.useMemo(() => {
      const today = new Date();
      const end = new Date(today);
      const dow = end.getDay();
      end.setDate(end.getDate() + (6 - dow));
      const cols: { date: Date; iso: string; count: number }[][] = [];
      for (let w = weeks - 1; w >= 0; w--) {
        const col: { date: Date; iso: string; count: number }[] = [];
        for (let d = 0; d < 7; d++) {
          const dt = new Date(end);
          dt.setDate(end.getDate() - w * 7 - (6 - d));
          const iso = isoDate(dt);
          col.push({ date: dt, iso, count: lookup.get(iso) ?? 0 });
        }
        cols.push(col);
      }
      return cols;
    }, [lookup, weeks]);

    const monthLabels = React.useMemo(() => {
      if (!showMonths) return [];
      const out: { col: number; label: string }[] = [];
      let lastMonth = -1;
      grid.forEach((col, i) => {
        const m = col[0]!.date.getMonth();
        if (m !== lastMonth) {
          out.push({ col: i, label: MONTHS[m]! });
          lastMonth = m;
        }
      });
      return out;
    }, [grid, showMonths]);

    // Five-step intensity ramp from the empty color to the full accent.
    const palette = React.useMemo(() => {
      return [
        emptyColor,
        `color-mix(in oklab, ${accent} 22%, transparent)`,
        `color-mix(in oklab, ${accent} 45%, transparent)`,
        `color-mix(in oklab, ${accent} 70%, transparent)`,
        accent,
      ];
    }, [accent, emptyColor]);

    const colW = cellSize + gap;
    const rowH = cellSize + gap;
    const gridW = colW * grid.length;
    const gridH = rowH * 7;

    return (
      <div
        ref={ref}
        className={cn("inline-block text-white/70", className)}
        style={style}
        {...props}
      >
        {showMonths ? (
          <div className="relative" style={{ width: gridW, height: 14 }}>
            {monthLabels.map((m) => (
              <span
                key={`${m.col}-${m.label}`}
                className="absolute text-[10px] uppercase tracking-wider text-white/45"
                style={{ left: m.col * colW }}
              >
                {m.label}
              </span>
            ))}
          </div>
        ) : null}

        <div
          className="relative"
          style={{ width: gridW, height: gridH }}
          role="img"
          aria-label="Activity heatmap"
        >
          {grid.map((col, ci) =>
            col.map((cell, ri) => {
              const b = bucket(cell.count, max);
              const delay = animate ? (ci + ri) * 8 : 0;
              const clickable = !!onSelect;
              return (
                <button
                  key={cell.iso}
                  type="button"
                  title={`${cell.iso} — ${cell.count}`}
                  onClick={
                    clickable
                      ? () => onSelect({ date: cell.iso, count: cell.count })
                      : undefined
                  }
                  className={cn(
                    "absolute block transition-transform duration-150 ease-out",
                    clickable
                      ? "cursor-pointer hover:scale-125"
                      : "cursor-default",
                    animate && "opacity-0"
                  )}
                  style={{
                    left: ci * colW,
                    top: ri * rowH,
                    width: cellSize,
                    height: cellSize,
                    borderRadius: cellRadius,
                    background: palette[b],
                    boxShadow:
                      b > 0
                        ? "inset 0 0 0 1px rgba(255,255,255,0.04)"
                        : undefined,
                    animation: animate
                      ? `craftui-heatmap-in 320ms ease-out ${delay}ms forwards`
                      : undefined,
                  }}
                />
              );
            })
          )}
          <style>{`@keyframes craftui-heatmap-in { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }`}</style>
        </div>

        {showLegend ? (
          <div
            className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/45"
            style={{ width: gridW }}
          >
            <span>Less</span>
            <div className="flex items-center gap-[3px]">
              {palette.map((c, i) => (
                <span
                  key={i}
                  style={{
                    background: c,
                    width: cellSize,
                    height: cellSize,
                    borderRadius: cellRadius,
                    boxShadow:
                      i > 0
                        ? "inset 0 0 0 1px rgba(255,255,255,0.04)"
                        : undefined,
                  }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        ) : null}
      </div>
    );
  }
);
ActivityHeatmap.displayName = "ActivityHeatmap";

export { ActivityHeatmap };
