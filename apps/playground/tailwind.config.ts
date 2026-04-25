import type { Config } from "tailwindcss";
import { craftuiTailwindPreset } from "@craftui/config/tailwind/base";

const config: Config = {
  ...craftuiTailwindPreset,
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
};

export default config;
