"use client";
import { useActionState } from "react";
import type { AuthState } from "@/lib/auth-actions";

type Input = { name: string; label: string; type?: string; autoComplete?: string; minLength?: number };
type Props = {
  action: (state: AuthState, form: FormData) => Promise<AuthState>;
  inputs: Input[];
  submitLabel: string;
  hidden?: Record<string, string>;
  children?: React.ReactNode;
};

export default function AuthForm({ action, inputs, submitLabel, hidden, children }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="mt-8 grid gap-5 rounded-2xl border-2 border-black bg-white p-6 text-left sm:p-8">
      {hidden && Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      {inputs.map((i) => (
        <label key={i.name} className="grid gap-1.5 text-sm font-semibold">
          {i.label}
          <input
            name={i.name} type={i.type ?? "text"} autoComplete={i.autoComplete} minLength={i.minLength} required
            className="rounded-xl border-2 border-black px-4 py-3 font-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          />
        </label>
      ))}
      {state.error && <p role="alert" className="rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white">{state.error}</p>}
      {state.message && <p role="status" className="rounded-xl border-2 border-black px-4 py-3 text-sm font-semibold">{state.message}</p>}
      <button type="submit" disabled={pending} className="rounded-full bg-black py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60">
        {pending ? "Please wait…" : `${submitLabel} →`}
      </button>
      {children}
    </form>
  );
}
