"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CountUpRingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value. Drives the ring fill and (when no `label` is set) the displayed number. */
  value: number;
  /** Maximum value the ring fills at 100%. Default 100. */
  max?: number;
  /** Outer diameter of the ring in px. Default 140. */
  size?: number;
  /** Stroke thickness in px. Default 10. */
  thickness?: number;
  /** Stroke color of the filled arc. Default sky-400. */
  color?: string;
  /** Color of the unfilled track. Default a faint white. */
  trackColor?: string;
  /** Optional content rendered at the center. Defaults to the live value (or value/max%) as a number. */
  label?: React.ReactNode;
  /** Total ms for the entrance animation. Default 1300. */
  duration?: number;
  /** When true (default), animation kicks in only when the ring scrolls into view. */
  animateOnView?: boolean;
  /** Suffix appended to the live numeric label, e.g. "%". Ignored when `label` is provided. */
  suffix?: string;
  /** Decimal places for the live numeric label. Default 0. */
  decimals?: number;
}

/**
 * CountUpRing — an SVG circular progress ring that animates its fill from
 * 0 to (value/max) of the circumference using `stroke-dashoffset`. The
 * center text counts up in lock-step with the arc. Useful for stats like
 * "uptime", "completion", or "score".
 */
const CountUpRing = React.forwardRef<HTMLDivElement, CountUpRingProps>(
  (
    {
      value,
      max = 100,
      size = 140,
      thickness = 10,
      color = "rgb(125, 211, 252)",
      trackColor = "rgba(255,255,255,0.12)",
      label,
      duration = 1300,
      animateOnView = true,
      suffix = "",
      decimals = 0,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = React.useState(0);
    const startedRef = React.useRef(false);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        wrapRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    React.useEffect(() => {
      const run = () => {
        if (startedRef.current) return;
        startedRef.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setProgress(eased);
          if (t < 1) requestAnimationFrame(tick);
          else setProgress(1);
        };
        requestAnimationFrame(tick);
      };
      if (!animateOnView) {
        run();
        return;
      }
      const node = wrapRef.current;
      if (!node) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            run();
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(node);
      return () => obs.disconnect();
    }, [duration, animateOnView]);

    const radius = size / 2 - thickness;
    const circumference = 2 * Math.PI * radius;
    const ratio = Math.max(0, Math.min(1, value / max));
    const dashOffset = circumference * (1 - ratio * progress);
    const liveValue = value * progress;

    return (
      <div
        ref={setRefs}
        className={cn("relative inline-block", className)}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          aria-hidden
          // -90 deg rotation puts 0% at the top instead of the right.
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={thickness}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              filter: `drop-shadow(0 0 6px ${color}66)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground">
          {label !== undefined ? (
            <>{label}</>
          ) : (
            <span
              className="font-bold tabular-nums tracking-tight text-foreground"
              style={{ fontSize: size * 0.22 }}
            >
              {liveValue.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })}
              {suffix}
            </span>
          )}
        </div>
      </div>
    );
  }
);
CountUpRing.displayName = "CountUpRing";

export { CountUpRing };
