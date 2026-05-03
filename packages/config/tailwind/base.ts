import type { Config } from "tailwindcss";

/**
 * Base Tailwind config for CraftUI projects.
 * Extend this in your app's `tailwind.config.ts` and set your own `content` globs.
 */
export const craftuiTailwindPreset: Partial<Config> = {
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        sm: "var(--radius-sm)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "zoom-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "zoom-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-x-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(15%, -10%) scale(1.1)" },
          "66%": { transform: "translate(-12%, 12%) scale(0.95)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "cursor-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "world-arc": {
          "0%, 100%": { strokeDashoffset: "1000", opacity: "0" },
          "10%": { opacity: "1" },
          "55%": { strokeDashoffset: "0", opacity: "1" },
          "90%": { strokeDashoffset: "-1000", opacity: "0" },
        },
        "world-arc-dot": {
          "0%, 100%": { opacity: "0", transform: "scale(0.7)" },
          "10%": { opacity: "0" },
          "22%": { opacity: "0.7", transform: "scale(1)" },
          "55%": { opacity: "1", transform: "scale(1)" },
          "85%": { opacity: "0.15", transform: "scale(0.85)" },
        },
        "world-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(2)", opacity: "0" },
        },
        wavy: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(calc(var(--wavy-amplitude, 8px) * -1))" },
        },
        "flip-word": {
          "0%": {
            opacity: "0",
            transform: "translateY(8px) rotateX(-30deg)",
            filter: "blur(8px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) rotateX(0)",
            filter: "blur(0)",
          },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-in-out",
        "fade-out": "fade-out 0.2s ease-in-out",
        "slide-in-top": "slide-in-from-top 0.2s ease-out",
        "slide-in-bottom": "slide-in-from-bottom 0.2s ease-out",
        "zoom-in": "zoom-in 0.2s ease-out",
        "zoom-out": "zoom-out 0.2s ease-in",
        shimmer: "shimmer 1.6s infinite",
        "marquee-x": "marquee-x var(--marquee-duration, 30s) linear infinite",
        "marquee-x-reverse":
          "marquee-x-reverse var(--marquee-duration, 30s) linear infinite",
        meteor: "meteor var(--meteor-duration, 5s) linear infinite",
        aurora: "aurora var(--aurora-duration, 18s) ease-in-out infinite",
        twinkle: "twinkle var(--twinkle-duration, 3s) ease-in-out infinite",
        shine: "shine var(--shine-duration, 3s) linear infinite",
        "gradient-flow":
          "gradient-flow var(--gradient-duration, 6s) ease infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
        "world-arc":
          "world-arc var(--world-arc-duration, 4s) ease-in-out infinite",
        "world-arc-dot":
          "world-arc-dot var(--world-arc-duration, 4s) ease-in-out infinite",
        "world-pulse":
          "world-pulse var(--world-pulse-duration, 2s) ease-out infinite",
        wavy: "wavy var(--wavy-duration, 2s) ease-in-out infinite",
        "flip-word":
          "flip-word 0.55s cubic-bezier(0.22,1,0.36,1) forwards",
        ripple: "ripple var(--ripple-duration, 3s) cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default craftuiTailwindPreset;
