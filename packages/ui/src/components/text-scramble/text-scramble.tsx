"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TextScrambleProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Final text to resolve to. */
  text: string;
  /** Pool of characters to draw from while scrambling. */
  alphabet?: string;
  /** Frame interval in ms. Lower = faster. Default 40. */
  speed?: number;
  /** Trigger only when scrolled into view. Default true. */
  whenInView?: boolean;
  /** Loop the scramble forever. Default false. */
  loop?: boolean;
  /** Pause between loops in ms. Default 2500. */
  pause?: number;
  /** Trigger the scramble on hover instead of automatically. Default false. */
  triggerOnHover?: boolean;
}

/**
 * TextScramble — letters cycle through random characters, then settle on
 * the target text from left to right. Like a terminal "decoding" effect.
 */
const TextScramble = React.forwardRef<HTMLSpanElement, TextScrambleProps>(
  (
    {
      text,
      alphabet = "!<>-_\\/[]{}—=+*^?#________",
      speed = 40,
      whenInView = true,
      loop = false,
      pause = 2500,
      triggerOnHover = false,
      className,
      onMouseEnter,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLSpanElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLSpanElement
    );
    const [display, setDisplay] = React.useState(text);
    const [runId, setRunId] = React.useState(0);
    const [autoStarted, setAutoStarted] = React.useState(
      !whenInView && !triggerOnHover
    );

    // Auto-trigger via IntersectionObserver (when not hover-triggered).
    React.useEffect(() => {
      if (triggerOnHover) return;
      if (!whenInView) {
        setAutoStarted(true);
        return;
      }
      const el = innerRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setAutoStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [whenInView, triggerOnHover]);

    // Run the scramble whenever (auto-started + run counter) changes.
    React.useEffect(() => {
      if (!autoStarted && runId === 0) return;
      let cancelled = false;
      let timer: number | null = null;

      type Slot = { start: number; end: number; char: string | undefined };
      const queue: Slot[] = Array.from(text).map(() => ({
        start: Math.floor(Math.random() * 30),
        end: Math.floor(Math.random() * 30) + 30,
        char: undefined,
      }));

      let frame = 0;
      const tick = () => {
        if (cancelled) return;
        let output = "";
        let complete = 0;
        for (let i = 0; i < queue.length; i++) {
          const item = queue[i]!;
          const target = text[i] ?? "";
          if (frame >= item.end) {
            output += target;
            complete++;
          } else if (frame >= item.start) {
            if (!item.char || Math.random() < 0.28) {
              item.char = alphabet.charAt(
                Math.floor(Math.random() * alphabet.length)
              );
            }
            output += item.char;
          } else {
            output += " ";
          }
        }
        setDisplay(output);

        if (complete < queue.length) {
          frame++;
          timer = window.setTimeout(tick, speed);
        } else if (loop) {
          timer = window.setTimeout(() => {
            setRunId((n) => n + 1);
          }, pause);
        }
      };

      tick();
      return () => {
        cancelled = true;
        if (timer) window.clearTimeout(timer);
      };
    }, [autoStarted, runId, text, alphabet, speed, loop, pause]);

    const handleMouseEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
      onMouseEnter?.(event);
      if (triggerOnHover) setRunId((n) => n + 1);
    };

    return (
      <span
        ref={innerRef}
        onMouseEnter={handleMouseEnter}
        className={cn("font-mono tabular-nums", className)}
        // Reserve space for the final string so the layout doesn't jiggle.
        style={{ display: "inline-block", minWidth: `${text.length}ch` }}
        {...props}
      >
        {display}
      </span>
    );
  }
);
TextScramble.displayName = "TextScramble";

export { TextScramble };
