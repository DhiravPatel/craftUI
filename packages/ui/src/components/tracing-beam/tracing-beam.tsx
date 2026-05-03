"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TracingBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Color of the progress line + glowing dot. Default cyan. */
  color?: string;
  /** Line thickness in px. Default 1.5. */
  thickness?: number;
  /** Inner padding-left applied to the children container so content
   *  doesn't sit on top of the beam. Default 32. */
  contentPadding?: number;
}

/**
 * TracingBeam — a vertical progress line on the left of the children.
 * As the user scrolls past the wrapped content, a glowing dot travels
 * down the line proportional to how much of the section is visible.
 */
const TracingBeam = React.forwardRef<HTMLDivElement, TracingBeamProps>(
  (
    {
      color = "rgb(56, 189, 248)",
      thickness = 1.5,
      contentPadding = 32,
      className,
      children,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLDivElement
    );
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      let frame = 0;
      const update = () => {
        const el = innerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height;
        if (total <= 0) {
          setProgress(0);
          return;
        }
        // 0 = top of section is at viewport top; 1 = bottom of section is at viewport top.
        const scrolled = -rect.top + window.innerHeight * 0.4;
        setProgress(Math.max(0, Math.min(1, scrolled / total)));
      };
      const onScroll = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(() => {
          update();
          frame = 0;
        });
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", update);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", update);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }, []);

    return (
      <div
        ref={innerRef}
        className={cn("relative", className)}
        style={style}
        {...props}
      >
        {/* Track — the dim full-height line */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-full bg-border/60"
          style={{ width: thickness }}
        />
        {/* Progress — bright portion above the dot */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0"
          style={{
            width: thickness,
            height: `${progress * 100}%`,
            background: `linear-gradient(to bottom, transparent, ${color})`,
            boxShadow: `0 0 8px 1px ${color}`,
          }}
        />
        {/* Glowing dot at the progress position */}
        <span
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: thickness / 2,
            top: `${progress * 100}%`,
            transform: "translate(-50%, -50%)",
            width: 10,
            height: 10,
            borderRadius: "9999px",
            background: color,
            boxShadow: `0 0 12px 3px ${color}`,
          }}
        />
        <div style={{ paddingLeft: contentPadding }}>{children}</div>
      </div>
    );
  }
);
TracingBeam.displayName = "TracingBeam";

export { TracingBeam };
