import { NextResponse, type NextRequest } from "next/server";
import { APPLICATION_FORM, CONSULTATION_FORM, type FormField } from "@/content/forms";
import { validate } from "@/lib/validate";
import { allowFormSubmit } from "@/lib/rate-limit";

const FORMS: Record<string, FormField[]> = { application: APPLICATION_FORM, consultation: CONSULTATION_FORM };
const MAX_FIELD = 5000; // characters per field
const MAX_BODY = 50_000; // bytes per submission
const TIMEOUT_MS = 10_000;

type Reply = { ok: boolean; error?: string; errors?: Record<string, string> };
const reply = (body: Reply, status = 200) => NextResponse.json(body, { status });

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY) return reply({ ok: false, error: "too_large" }, 413);
  if (!(await allowFormSubmit(request))) return reply({ ok: false, error: "too_many" }, 429);

  let form: FormData;
  try { form = await request.formData(); } catch { return reply({ ok: false, error: "bad_request" }, 400); }

  // Honeypot: real people never fill this hidden field.
  if (String(form.get("_website") ?? "")) return reply({ ok: true });

  const formId = String(form.get("_form") ?? "");
  const fields = FORMS[formId];
  if (!fields) return reply({ ok: false, error: "bad_request" }, 400);

  const errors = validate(form, fields);
  if (Object.keys(errors).length) return reply({ ok: false, errors }, 422);

  const data: Record<string, string> = {};
  for (const f of fields) data[f.label] = form.getAll(f.name).map(String).join(", ").slice(0, MAX_FIELD);
  const job = String(form.get("_job") ?? "").slice(0, 200);
  const labels = fields.map((f) => f.label);
  if (formId === "application") { labels.push("Job"); data.Job = job || "General application"; }

  const url = process.env.SHEETS_WEBHOOK_URL;
  const token = process.env.SHEETS_WEBHOOK_TOKEN;
  if (!url || !token) {
    console.error("[form] SHEETS_WEBHOOK_URL / SHEETS_WEBHOOK_TOKEN not set; submission not saved");
    return reply({ ok: false, error: "not_connected" }, 503);
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, form: formId, labels, data }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: "follow",
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !out?.ok) {
      console.error("[form] sheet rejected submission", res.status);
      return reply({ ok: false, error: "save_failed" }, 502);
    }
    return reply({ ok: true });
  } catch (err) {
    console.error("[form] sheet request failed", err);
    return reply({ ok: false, error: "save_failed" }, 502);
  }
}
