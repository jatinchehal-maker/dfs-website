import ButtonLink from "@/components/ui/ButtonLink";
import { LOGIN_PLACEHOLDER, SITE } from "@/content/site";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/** Frame for the auth pages. Shows the "not set up yet" note while the Supabase keys are missing. */
export default function AuthShell({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-md px-5 py-20 text-center">
      <h1 className="font-display text-5xl font-bold uppercase leading-none">{title}</h1>
      {intro && <p className="mt-4 text-neutral-600">{intro}</p>}
      {isSupabaseConfigured ? children : (
        <>
          <p role="status" className="mt-8 rounded-xl border-2 border-black p-4 font-semibold">{LOGIN_PLACEHOLDER.notice}</p>
          <p className="mt-4 text-neutral-600">{LOGIN_PLACEHOLDER.body} <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a></p>
          <ButtonLink href="/" variant="secondary" className="mt-8">{LOGIN_PLACEHOLDER.back}</ButtonLink>
        </>
      )}
    </section>
  );
}
