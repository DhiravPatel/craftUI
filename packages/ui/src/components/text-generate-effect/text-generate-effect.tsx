"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TextGenerateEffectProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Text to reveal. Splits on whitespace into words. */
  words: string;
  /** Initial blur in px. Default 10. */
  blur?: number;
  /** Delay between words in ms. Default 90. */
  stagger?: number;
  /** Per-word transition duration in ms. Default 600. */
  duration?: number;
  /** Trigger only when scrolled into view. Default true. */
  whenInView?: boolean;
}

/**
 * TextGenerateEffect — words appear from a blurred-out state to focus,
 * staggered left-to-right. Reads as if the text is being "generated" by an
 * LLM with a soft camera focus instead of plain typing.
 */
const TextGenerateEffect = React.forwardRef<
  HTMLSpanElement,
  TextGenerateEffectProps
>(
  (
    {
      words,
      blur = 10,
      stagger = 90,
      duration = 600,
      whenInView = true,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef<HTMLSpanElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLSpanElement
    );
    const [visible, setVisible] = React.useState(!whenInView);

    React.useEffect(() => {
      if (!whenInView) return;
      const el = innerRef.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [whenInView]);

    const tokens = words.split(/(\s+)/);

    return (
      <span
        ref={innerRef}
        className={cn("inline-flex flex-wrap", className)}
        {...props}
      >
        {tokens.map((token, i) => {
          if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
          return (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: visible ? 1 : 0,
                filter: visible ? "blur(0)" : `blur(${blur}px)`,
                transition: [
                  `opacity ${duration}ms ease-out ${i * stagger}ms`,
                  `filter ${duration}ms ease-out ${i * stagger}ms`,
                ].join(", "),
              }}
            >
              {token}
            </span>
          );
        })}
      </span>
    );
  }
);
TextGenerateEffect.displayName = "TextGenerateEffect";

export { TextGenerateEffect };
