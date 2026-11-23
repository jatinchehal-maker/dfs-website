import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents and partialPrefetching are off: Cloudflare (OpenNext) hangs with them on.
  // Served as-is on Cloudflare (no paid Image Resizing needed).
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
