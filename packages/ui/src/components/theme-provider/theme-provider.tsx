"use client";

import * as React from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: "class" | "data-theme";
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
}

const ThemeProviderContext = React.createContext<ThemeProviderState | null>(
  null
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "craftui-theme",
  attribute = "class",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<"dark" | "light">(
    "light"
  );

  React.useEffect(() => {
    const root = window.document.documentElement;
    const systemIsDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const effective = theme === "system" ? (systemIsDark ? "dark" : "light") : theme;

    if (attribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(effective);
    } else {
      root.setAttribute("data-theme", effective);
    }
    setResolvedTheme(effective);
  }, [theme, attribute]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      localStorage.setItem(storageKey, next);
      setThemeState(next);
    },
    [storageKey]
  );

  const value = React.useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);
  if (!context)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
