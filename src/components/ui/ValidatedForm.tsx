"use client";
import { useState } from "react";
import Field from "./Field";
import { validate } from "@/lib/validate";
import type { FormField } from "@/content/forms";

type Props = { fields: FormField[]; submitLabel: string; successTitle: string; successBody: string };

// Validates in the browser. No backend yet: nothing is sent anywhere.
export default function ValidatedForm({ fields, submitLabel, successTitle, successBody }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(new FormData(event.currentTarget), fields);
    setErrors(found);
    if (Object.keys(found).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-2xl border-2 border-black bg-black p-8 text-center text-white">
        <p className="font-display text-3xl font-bold uppercase">{successTitle}</p>
        <p className="mt-2 text-sm text-neutral-300">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 rounded-2xl border-2 border-black bg-white p-6 sm:grid-cols-2 sm:p-8">
      {fields.map((f) => (
        <div key={f.name} className={f.wide || f.type === "checkboxes" ? "sm:col-span-2" : ""}>
          <Field field={f} error={errors[f.name]} />
        </div>
      ))}
      <div className="sm:col-span-2">
        <button type="submit" className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white hover:bg-neutral-800">{submitLabel} →</button>
        <p className="mt-3 text-center text-xs text-neutral-500">Demo form — not connected yet, nothing is sent.</p>
      </div>
    </form>
  );
}
