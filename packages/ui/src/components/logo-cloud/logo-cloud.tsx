"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface LogoCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo nodes to scroll. Each is rendered as one slide in the strip. */
  logos: React.ReactNode[];
  /** Time in seconds for one full pass. Default 30. */
  duration?: number;
  /** Direction of travel. Default "left". */
  direction?: "left" | "right";
  /** Gap between logos in px. Default 56. */
  gap?: number;
  /** Pause the marquee while the user is hovering. Default true. */
  pauseOnHover?: boolean;
  /** Soft fade at left + right edges. Default true. */
  fade?: boolean;
  /** Background color. Defaults to transparent — sit it on any section. */
  background?: string;
}

/**
 * LogoCloud — an infinite, auto-scrolling marquee of logos. The list is
 * rendered twice end-to-end and translated by exactly half its width so the
 * loop is seamless, with no visible "jump" between cycles. Built on the
 * existing `marquee-x` keyframe in the Tailwind preset.
 */
const LogoCloud = React.forwardRef<HTMLDivElement, LogoCloudProps>(
  (
    {
      logos,
      duration = 30,
      direction = "left",
      gap = 56,
      pauseOnHover = true,
      fade = true,
      background,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const animation =
      direction === "left" ? "marquee-x" : "marquee-x-reverse";

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex w-full overflow-hidden",
          className
        )}
        style={
          {
            background,
            ["--marquee-duration" as string]: `${duration}s`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className={cn(
              "flex shrink-0 items-center",
              `animate-${animation}`,
              pauseOnHover && "group-hover:[animation-play-state:paused]"
            )}
            style={{ gap, paddingRight: gap }}
          >
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center justify-center opacity-70 transition-opacity duration-200 hover:opacity-100"
              >
                {logo}
              </div>
            ))}
          </div>
        ))}

        {fade ? (
          <>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-24"
              style={{
                background:
                  "linear-gradient(90deg, var(--logo-cloud-fade, hsl(var(--background))) 0%, transparent 100%)",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-24"
              style={{
                background:
                  "linear-gradient(270deg, var(--logo-cloud-fade, hsl(var(--background))) 0%, transparent 100%)",
              }}
            />
          </>
        ) : null}
      </div>
    );
  }
);
LogoCloud.displayName = "LogoCloud";

export { LogoCloud };
