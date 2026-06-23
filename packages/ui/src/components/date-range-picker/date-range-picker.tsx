"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePreset {
  label: string;
  getRange: () => DateRange;
}

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  /** Preset shortcuts shown on the left rail. Pass [] to hide. */
  presets?: DateRangePreset[];
  /** Earliest selectable date. */
  minDate?: Date;
  /** Latest selectable date. */
  maxDate?: Date;
  /** How many months to show side-by-side. Default 2. */
  numberOfMonths?: number;
  /** First day of the week — 0 (Sun) or 1 (Mon). Default 1. */
  weekStartsOn?: 0 | 1;
  /** Accent color. Default sky. */
  accentColor?: string;
}

const WEEKDAY_LABELS_SUN = ["S", "M", "T", "W", "T", "F", "S"];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function addDays(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}
function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function compareDays(a: Date, b: Date) {
  return startOfDay(a).getTime() - startOfDay(b).getTime();
}
function formatRangeLabel(range: DateRange) {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  if (range.start && range.end) {
    return `${range.start.toLocaleDateString(undefined, opts)} – ${range.end.toLocaleDateString(undefined, opts)}`;
  }
  if (range.start) return range.start.toLocaleDateString(undefined, opts);
  return "Select range";
}

function buildMonthGrid(month: Date, weekStartsOn: 0 | 1) {
  const first = startOfMonth(month);
  const startWeekday = first.getDay();
  const leading = (startWeekday - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -leading);
  // 6 weeks × 7 days always — keeps layouts stable across months.
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) days.push(addDays(gridStart, i));
  return days;
}

function defaultPresets(): DateRangePreset[] {
  return [
    {
      label: "Today",
      getRange: () => {
        const t = new Date();
        return { start: startOfDay(t), end: startOfDay(t) };
      },
    },
    {
      label: "Yesterday",
      getRange: () => {
        const y = addDays(new Date(), -1);
        return { start: startOfDay(y), end: startOfDay(y) };
      },
    },
    {
      label: "Last 7 days",
      getRange: () => ({
        start: startOfDay(addDays(new Date(), -6)),
        end: startOfDay(new Date()),
      }),
    },
    {
      label: "Last 30 days",
      getRange: () => ({
        start: startOfDay(addDays(new Date(), -29)),
        end: startOfDay(new Date()),
      }),
    },
    {
      label: "This month",
      getRange: () => {
        const t = new Date();
        return {
          start: startOfMonth(t),
          end: startOfDay(t),
        };
      },
    },
    {
      label: "Last month",
      getRange: () => {
        const first = startOfMonth(addMonths(startOfMonth(new Date()), -1));
        const last = addDays(startOfMonth(new Date()), -1);
        return { start: first, end: last };
      },
    },
  ];
}

interface MonthGridProps {
  month: Date;
  range: DateRange;
  hoveredEnd: Date | null;
  onSelectDay: (d: Date) => void;
  onHoverDay: (d: Date | null) => void;
  weekStartsOn: 0 | 1;
  minDate?: Date;
  maxDate?: Date;
  accentColor: string;
}

function MonthGrid({
  month,
  range,
  hoveredEnd,
  onSelectDay,
  onHoverDay,
  weekStartsOn,
  minDate,
  maxDate,
  accentColor,
}: MonthGridProps) {
  const days = React.useMemo(
    () => buildMonthGrid(month, weekStartsOn),
    [month, weekStartsOn]
  );

  const today = startOfDay(new Date());

  // Active preview range:
  // - if both endpoints set → the committed range
  // - if start set, hovering → show start..hovered
  const previewStart = range.start;
  const previewEnd =
    range.end ??
    (range.start && hoveredEnd && compareDays(hoveredEnd, range.start) >= 0
      ? hoveredEnd
      : null);

  const labels = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < 7; i++) out.push(WEEKDAY_LABELS_SUN[(weekStartsOn + i) % 7]);
    return out;
  }, [weekStartsOn]);

  const monthLabel = month.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-[240px]">
      <p className="mb-2 text-center text-[12px] font-medium text-white/85">
        {monthLabel}
      </p>
      <div className="mb-1 grid grid-cols-7 gap-0.5 text-center text-[10px] text-white/40">
        {labels.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((d) => {
          const inMonth = d.getMonth() === month.getMonth();
          const disabled =
            (minDate && compareDays(d, minDate) < 0) ||
            (maxDate && compareDays(d, maxDate) > 0);
          const isStart = isSameDay(d, previewStart);
          const isEnd = isSameDay(d, previewEnd);
          const inRange =
            previewStart && previewEnd
              ? compareDays(d, previewStart) >= 0 && compareDays(d, previewEnd) <= 0
              : false;
          const isToday = isSameDay(d, today);
          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDay(d)}
              onMouseEnter={() => onHoverDay(d)}
              onMouseLeave={() => onHoverDay(null)}
              className={cn(
                "relative flex h-7 w-7 items-center justify-center rounded-md text-[11px] transition-colors",
                disabled
                  ? "cursor-not-allowed text-white/15"
                  : !inMonth
                    ? "text-white/30"
                    : isStart || isEnd
                      ? "text-neutral-950"
                      : inRange
                        ? "text-white"
                        : "text-white/80 hover:bg-white/[0.06]"
              )}
              style={{
                background:
                  isStart || isEnd
                    ? accentColor
                    : inRange
                      ? `${accentColor}22`
                      : undefined,
                fontWeight: isStart || isEnd ? 600 : isToday ? 500 : 400,
              }}
            >
              {d.getDate()}
              {isToday && !isStart && !isEnd ? (
                <span
                  className="absolute bottom-0.5 left-1/2 h-0.5 w-1.5 -translate-x-1/2 rounded-full"
                  style={{ background: accentColor }}
                  aria-hidden
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * DateRangePicker — an inline calendar block for choosing a start and end
 * date, with a preset shortcuts rail on the left (Today / Yesterday / Last
 * 7 days / Last 30 days / This month / Last month) and one or more side-
 * by-side months on the right. Click a day to set the start, then another
 * to set the end; hovering during selection previews the resulting range.
 * Fully callback-driven via `value` + `onChange`. Dependency-free —
 * uses native `Date` math only.
 */
const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      presets,
      minDate,
      maxDate,
      numberOfMonths = 2,
      weekStartsOn = 1,
      accentColor = "rgb(125, 211, 252)",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<DateRange>(
      defaultValue ?? { start: null, end: null }
    );
    const range = isControlled ? value! : internal;

    const [hovered, setHovered] = React.useState<Date | null>(null);
    const [visibleMonth, setVisibleMonth] = React.useState<Date>(() => {
      const seed = range.start ?? new Date();
      return startOfMonth(seed);
    });

    const presetList = presets ?? defaultPresets();

    const setRange = (next: DateRange) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    const selectDay = (d: Date) => {
      const day = startOfDay(d);
      // First click — or already had both endpoints set → restart selection.
      if (!range.start || (range.start && range.end)) {
        setRange({ start: day, end: null });
        return;
      }
      // Second click — establish the end.
      if (compareDays(day, range.start) < 0) {
        // Reversed selection: swap so start <= end.
        setRange({ start: day, end: range.start });
      } else {
        setRange({ start: range.start, end: day });
      }
    };

    const applyPreset = (p: DateRangePreset) => {
      const r = p.getRange();
      setRange(r);
      if (r.start) setVisibleMonth(startOfMonth(r.start));
    };

    const months = React.useMemo(() => {
      const out: Date[] = [];
      for (let i = 0; i < numberOfMonths; i++) out.push(addMonths(visibleMonth, i));
      return out;
    }, [visibleMonth, numberOfMonths]);

    return (
      <div
        ref={ref}
        className={cn(
          "inline-block rounded-2xl border border-white/10 bg-neutral-950 p-3 text-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]",
          className
        )}
        style={style}
        {...props}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Presets rail */}
          {presetList.length > 0 ? (
            <div className="flex shrink-0 flex-row gap-1 overflow-x-auto sm:flex-col sm:overflow-visible sm:border-r sm:border-white/10 sm:pr-3">
              {presetList.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="shrink-0 rounded-md px-2.5 py-1.5 text-left text-[12px] font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {p.label}
                </button>
              ))}
            </div>
          ) : null}

          {/* Calendars */}
          <div className="flex flex-col gap-2 sm:px-1">
            <div className="flex items-center justify-between px-1">
              <button
                type="button"
                onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
                aria-label="Previous month"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="text-[11px] font-medium text-white/55">
                {formatRangeLabel(range)}
              </span>
              <button
                type="button"
                onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
                aria-label="Next month"
                className="flex h-7 w-7 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-3 sm:flex-nowrap">
              {months.map((m, i) => (
                <MonthGrid
                  key={i}
                  month={m}
                  range={range}
                  hoveredEnd={hovered}
                  onSelectDay={selectDay}
                  onHoverDay={setHovered}
                  weekStartsOn={weekStartsOn}
                  minDate={minDate}
                  maxDate={maxDate}
                  accentColor={accentColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
DateRangePicker.displayName = "DateRangePicker";

export { DateRangePicker };
