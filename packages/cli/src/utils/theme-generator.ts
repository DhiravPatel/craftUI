export interface ThemePreset {
  name: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

const sharedBase = {
  radius: "0.5rem",
};

function buildPreset(
  name: string,
  primaryLight: string,
  primaryDark: string
): ThemePreset {
  return {
    name,
    light: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      card: "0 0% 100%",
      "card-foreground": "222.2 84% 4.9%",
      popover: "0 0% 100%",
      "popover-foreground": "222.2 84% 4.9%",
      primary: primaryLight,
      "primary-foreground": "210 40% 98%",
      secondary: "210 40% 96.1%",
      "secondary-foreground": "222.2 47.4% 11.2%",
      muted: "210 40% 96.1%",
      "muted-foreground": "215.4 16.3% 46.9%",
      accent: "210 40% 96.1%",
      "accent-foreground": "222.2 47.4% 11.2%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 40% 98%",
      success: "142.1 76.2% 36.3%",
      "success-foreground": "355.7 100% 97.3%",
      warning: "32.1 94.6% 43.7%",
      "warning-foreground": "26 83.3% 14.1%",
      border: "214.3 31.8% 91.4%",
      input: "214.3 31.8% 91.4%",
      ring: primaryLight,
      radius: sharedBase.radius,
    },
    dark: {
      background: "222.2 84% 4.9%",
      foreground: "210 40% 98%",
      card: "222.2 84% 4.9%",
      "card-foreground": "210 40% 98%",
      popover: "222.2 84% 4.9%",
      "popover-foreground": "210 40% 98%",
      primary: primaryDark,
      "primary-foreground": "222.2 47.4% 11.2%",
      secondary: "217.2 32.6% 17.5%",
      "secondary-foreground": "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      "muted-foreground": "215 20.2% 65.1%",
      accent: "217.2 32.6% 17.5%",
      "accent-foreground": "210 40% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "210 40% 98%",
      success: "142.1 70.6% 45.3%",
      "success-foreground": "144.9 80.4% 10%",
      warning: "47.9 95.8% 53.1%",
      "warning-foreground": "26 83.3% 14.1%",
      border: "217.2 32.6% 17.5%",
      input: "217.2 32.6% 17.5%",
      ring: "224.3 76.3% 48%",
      radius: sharedBase.radius,
    },
  };
}

export const PRESET_THEMES: ThemePreset[] = [
  buildPreset("slate", "221.2 83.2% 53.3%", "217.2 91.2% 59.8%"),
  buildPreset("zinc", "240 5.9% 10%", "0 0% 98%"),
  buildPreset("stone", "24 5.4% 63.9%", "60 9.1% 97.8%"),
  buildPreset("neutral", "0 0% 9%", "0 0% 98%"),
  buildPreset("gray", "220.9 39.3% 11%", "220 14.3% 95.9%"),
  buildPreset("red", "0 72.2% 50.6%", "0 72.2% 50.6%"),
  buildPreset("rose", "346.8 77.2% 49.8%", "346.8 77.2% 49.8%"),
  buildPreset("orange", "24.6 95% 53.1%", "20.5 90.2% 48.2%"),
  buildPreset("green", "142.1 76.2% 36.3%", "142.1 70.6% 45.3%"),
  buildPreset("blue", "221.2 83.2% 53.3%", "217.2 91.2% 59.8%"),
  buildPreset("violet", "262.1 83.3% 57.8%", "263.4 70% 50.4%"),
];

export function findPreset(name: string): ThemePreset | undefined {
  return PRESET_THEMES.find((t) => t.name === name);
}

// --- Color math ---

interface HSL {
  h: number;
  s: number;
  l: number;
}

function hexToHsl(hex: string): HSL {
  const clean = hex.replace(/^#/, "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function formatHsl({ h, s, l }: HSL): string {
  return `${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%`;
}

export function generateThemeFromHex(
  hex: string,
  radius = "0.5rem"
): ThemePreset {
  const primary = hexToHsl(hex);
  const lightPrimary = formatHsl(primary);
  const dark = {
    ...primary,
    l: Math.min(95, primary.l + 10),
  };

  return {
    name: "custom",
    light: {
      ...buildPreset("custom", lightPrimary, formatHsl(dark)).light,
      radius,
    },
    dark: {
      ...buildPreset("custom", lightPrimary, formatHsl(dark)).dark,
      radius,
    },
  };
}

export function renderCssVariables(preset: ThemePreset): string {
  const lines = (vars: Record<string, string>) =>
    Object.entries(vars)
      .map(([k, v]) => {
        if (k === "radius") return `    --radius: ${v};`;
        return `    --${k}: ${v};`;
      })
      .join("\n");

  return `@layer base {
  :root {
${lines(preset.light)}
  }

  .dark {
${lines(preset.dark)}
  }
}`;
}
