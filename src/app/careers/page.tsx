import Image from "next/image";
import ValidatedForm from "@/components/ui/ValidatedForm";
import ButtonLink from "@/components/ui/ButtonLink";
import { APPLICATION_FORM } from "@/content/forms";
import { CAREERS_TEASER } from "@/content/home";

export const metadata = { title: "Work with DFS", description: "Warehouse, packaging, distribution and delivery jobs in Laval and Montreal. Apply in two minutes." };

export default function CareersPage() {
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h1 className="font-display text-6xl font-bold uppercase leading-none">Work with DFS</h1>
        <p className="mt-5 text-lg text-neutral-700">Warehouse, packaging, distribution and delivery jobs in Laval and Montreal. Apply in two minutes.</p>
        <ul className="mt-6 space-y-3">{CAREERS_TEASER.bullets.map((b) => <li key={b} className="flex gap-3 font-medium"><span aria-hidden="true">✓</span>{b}</li>)}</ul>
        <ButtonLink href="/jobs" variant="secondary" className="mt-8">See open jobs</ButtonLink>
        <div className="relative mt-10 h-72"><Image src="/images/forklift.jpg" alt="Forklift operator moving a pallet" fill className="rounded-2xl object-cover grayscale" sizes="(min-width: 1024px) 40vw, 100vw" /></div>
      </div>
      <ValidatedForm fields={APPLICATION_FORM} submitLabel="Send application" successTitle="Application received" successBody="Thanks! DFS will contact you about upcoming shifts." />
    </section>
  );
}
