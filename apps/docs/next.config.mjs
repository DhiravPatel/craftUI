/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@craftui/ui", "@craftui/utils", "@craftui/registry"],
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // ESLint runs separately via `pnpm lint` (turbo). Skipping here avoids
  // the `next build` worker crashing when ESLint can't resolve a shared
  // config from a pnpm-symlinked workspace package.
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      // Calendar docs were merged into Date Picker.
      {
        source: "/docs/components/calendar",
        destination: "/docs/components/date-picker",
        permanent: false,
      },
      // Drawer docs were merged into Sheet (Sheet has a `bottom` side).
      {
        source: "/docs/components/drawer",
        destination: "/docs/components/sheet",
        permanent: false,
      },
      // Toggle Group docs were merged into Toggle.
      {
        source: "/docs/components/toggle-group",
        destination: "/docs/components/toggle",
        permanent: false,
      },
      // Label is internal-only — its docs were folded into Input/Form.
      {
        source: "/docs/components/label",
        destination: "/docs/components/input",
        permanent: false,
      },
      // ScrollArea was removed.
      {
        source: "/docs/components/scroll-area",
        destination: "/docs/components",
        permanent: false,
      },
      // GlowingStars merged into Sparkles via the `shape="dot"` prop.
      {
        source: "/docs/components/glowing-stars",
        destination: "/docs/components/sparkles",
        permanent: false,
      },
      // Text effects merged into the single AnimatedText component (variants).
      {
        source: "/docs/components/shiny-text",
        destination: "/docs/components/animated-text",
        permanent: false,
      },
      {
        source: "/docs/components/gradient-text",
        destination: "/docs/components/animated-text",
        permanent: false,
      },
      {
        source: "/docs/components/typewriter",
        destination: "/docs/components/animated-text",
        permanent: false,
      },
      {
        source: "/docs/components/text-reveal",
        destination: "/docs/components/animated-text",
        permanent: false,
      },
      // WobbleCard removed — Tilt covers the same use case.
      {
        source: "/docs/components/wobble-card",
        destination: "/docs/components/tilt",
        permanent: false,
      },
      // MacbookScroll removed.
      {
        source: "/docs/components/macbook-scroll",
        destination: "/docs/components",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
