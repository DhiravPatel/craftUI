"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface FlipWordsProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Words to cycle through. */
  words: string[];
  /** Time on each word in ms before flipping to the next. Default 3000. */
  duration?: number;
  /** Loop forever once the last word is reached. Default true. */
  loop?: boolean;
}

/**
 * FlipWords — drop into a sentence to cycle one word with a 3D rotateX flip
 * + soft blur. Each word stays for `duration` ms, then the next slides in.
 */
const FlipWords = React.forwardRef<HTMLSpanElement, FlipWordsProps>(
  ({ words, duration = 3000, loop = true, className, ...props }, ref) => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
      if (words.length < 2) return;
      const id = window.setInterval(() => {
        setIndex((i) => {
          if (i + 1 >= words.length) {
            if (!loop) {
              window.clearInterval(id);
              return i;
            }
            return 0;
          }
          return i + 1;
        });
      }, duration);
      return () => window.clearInterval(id);
    }, [words.length, duration, loop]);

    const current = words[index] ?? "";

    return (
      <span
        ref={ref}
        className={cn("inline-flex", className)}
        style={{ perspective: "600px" }}
        {...props}
      >
        {/* `key={index}` re-mounts the inner span so the keyframe replays each flip. */}
        <span
          key={index}
          className="inline-block animate-flip-word"
          style={{ transformStyle: "preserve-3d" }}
        >
          {current}
        </span>
      </span>
    );
  }
);
FlipWords.displayName = "FlipWords";

export { FlipWords };
