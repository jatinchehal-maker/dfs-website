import { describe, expect, test } from "vitest";
import { contentSecurityPolicy, securityHeaders } from "./security-headers";

describe("security headers", () => {
  test("blocks framing and plugins", () => {
    const csp = contentSecurityPolicy();
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
  });

  test("allows only the Supabase origin for login calls", () => {
    expect(contentSecurityPolicy("https://abc.supabase.co/rest/v1")).toContain("connect-src 'self' https://abc.supabase.co;");
  });

  test("ignores an invalid Supabase URL", () => {
    expect(contentSecurityPolicy("not a url")).toContain("connect-src 'self';");
  });

  test("includes HSTS, nosniff and DENY", () => {
    const keys = Object.fromEntries(securityHeaders().map((h) => [h.key, h.value]));
    expect(keys["Strict-Transport-Security"]).toMatch(/max-age=\d+/);
    expect(keys["X-Content-Type-Options"]).toBe("nosniff");
    expect(keys["X-Frame-Options"]).toBe("DENY");
  });
});
