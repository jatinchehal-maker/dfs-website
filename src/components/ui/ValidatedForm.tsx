"use client";
import { useState } from "react";
import Field from "./Field";
import { validate } from "@/lib/validate";
import { SITE } from "@/content/site";
import type { FormField } from "@/content/forms";

type Props = {
  /** Which sheet tab the answers go to. */
  formId: "application" | "consultation";
  fields: FormField[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  /** Job the person is applying for (job pages only). */
  job?: string;
};

const SEND_ERROR = "We couldn't send your form. Please try again, or email us at";

// Checks the answers in the browser, then sends them to /forms/submit, which checks again and saves them to the sheet.
export default function ValidatedForm({ formId, fields, submitLabel, successTitle, successBody, job }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return; // Ignore a second click or Enter while the first send is in flight.
    const data = new FormData(event.currentTarget);
    const found = validate(data, fields);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/forms/submit", { method: "POST", body: data });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Record<string, string> };
      if (out.errors) { setErrors(out.errors); setStatus("idle"); return; }
      setStatus(res.ok && out.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border-2 border-black bg-black p-8 text-center text-white">
        <p className="font-display text-3xl font-bold uppercase">{successTitle}</p>
        <p className="mt-2 text-sm text-neutral-300">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 rounded-2xl border-2 border-black bg-white p-6 sm:grid-cols-2 sm:p-8">
      <input type="hidden" name="_form" value={formId} />
      {job && <input type="hidden" name="_job" value={job} />}
      {/* Honeypot for bots: hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Website<input type="text" name="_website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {fields.map((f) => (
        <div key={f.name} className={f.wide || f.type === "checkboxes" ? "sm:col-span-2" : ""}>
          <Field field={f} error={errors[f.name]} />
        </div>
      ))}
      <div className="sm:col-span-2">
        {status === "failed" && (
          <p role="alert" className="mb-4 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white">
            {SEND_ERROR} <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
          </p>
        )}
        <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60">
          {status === "sending" ? "Sending…" : `${submitLabel} →`}
        </button>
      </div>
    </form>
  );
}
