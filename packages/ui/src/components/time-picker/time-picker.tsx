"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TimePickerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue"
  > {
  /** Controlled value as 24-hour "HH:mm". */
  value?: string;
  /** Initial value when uncontrolled. Default "09:00". */
  defaultValue?: string;
  /** Fired with the next 24-hour "HH:mm" string. */
  onChange?: (value: string) => void;
  /** Use a 12-hour clock with an AM/PM toggle. Default false. */
  use12Hour?: boolean;
  /** Minute increment shown in the list. Default 5. */
  minuteStep?: number;
  /** Disable the control. */
  disabled?: boolean;
  /** Placeholder shown when there is no value. */
  placeholder?: string;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function parse(value: string | undefined): { h: number; m: number } | null {
  if (!value) return null;
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return { h, m: min };
}

function format12(h: number): { hour: number; period: "AM" | "PM" } {
  const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return { hour, period };
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={15}
      height={15}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-white/45"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const ACCENT = "rgb(125, 211, 252)";

/**
 * TimePicker — a compact time field with a dropdown of scrollable hour and
 * minute columns (plus an AM/PM toggle in 12-hour mode). Pick an hour and a
 * minute; the component emits a 24-hour "HH:mm" string. Closes on outside
 * click or Escape, works controlled or uncontrolled, and is dependency-free.
 */
const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      defaultValue = "09:00",
      onChange,
      use12Hour = false,
      minuteStep = 5,
      disabled,
      placeholder = "Select time",
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState(defaultValue);
    const raw = isControlled ? value : internal;
    const parsed = parse(raw);

    const [open, setOpen] = React.useState(false);
    const rootRef = React.useRef<HTMLDivElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    React.useEffect(() => {
      if (!open) return;
      const onDown = (e: MouseEvent) => {
        if (rootRef.current && !rootRef.current.contains(e.target as Node))
          setOpen(false);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("mousedown", onDown);
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("mousedown", onDown);
        window.removeEventListener("keydown", onKey);
      };
    }, [open]);

    const commit = (h: number, m: number) => {
      const next = `${pad(h)}:${pad(m)}`;
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };

    const current = parsed ?? { h: 9, m: 0 };

    const setHour12 = (hour12: number, period: "AM" | "PM") => {
      let h = hour12 % 12;
      if (period === "PM") h += 12;
      commit(h, current.m);
    };

    const hours = use12Hour
      ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      : Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from(
      { length: Math.ceil(60 / minuteStep) },
      (_, i) => i * minuteStep
    );
    const { hour: curHour12, period: curPeriod } = format12(current.h);

    const label = parsed
      ? use12Hour
        ? `${curHour12}:${pad(current.m)} ${curPeriod}`
        : `${pad(current.h)}:${pad(current.m)}`
      : placeholder;

    const colClass =
      "flex max-h-44 w-14 flex-col gap-0.5 overflow-y-auto scroll-smooth py-1 [scrollbar-width:thin]";
    const cellClass =
      "shrink-0 cursor-pointer rounded-md px-2 py-1 text-center text-sm text-white/70 transition-colors hover:bg-white/10";

    return (
      <div
        ref={setRefs}
        className={cn("relative inline-block text-left", className)}
        {...props}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex h-9 w-40 items-center gap-2 rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-white transition-colors hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-50",
            open && "border-white/30"
          )}
        >
          <ClockIcon />
          <span className={cn("flex-1 text-left", !parsed && "text-white/40")}>
            {label}
          </span>
        </button>

        {open ? (
          <div className="absolute z-50 mt-1.5 flex gap-1 rounded-lg border border-white/10 bg-neutral-900 p-1 shadow-xl shadow-black/40">
            <div className={colClass} role="listbox" aria-label="Hour">
              {hours.map((h) => {
                const active = use12Hour ? curHour12 === h : current.h === h;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() =>
                      use12Hour ? setHour12(h, curPeriod) : commit(h, current.m)
                    }
                    className={cn(cellClass, active && "font-semibold text-white")}
                    style={active ? { backgroundColor: `${ACCENT}26`, color: ACCENT } : undefined}
                  >
                    {use12Hour ? h : pad(h)}
                  </button>
                );
              })}
            </div>
            <div className={colClass} role="listbox" aria-label="Minute">
              {minutes.map((m) => {
                const active = current.m === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => commit(current.h, m)}
                    className={cn(cellClass, active && "font-semibold text-white")}
                    style={active ? { backgroundColor: `${ACCENT}26`, color: ACCENT } : undefined}
                  >
                    {pad(m)}
                  </button>
                );
              })}
            </div>
            {use12Hour ? (
              <div className="flex w-12 flex-col gap-0.5 py-1">
                {(["AM", "PM"] as const).map((p) => {
                  const active = curPeriod === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setHour12(curHour12, p)}
                      className={cn(cellClass, active && "font-semibold text-white")}
                      style={active ? { backgroundColor: `${ACCENT}26`, color: ACCENT } : undefined}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
TimePicker.displayName = "TimePicker";

export { TimePicker };
