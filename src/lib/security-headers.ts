// Security headers sent with every page. Used by next.config.ts.

const ONE_YEAR_SECONDS = 31_536_000;

/** Origin of the Supabase project (the browser talks to it for login), or "" when not set. */
function supabaseOrigin(url: string | undefined): string {
  if (!url) return "";
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

// 'unsafe-inline' for scripts is needed for Next.js's inline boot scripts and the language script
// in layout.tsx. Removing it needs per-request nonces, which turn off static pages.
export function contentSecurityPolicy(supabaseUrl?: string): string {
  const supabase = supabaseOrigin(supabaseUrl);
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://cdn.21st.dev",
    `connect-src 'self'${supabase ? ` ${supabase}` : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ];
  return directives.join("; ");
}

export function securityHeaders(supabaseUrl?: string) {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(supabaseUrl) },
    { key: "Strict-Transport-Security", value: `max-age=${ONE_YEAR_SECONDS}; includeSubDomains` },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  ];
}
