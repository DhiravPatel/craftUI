"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface SegmentedControlSegment<V extends string = string> {
  value: V;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<V extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  segments: SegmentedControlSegment<V>[];
  value: V;
  onChange: (value: V) => void;
  /** Visual size. Default "md". */
  size?: "sm" | "md" | "lg";
  /** Stretch each segment to share equal width. Default false (intrinsic widths). */
  fullWidth?: boolean;
}

/**
 * SegmentedControl — iOS-style segmented switcher. The active segment is
 * highlighted by a single sliding pill that animates between positions
 * when the selection changes. Pure CSS transitions on `transform` and
 * `width`, driven by measuring each segment's offsetLeft / offsetWidth.
 */
function SegmentedControlImpl<V extends string>(
  {
    segments,
    value,
    onChange,
    size = "md",
    fullWidth = false,
    className,
    style,
    ...props
  }: SegmentedControlProps<V>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const segRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const [pill, setPill] = React.useState<{ x: number; w: number }>({
    x: 0,
    w: 0,
  });

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      wrapRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref]
  );

  // Recompute pill position whenever the active value changes or the
  // surrounding box resizes (responsive layouts).
  React.useEffect(() => {
    const recompute = () => {
      const idx = segments.findIndex((s) => s.value === value);
      const node = segRefs.current[idx];
      if (!node) return;
      setPill({ x: node.offsetLeft, w: node.offsetWidth });
    };
    recompute();
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(recompute);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [value, segments]);

  const sizeStyles = {
    sm: { padBlock: 4, padInline: 10, text: "text-xs" },
    md: { padBlock: 6, padInline: 14, text: "text-sm" },
    lg: { padBlock: 8, padInline: 18, text: "text-base" },
  }[size];

  return (
    <div
      ref={setRefs}
      role="tablist"
      className={cn(
        "relative inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1",
        fullWidth && "w-full",
        className
      )}
      style={style}
      {...props}
    >
      {/* Sliding pill */}
      <span
        aria-hidden
        className="absolute top-1 bottom-1 rounded-full bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_12px_-4px_rgba(0,0,0,0.4)]"
        style={{
          transform: `translateX(${pill.x - 4}px)`,
          width: pill.w,
          transition:
            "transform 320ms cubic-bezier(0.22,1,0.36,1), width 320ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      {segments.map((s, i) => {
        const active = s.value === value;
        return (
          <button
            key={s.value}
            ref={(el) => {
              segRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(s.value)}
            className={cn(
              "relative inline-flex items-center justify-center gap-1.5 rounded-full font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-sky-400/60",
              fullWidth && "flex-1",
              active ? "text-foreground" : "text-foreground/55 hover:text-foreground/85",
              sizeStyles.text
            )}
            style={{
              padding: `${sizeStyles.padBlock}px ${sizeStyles.padInline}px`,
            }}
          >
            {s.icon ? <span aria-hidden>{s.icon}</span> : null}
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

const SegmentedControl = React.forwardRef(SegmentedControlImpl) as <
  V extends string = string,
>(
  props: SegmentedControlProps<V> & { ref?: React.Ref<HTMLDivElement> }
) => ReturnType<typeof SegmentedControlImpl>;

(SegmentedControl as unknown as { displayName: string }).displayName =
  "SegmentedControl";

export { SegmentedControl };
