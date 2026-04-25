"use client";

import * as React from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  ref?: React.RefObject<T>
) {
  const internalRef = React.useRef<T>(null);
  const targetRef = ref ?? internalRef;

  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = targetRef.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, targetRef]);

  return targetRef;
}
