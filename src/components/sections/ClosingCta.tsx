import ButtonLink from "@/components/ui/ButtonLink";
import { CLOSING_CTA } from "@/content/home";

export default function ClosingCta() {
  return (
    <section aria-labelledby="cta-heading" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border-2 border-black p-10 text-center md:p-16">
        <h2 id="cta-heading" className="font-display text-5xl font-bold uppercase leading-none md:text-6xl">{CLOSING_CTA.title}</h2>
        <p className="mt-5 text-lg text-neutral-700">{CLOSING_CTA.body}</p>
        <ButtonLink href={CLOSING_CTA.cta.href} className="mt-8">{CLOSING_CTA.cta.label}</ButtonLink>
      </div>
    </section>
  );
}
