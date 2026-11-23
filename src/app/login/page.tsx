import type { Metadata } from "next";
import ButtonLink from "@/components/ui/ButtonLink";
import { LOGIN_PLACEHOLDER, SITE } from "@/content/site";

export const metadata: Metadata = { title: LOGIN_PLACEHOLDER.title, robots: { index: false } };

// Temporary page until Supabase Auth is added (Step 4).
export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold">{LOGIN_PLACEHOLDER.title}</h1>
      <p role="status" className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-medium">{LOGIN_PLACEHOLDER.notice}</p>
      <p className="mt-4 text-neutral-600">
        {LOGIN_PLACEHOLDER.body} <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>
      </p>
      <ButtonLink href="/" variant="secondary" className="mt-8">{LOGIN_PLACEHOLDER.back}</ButtonLink>
    </section>
  );
}
