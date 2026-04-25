"use client";

import * as React from "react";

export function useMediaQuery(query: string): boolean {
  const getMatches = React.useCallback((q: string): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(q).matches;
  }, []);

  const [matches, setMatches] = React.useState(() => getMatches(query));

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Safari <14 fallback
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [query]);

  return matches;
}
