/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@craftui/ui", "@craftui/utils", "@craftui/registry"],
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // ESLint runs separately via `pnpm lint` (turbo). Skipping here avoids
  // the `next build` worker crashing when ESLint can't resolve a shared
  // config from a pnpm-symlinked workspace package.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
