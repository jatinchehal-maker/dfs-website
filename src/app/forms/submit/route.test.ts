import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const limiter = { allow: true };
vi.mock("@/lib/rate-limit", () => ({ allowFormSubmit: async () => limiter.allow }));

const { POST } = await import("./route");

const consultation = (extra: Record<string, string> = {}) => {
  const form = new FormData();
  const values = { _form: "consultation", name: "Ana", company: "Acme", email: "ana@acme.com", work: "Packing", ...extra };
  Object.entries(values).forEach(([k, v]) => form.set(k, v));
  return new Request("http://localhost/forms/submit", { method: "POST", body: form }) as never;
};

describe("POST /forms/submit", () => {
  beforeEach(() => {
    limiter.allow = true;
    vi.stubEnv("SHEETS_WEBHOOK_URL", "https://sheet.example/exec");
    vi.stubEnv("SHEETS_WEBHOOK_TOKEN", "test-token");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  test("saves a valid submission to the sheet", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ ok: true }));
    const res = await POST(consultation());
    expect(res.status).toBe(200);
    const sent = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(sent).toMatchObject({ token: "test-token", form: "consultation", data: { Company: "Acme" } });
  });

  test("returns 429 when the visitor is rate limited", async () => {
    limiter.allow = false;
    const fetchMock = vi.spyOn(globalThis, "fetch");
    expect((await POST(consultation())).status).toBe(429);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("silently accepts honeypot submissions without saving", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    expect((await POST(consultation({ _website: "spam.example" }))).status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("rejects an unknown form id", async () => {
    expect((await POST(consultation({ _form: "admin" }))).status).toBe(400);
  });

  test("returns 422 with field errors for invalid input", async () => {
    const res = await POST(consultation({ email: "bad" }));
    expect(res.status).toBe(422);
    expect((await res.json()).errors).toHaveProperty("email");
  });

  test("returns 502 when the sheet rejects the submission", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(Response.json({ ok: false }));
    expect((await POST(consultation())).status).toBe(502);
  });

  test("returns 503 when the sheet is not configured", async () => {
    vi.stubEnv("SHEETS_WEBHOOK_TOKEN", "");
    expect((await POST(consultation())).status).toBe(503);
  });
});
