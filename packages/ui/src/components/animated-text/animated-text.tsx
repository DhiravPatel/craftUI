"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type AnimatedTextVariant =
  | "shiny"
  | "gradient"
  | "typewriter"
  | "reveal";

export interface AnimatedTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Which animation to render. Default `"shiny"`. */
  variant?: AnimatedTextVariant;
  /** Text content. Used by `shiny`, `gradient`, and `reveal` variants. */
  children?: React.ReactNode;
  /** Phrases to cycle through. Used by `variant="typewriter"`. */
  phrases?: string[];
  /** Animation duration. Seconds for `shiny`/`gradient`, ms for `reveal` per-character. */
  duration?: number;
  /** Base color (shiny). */
  baseColor?: string;
  /** Highlight color of the sweep (shiny). */
  shineColor?: string;
  /** Gradient color stops (gradient). */
  colors?: string[];
  /** Lock the gradient in place (gradient). */
  static?: boolean;
  /** Typing speed in ms (typewriter). */
  typeSpeed?: number;
  /** Deletion speed in ms (typewriter). */
  deleteSpeed?: number;
  /** Pause at end of each phrase (typewriter). */
  pause?: number;
  /** Loop through phrases (typewriter). */
  loop?: boolean;
  /** Show blinking cursor (typewriter). */
  cursor?: boolean;
  /** Cursor character (typewriter). */
  cursorChar?: string;
  /** Per-character/word delay in ms (reveal). */
  stagger?: number;
  /** Delay before first character animates (reveal). */
  delay?: number;
  /** Trigger reveal only when in view (reveal). */
  whenInView?: boolean;
  /** Reveal by word instead of character (reveal). */
  byWord?: boolean;
}

const AnimatedText = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  ({ variant = "shiny", ...props }, ref) => {
    switch (variant) {
      case "shiny":
        return <ShinyVariant ref={ref} {...props} />;
      case "gradient":
        return <GradientVariant ref={ref} {...props} />;
      case "typewriter":
        return <TypewriterVariant ref={ref} {...props} />;
      case "reveal":
        return <RevealVariant ref={ref} {...props} />;
    }
  }
);
AnimatedText.displayName = "AnimatedText";

// -----------------------------------------------------------------------------
// shiny — gradient sweep across the text
// -----------------------------------------------------------------------------
const ShinyVariant = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      duration = 3,
      baseColor = "hsl(var(--foreground) / 0.5)",
      shineColor = "hsl(var(--foreground))",
      className,
      style,
      children,
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      className={cn("animate-shine bg-clip-text text-transparent", className)}
      style={
        {
          backgroundImage: `linear-gradient(110deg, ${baseColor} 0%, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%, ${baseColor} 100%)`,
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          "--shine-duration": `${duration}s`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </span>
  )
);
ShinyVariant.displayName = "AnimatedText.Shiny";

// -----------------------------------------------------------------------------
// gradient — animated rainbow gradient text
// -----------------------------------------------------------------------------
const GradientVariant = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      duration = 6,
      colors,
      static: isStatic = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const palette = colors ?? [
      "#a855f7",
      "#ec4899",
      "#f97316",
      "#eab308",
      "#22d3ee",
      "#a855f7",
    ];
    const gradient = `linear-gradient(110deg, ${palette.join(", ")})`;
    return (
      <span
        ref={ref}
        className={cn(
          "bg-clip-text text-transparent",
          !isStatic && "animate-gradient-flow",
          className
        )}
        style={
          {
            backgroundImage: gradient,
            backgroundSize: isStatic ? "100% 100%" : "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            "--gradient-duration": `${duration}s`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </span>
    );
  }
);
GradientVariant.displayName = "AnimatedText.Gradient";

// -----------------------------------------------------------------------------
// typewriter — cycles through phrases, types/deletes each
// -----------------------------------------------------------------------------
const TypewriterVariant = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      phrases = [],
      typeSpeed = 70,
      deleteSpeed = 40,
      pause = 1500,
      loop = true,
      cursor = true,
      cursorChar = "|",
      className,
      ...props
    },
    ref
  ) => {
    const [phraseIdx, setPhraseIdx] = React.useState(0);
    const [text, setText] = React.useState("");
    const [deleting, setDeleting] = React.useState(false);
    const [done, setDone] = React.useState(false);

    React.useEffect(() => {
      if (done || phrases.length === 0) return;
      const current = phrases[phraseIdx] ?? "";
      let timeout: number;

      if (!deleting && text === current) {
        if (!loop && phraseIdx === phrases.length - 1) {
          setDone(true);
          return;
        }
        timeout = window.setTimeout(() => setDeleting(true), pause);
      } else if (deleting && text === "") {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
      } else {
        timeout = window.setTimeout(
          () => {
            setText((t) =>
              deleting
                ? current.slice(0, t.length - 1)
                : current.slice(0, t.length + 1)
            );
          },
          deleting ? deleteSpeed : typeSpeed
        );
      }
      return () => window.clearTimeout(timeout);
    }, [text, deleting, phraseIdx, phrases, typeSpeed, deleteSpeed, pause, loop, done]);

    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center", className)}
        {...props}
      >
        <span>{text}</span>
        {cursor ? (
          <span aria-hidden className="ml-0.5 inline-block animate-cursor-blink">
            {cursorChar}
          </span>
        ) : null}
      </span>
    );
  }
);
TypewriterVariant.displayName = "AnimatedText.Typewriter";

// -----------------------------------------------------------------------------
// reveal — char-by-char (or word-by-word) staggered fade + rise
// -----------------------------------------------------------------------------
const RevealVariant = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      stagger = 30,
      delay = 0,
      duration = 600,
      whenInView = true,
      byWord = false,
      className,
      style,
      children,
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

    const text = typeof children === "string" ? children : String(children ?? "");
    const tokens = byWord ? text.split(/(\s+)/) : Array.from(text);

    return (
      <span
        ref={innerRef}
        className={cn("inline-flex flex-wrap", className)}
        style={style}
        {...props}
      >
        {tokens.map((token, i) => {
          const isWhitespace = /^\s+$/.test(token);
          if (isWhitespace) return <span key={i}>{token}</span>;
          return (
            <span
              key={i}
              className="inline-block"
              style={{
                transform: visible ? "translateY(0)" : "translateY(0.6em)",
                opacity: visible ? 1 : 0,
                transition: `transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${
                  delay + i * stagger
                }ms, opacity ${duration}ms ease-out ${delay + i * stagger}ms`,
              }}
            >
              {token === " " ? " " : token}
            </span>
          );
        })}
      </span>
    );
  }
);
RevealVariant.displayName = "AnimatedText.Reveal";

export { AnimatedText };
