import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders(process.env.NEXT_PUBLIC_SUPABASE_URL) }];
  },
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
