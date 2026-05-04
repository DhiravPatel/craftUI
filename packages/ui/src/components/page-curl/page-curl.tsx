"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface PageCurlProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Curl size at rest in px. Default 26. */
  curlSize?: number;
  /** Curl size on hover in px. Default 96. */
  hoverCurlSize?: number;
  /** Background painted on the underside of the peeled corner. */
  curlBack?: string;
  /** Border radius of the card in px. Default 16. */
  radius?: number;
}

/**
 * PageCurl — wraps any card. The bottom-right corner peels up on hover,
 * revealing a soft "underside" with a drop shadow. Pure CSS via clip-path
 * triangles + a transition.
 */
const PageCurl = React.forwardRef<HTMLDivElement, PageCurlProps>(
  (
    {
      curlSize = 26,
      hoverCurlSize = 96,
      curlBack = "linear-gradient(135deg, rgba(245,247,255,0.95), rgba(150,160,180,0.85))",
      radius = 16,
      className,
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const [hover, setHover] = React.useState(false);
    const sz = hover ? hoverCurlSize : curlSize;

    return (
      <div
        ref={ref}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          setHover(true);
        }}
        onMouseLeave={(e) => {
          onMouseLeave?.(e);
          setHover(false);
        }}
        className={cn("relative overflow-hidden", className)}
        style={{ borderRadius: radius, ...style }}
        {...props}
      >
        {/* Card content. The bottom-right corner is clipped to leave a notch
            where the curl shows through. The clip-path is animated alongside
            the curl size for a smooth peel. */}
        <div
          className="relative h-full w-full"
          style={{
            clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${sz}px), calc(100% - ${sz}px) 100%, 0 100%)`,
            transition: "clip-path 360ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {children}
        </div>

        {/* The peeled corner — a triangle hugging the bottom-right with a
            soft directional gradient (light at the fold, dark at the tip)
            and a drop shadow that reads as the page lifting off. */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 transition-[width,height,filter] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: sz,
            height: sz,
            clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
            background: curlBack,
            filter: hover
              ? "drop-shadow(-6px -6px 12px rgba(0,0,0,0.28))"
              : "drop-shadow(-2px -2px 4px rgba(0,0,0,0.18))",
          }}
        />

        {/* Subtle inset shadow along the diagonal "fold" — gives the curl
            its lifted look. */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 transition-[width,height,opacity] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: sz,
            height: sz,
            clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0) 70%)",
            opacity: hover ? 1 : 0.6,
            mixBlendMode: "multiply",
          }}
        />
      </div>
    );
  }
);
PageCurl.displayName = "PageCurl";

export { PageCurl };
