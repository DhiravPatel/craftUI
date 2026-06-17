"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CountdownTimerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Target date — Date instance, ISO string, or epoch ms. */
  target: Date | string | number;
  /** Hide leading groups whose value is 0. Default false. */
  hideZeroLeading?: boolean;
  /** Show the seconds group. Default true. */
  showSeconds?: boolean;
  /** Custom labels. */
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string };
  /** Height of each flip cell in px. Default 64. */
  cellHeight?: number;
  /** Width of each flip cell in px. Default cellHeight * 0.74. */
  cellWidth?: number;
  /** Cell background. Default near-black. */
  cellBackground?: string;
  /** Text color. Default off-white. */
  color?: string;
  /** Fires once when the countdown reaches zero. */
  onComplete?: () => void;
  /** Element rendered when the timer has finished. */
  completedContent?: React.ReactNode;
}

function diffParts(targetMs: number, nowMs: number) {
  const diff = Math.max(0, targetMs - nowMs);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { diff, days, hours, minutes, seconds };
}

function FlipCell({
  digit,
  height,
  width,
  background,
  color,
}: {
  digit: string;
  height: number;
  width: number;
  background: string;
  color: string;
}) {
  return (
    <span
      className="relative inline-flex select-none items-center justify-center overflow-hidden rounded-lg font-mono font-bold leading-none"
      style={{
        height,
        width,
        background,
        color,
        fontSize: height * 0.62,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 32px -18px rgba(0,0,0,0.55)",
      }}
    >
      {/* Animated digit — remounted via key so the keyframe re-fires. */}
      <span
        key={digit}
        className="block"
        style={{
          animation:
            "craftui-countdown-flip 420ms cubic-bezier(0.22,1,0.36,1) both",
          transformOrigin: "center top",
        }}
      >
        {digit}
      </span>
      {/* Horizontal seam — the recognizable split-flap line. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px"
        style={{ background: "rgba(0,0,0,0.85)" }}
      />
      {/* Subtle highlight on the top half. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)",
        }}
      />
    </span>
  );
}

function CellGroup({
  value,
  label,
  height,
  width,
  background,
  color,
}: {
  value: number;
  label: string;
  height: number;
  width: number;
  background: string;
  color: string;
}) {
  const digits = String(Math.max(0, value)).padStart(2, "0").split("");
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex gap-1">
        {digits.map((d, i) => (
          <FlipCell
            key={i}
            digit={d}
            height={height}
            width={width}
            background={background}
            color={color}
          />
        ))}
      </div>
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">
        {label}
      </span>
    </div>
  );
}

function Separator({ height }: { height: number }) {
  return (
    <span
      aria-hidden
      className="flex flex-col items-center justify-center gap-1.5"
      style={{ height: height + 18 }}
    >
      <span className="flex h-full flex-col items-center justify-center gap-1.5 pb-4 text-white/30">
        <span className="block h-1.5 w-1.5 rounded-full bg-current" />
        <span className="block h-1.5 w-1.5 rounded-full bg-current" />
      </span>
    </span>
  );
}

/**
 * CountdownTimer — a flip-clock-style countdown to a target date.
 * Renders Days / Hours / Minutes / Seconds as paired digit cells, each
 * with the recognizable horizontal seam. The digit cell remounts every
 * time the value changes, retriggering its flip-in keyframe, so the
 * whole face ticks like an old mechanical board. Auto-updates each
 * second, fires `onComplete` once at zero, and renders
 * `completedContent` afterwards.
 */
const CountdownTimer = React.forwardRef<HTMLDivElement, CountdownTimerProps>(
  (
    {
      target,
      hideZeroLeading = false,
      showSeconds = true,
      labels,
      cellHeight = 64,
      cellWidth,
      cellBackground = "rgb(20, 20, 20)",
      color = "rgb(245, 245, 245)",
      onComplete,
      completedContent,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const targetMs = React.useMemo(() => {
      if (target instanceof Date) return target.getTime();
      if (typeof target === "number") return target;
      return new Date(target).getTime();
    }, [target]);

    // Render-stable initial value to avoid SSR hydration mismatch:
    // server renders against the target date with a zero `now`, so the
    // first paint shows the full duration. Effect kicks in client-side
    // with the real wall clock.
    const [now, setNow] = React.useState<number>(targetMs);
    const firedRef = React.useRef(false);

    React.useEffect(() => {
      setNow(Date.now());
      const id = window.setInterval(() => setNow(Date.now()), 1000);
      return () => window.clearInterval(id);
    }, []);

    const parts = diffParts(targetMs, now);
    const finished = parts.diff <= 0;

    React.useEffect(() => {
      if (finished && !firedRef.current) {
        firedRef.current = true;
        onComplete?.();
      }
    }, [finished, onComplete]);

    const w = cellWidth ?? Math.round(cellHeight * 0.74);
    const L = {
      days: labels?.days ?? "Days",
      hours: labels?.hours ?? "Hours",
      minutes: labels?.minutes ?? "Min",
      seconds: labels?.seconds ?? "Sec",
    };

    const groups: Array<{ value: number; label: string }> = [];
    if (!hideZeroLeading || parts.days > 0)
      groups.push({ value: parts.days, label: L.days });
    if (groups.length > 0 || !hideZeroLeading || parts.hours > 0)
      groups.push({ value: parts.hours, label: L.hours });
    groups.push({ value: parts.minutes, label: L.minutes });
    if (showSeconds) groups.push({ value: parts.seconds, label: L.seconds });

    if (finished && completedContent) {
      return (
        <div
          ref={ref}
          className={cn("inline-flex items-center justify-center", className)}
          style={style}
          {...props}
        >
          {completedContent}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-start gap-2", className)}
        style={style}
        role="timer"
        aria-live="polite"
        {...props}
      >
        {groups.map((g, i) => (
          <React.Fragment key={g.label}>
            <CellGroup
              value={g.value}
              label={g.label}
              height={cellHeight}
              width={w}
              background={cellBackground}
              color={color}
            />
            {i < groups.length - 1 ? <Separator height={cellHeight} /> : null}
          </React.Fragment>
        ))}

        <style>{`
          @keyframes craftui-countdown-flip {
            0% { transform: translateY(-12%); opacity: 0.35; }
            55% { transform: translateY(4%); opacity: 1; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }
);
CountdownTimer.displayName = "CountdownTimer";

export { CountdownTimer };
