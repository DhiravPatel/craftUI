"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface SplitFlapProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** The string to display. */
  value: string;
  /** Number of cells to render. The value is right-padded with spaces. Default = value.length. */
  digits?: number;
  /** Charset cycled through when a cell animates to its target. Default A–Z, 0–9, space. */
  charset?: string;
  /** Height of each cell in px. Default 64. */
  cellHeight?: number;
  /** Width of each cell in px. Default = cellHeight * 0.66. */
  cellWidth?: number;
  /** Gap between cells in px. Default 4. */
  gap?: number;
  /** Background color of each cell. Default near-black. */
  background?: string;
  /** Text color. Default off-white. */
  color?: string;
  /** Time between flips while cycling, in ms. Default 55. */
  flipInterval?: number;
  /** Extra random flips before each cell settles. Higher = more "reels". Default 8. */
  extraFlips?: number;
  /** Stagger between adjacent cells starting, in ms. Default 80. */
  stagger?: number;
}

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";

interface CellProps {
  target: string;
  charset: string;
  cellHeight: number;
  cellWidth: number;
  background: string;
  color: string;
  flipInterval: number;
  extraFlips: number;
  delay: number;
}

const Cell = React.memo(function Cell({
  target,
  charset,
  cellHeight,
  cellWidth,
  background,
  color,
  flipInterval,
  extraFlips,
  delay,
}: CellProps) {
  const [display, setDisplay] = React.useState(target);
  const [flipping, setFlipping] = React.useState(false);
  const indexRef = React.useRef(0);

  React.useEffect(() => {
    if (display === target) return;
    indexRef.current = charset.indexOf(display) >= 0 ? charset.indexOf(display) : 0;
    const targetIdx = Math.max(charset.indexOf(target), 0);

    let stepsLeft =
      ((targetIdx - indexRef.current + charset.length) % charset.length) +
      extraFlips;

    let timer: number | undefined;
    let startTimer: number | undefined;

    const step = () => {
      indexRef.current = (indexRef.current + 1) % charset.length;
      setDisplay(charset.charAt(indexRef.current));
      setFlipping(true);
      // Brief reset to retrigger the keyframe.
      window.setTimeout(() => setFlipping(false), flipInterval - 10);
      stepsLeft -= 1;
      if (stepsLeft > 0) {
        timer = window.setTimeout(step, flipInterval);
      } else {
        setDisplay(target);
      }
    };

    startTimer = window.setTimeout(step, delay);

    return () => {
      if (timer) window.clearTimeout(timer);
      if (startTimer) window.clearTimeout(startTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const seam = `linear-gradient(to bottom, transparent calc(50% - 0.5px), rgba(0,0,0,0.8) calc(50% - 0.5px), rgba(0,0,0,0.8) calc(50% + 0.5px), transparent calc(50% + 0.5px))`;

  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md font-mono font-bold leading-none"
      style={{
        width: cellWidth,
        height: cellHeight,
        background,
        color,
        fontSize: cellHeight * 0.6,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 16px -8px rgba(0,0,0,0.6)",
      }}
    >
      <span
        className="absolute inset-0 inline-flex items-center justify-center"
        style={{
          animation: flipping
            ? `craftui-split-flap-tick ${flipInterval}ms ease-out both`
            : undefined,
          transformOrigin: "center top",
        }}
      >
        {display === " " ? " " : display}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: seam }}
      />
      <style>{`
        @keyframes craftui-split-flap-tick {
          0% { transform: translateY(-6%); opacity: 0.4; }
          60% { transform: translateY(2%); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </span>
  );
});

/**
 * SplitFlap — a vintage mechanical split-flap display, like the old train
 * station or airport boards. Each cell shows a single character; when
 * `value` changes, each cell cycles rapidly through `charset` before
 * landing on its target, with a staggered start across cells. Pure CSS +
 * setTimeout — no canvas, no dependencies. Great for big-number stats,
 * countdowns, prices, or hero copy that animates on mount.
 */
const SplitFlap = React.forwardRef<HTMLDivElement, SplitFlapProps>(
  (
    {
      value,
      digits,
      charset = DEFAULT_CHARSET,
      cellHeight = 64,
      cellWidth,
      gap = 4,
      background = "rgb(20, 20, 20)",
      color = "rgb(245, 245, 245)",
      flipInterval = 55,
      extraFlips = 8,
      stagger = 80,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const w = cellWidth ?? cellHeight * 0.66;
    const upper = value.toUpperCase();
    const total = digits ?? upper.length;
    const padded = upper.padEnd(total, " ").slice(0, total);

    // Make sure every character is in the charset, else cell won't reach it.
    const safeCharset = React.useMemo(() => {
      const s = new Set(charset.split(""));
      for (const ch of padded) s.add(ch);
      return Array.from(s).join("");
    }, [charset, padded]);

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center", className)}
        style={{ gap, ...style }}
        aria-label={value}
        {...props}
      >
        {Array.from(padded).map((ch, i) => (
          <Cell
            key={i}
            target={ch}
            charset={safeCharset}
            cellHeight={cellHeight}
            cellWidth={w}
            background={background}
            color={color}
            flipInterval={flipInterval}
            extraFlips={extraFlips}
            delay={i * stagger}
          />
        ))}
      </div>
    );
  }
);
SplitFlap.displayName = "SplitFlap";

export { SplitFlap };
