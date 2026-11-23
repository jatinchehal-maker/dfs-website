import type { FormField } from "@/content/forms";

const INPUT = "mt-2 w-full rounded-lg border-2 border-black bg-white px-3 py-2.5 text-sm";

export default function Field({ field, error }: { field: FormField; error?: string }) {
  const { name, label, required, type = "text", options = [] } = field;
  const errorId = error ? `${name}-error` : undefined;
  const labelText = <>{label}{!required && <span className="font-normal text-neutral-500"> (optional)</span>}</>;

  if (type === "checkboxes") {
    return (
      <fieldset className="text-sm">
        <legend className="font-semibold">{labelText}</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {options.map((o) => (
            <label key={o} className="flex items-center gap-2 rounded-full border-2 border-black px-4 py-2">
              <input type="checkbox" name={name} value={o} className="accent-black" />{o}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <label className="block text-sm">
      <span className="font-semibold">{labelText}</span>
      {type === "select" ? (
        <select name={name} className={INPUT} defaultValue="" aria-invalid={!!error} aria-describedby={errorId}>
          <option value="" disabled>Select…</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} rows={4} className={INPUT} aria-invalid={!!error} aria-describedby={errorId} />
      ) : (
        <input name={name} type={type} className={INPUT} aria-invalid={!!error} aria-describedby={errorId} />
      )}
      {error && <span id={errorId} className="mt-1 block text-xs font-semibold">⚠ {error}</span>}
    </label>
  );
}
