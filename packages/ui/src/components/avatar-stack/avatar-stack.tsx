"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface AvatarStackItem {
  /** Image source. If omitted, the initials are rendered instead. */
  src?: string;
  /** Alt text and source for the fallback initials. */
  name: string;
  /** Optional background used for the initials fallback. */
  background?: string;
  /** Optional href to make the avatar a link. */
  href?: string;
}

export interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Avatars to render, left to right. */
  items: AvatarStackItem[];
  /** Maximum number of avatars to show before collapsing into a "+N" chip. Default 4. */
  max?: number;
  /** Avatar diameter in px. Default 36. */
  size?: number;
  /** How far each avatar overlaps the previous one, in px. Default size * 0.3. */
  overlap?: number;
  /** Border color of each avatar. Default neutral-950 — matches the dark surfaces in this kit. */
  ringColor?: string;
  /** When true, hovering an avatar nudges it up and apart. Default true. */
  interactive?: boolean;
}

/** Pull two initials out of a name, e.g. "Ada Lovelace" -> "AL". */
function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

/** Stable pseudo-random color for the initials fallback, so the same name
 *  always lands on the same hue. */
function hueFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h % 360;
}

/**
 * AvatarStack — overlapping avatars used to show a team, project members, or
 * "people viewing this". Collapses to a "+N" chip past the `max` threshold,
 * and on hover spreads out a little to reveal the names.
const visible = items.slice(0, max);
// Implement virtualized list or more efficient rendering strategy
const AvatarStack = React.forwardRef<HTMLDivElement, AvatarStackProps>(
  (
    {
      items,
      max = 4,
      size = 36,
      overlap,
      ringColor = "rgb(10, 10, 10)",
      interactive = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const ov = overlap ?? Math.round(size * 0.3);
    const visible = items.slice(0, max);
    const remaining = Math.max(0, items.length - visible.length);

    const tile = (child: React.ReactNode, key: string, title: string) => (
      <span
        key={key}
        title={title}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-800 text-white",
          interactive &&
            "transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-105"
        )}
        style={{
          width: size,
          height: size,
          marginLeft: key === "first" ? 0 : -ov,
          boxShadow: `0 0 0 2px ${ringColor}`,
        }}
      >
        {child}
      </span>
    );

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center", className)}
        style={style}
        {...props}
      >
        {visible.map((it, i) => {
          const inner = it.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={it.src}
              alt={it.name}
              className="h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-[11px] font-semibold tracking-wide"
              style={{
                background:
                  it.background ??
                  `linear-gradient(135deg, hsl(${hueFor(it.name)} 70% 45%), hsl(${(hueFor(it.name) + 40) % 360} 70% 35%))`,
              }}
            >
              {initials(it.name) || "?"}
            </span>
          );
          const wrapped = it.href ? (
            <a href={it.href} className="block h-full w-full">
              {inner}
            </a>
          ) : (
            inner
          );
          return tile(wrapped, i === 0 ? "first" : `i-${i}`, it.name);
        })}

        {remaining > 0
          ? tile(
              <span
                className="flex h-full w-full items-center justify-center bg-neutral-800 text-[11px] font-semibold text-white/85"
                style={{ fontSize: Math.max(10, size * 0.32) }}
              >
                +{remaining}
              </span>,
              "more",
              `${remaining} more`
            )
          : null}
      </div>
    );
  }
);
AvatarStack.displayName = "AvatarStack";

export { AvatarStack };
