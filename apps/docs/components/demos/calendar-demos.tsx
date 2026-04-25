"use client";

import * as React from "react";
import { Calendar } from "@craftui/ui";

interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export function CalendarSingleDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border bg-background shadow-sm"
    />
  );
}

export function CalendarSelectedDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date()}
      className="rounded-md border bg-background shadow-sm"
    />
  );
}

export function CalendarRangeDemo() {
  const today = new Date();
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: today,
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
  });
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={1}
      className="rounded-md border bg-background shadow-sm"
    />
  );
}

export function CalendarMultipleMonthsDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
      className="rounded-md border bg-background shadow-sm"
    />
  );
}
