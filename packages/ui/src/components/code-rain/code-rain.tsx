"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CodeRainProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Characters drawn from this string. Default = katakana + Latin digits. */
  charset?: string;
  /** Font size (and column width) in px. Default 16. */
  fontSize?: number;
  /** Color of the head (leading) character. Defaults to bright sky. */
  headColor?: string;
  /** Color of the trailing characters. Defaults to a dim sky. */
  trailColor?: string;
  /** Background color painted under the rain. Default neutral-950. */
  background?: string;
  /** Per-frame fade overlay strength (0–1). Higher = shorter trails. Default 0.08. */
  fade?: number;
  /** Speed multiplier — higher = faster drops. Default 1. */
  speed?: number;
  /** Optional content rendered on top of the rain. */
  children?: React.ReactNode;
}

const DEFAULT_CHARSET =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789";

/**
 * CodeRain — the classic Matrix digital rain rendered to a canvas.
 * Each column tracks its own falling head; trailing characters fade into
 * the background. Resizes to its container, respects DPR, and pauses when
 * the page is hidden. Use as a hero / 404 / loading backdrop, with
 * `children` rendered on top.
 */
const CodeRain = React.forwardRef<HTMLDivElement, CodeRainProps>(
  (
    {
      charset = DEFAULT_CHARSET,
      fontSize = 16,
      headColor = "rgb(186, 230, 253)",
      trailColor = "rgb(56, 189, 248)",
      background = "rgb(10, 10, 10)",
      fade = 0.08,
      speed = 1,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
      const wrapper = wrapperRef.current;
      const canvas = canvasRef.current;
      if (!wrapper || !canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let dpr = Math.max(window.devicePixelRatio || 1, 1);
      let width = 0;
      let height = 0;
      let cols = 0;
      let drops: number[] = [];
      let raf = 0;
      let last = 0;

      const setSize = () => {
        const rect = wrapper.getBoundingClientRect();
        width = Math.max(rect.width, 1);
        height = Math.max(rect.height, 1);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, monospace`;
        ctx.textBaseline = "top";
        cols = Math.max(1, Math.floor(width / fontSize));
        // Seed each column at a random vertical row so the field looks lived-in.
        const rows = Math.ceil(height / fontSize);
        drops = Array.from({ length: cols }, () => Math.floor(Math.random() * rows));
        // Initial paint so first frame isn't blank.
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      };

      const tick = (t: number) => {
        // Throttle target ~30fps independent of monitor refresh.
        if (t - last < 33 / speed) {
          raf = window.requestAnimationFrame(tick);
          return;
        }
        last = t;

        // Translucent black overlay creates the trailing fade effect.
        ctx.fillStyle = `rgba(0, 0, 0, ${fade})`;
        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < cols; i++) {
          const x = i * fontSize;
          const y = drops[i]! * fontSize;
          const ch = charset.charAt(
            Math.floor(Math.random() * charset.length)
          );

          // Bright head
          ctx.fillStyle = headColor;
          ctx.fillText(ch, x, y);

          // Subtle trail right above the head
          ctx.fillStyle = trailColor;
          ctx.fillText(
            charset.charAt(Math.floor(Math.random() * charset.length)),
            x,
            y - fontSize
          );

          // Reset to top after exiting bottom (probabilistically, for stagger).
          if (y > height && Math.random() > 0.972) {
            drops[i] = 0;
          }
          drops[i] = drops[i]! + 1;
        }

        raf = window.requestAnimationFrame(tick);
      };

      const onVisibility = () => {
        if (document.hidden) {
          window.cancelAnimationFrame(raf);
        } else {
          last = 0;
          raf = window.requestAnimationFrame(tick);
        }
      };

      const ro = new ResizeObserver(() => {
        dpr = Math.max(window.devicePixelRatio || 1, 1);
        setSize();
      });

      setSize();
      document.addEventListener("visibilitychange", onVisibility);
      ro.observe(wrapper);
      raf = window.requestAnimationFrame(tick);

      return () => {
        window.cancelAnimationFrame(raf);
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }, [charset, fontSize, headColor, trailColor, background, fade, speed]);

    return (
      <div
        ref={(node) => {
          wrapperRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          className
        )}
        style={{ background, ...style }}
        {...props}
      >
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
        {children ? (
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);
CodeRain.displayName = "CodeRain";

export { CodeRain };
