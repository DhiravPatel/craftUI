import type { Config } from "tailwindcss";
import { craftuiTailwindPreset } from "@craftui/config/tailwind/base";

const config: Config = {
  ...craftuiTailwindPreset,
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
};

export default config;
