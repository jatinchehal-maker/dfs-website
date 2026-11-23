import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import { CAREERS_TEASER } from "@/content/home";

export default function CareersTeaser() {
  return (
    <section id={CAREERS_TEASER.id} aria-labelledby="careers-heading" className="scroll-mt-20 bg-black px-5 py-20 text-white sm:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{CAREERS_TEASER.eyebrow}</p>
          <h2 id="careers-heading" className="font-display mt-3 text-5xl font-bold uppercase leading-none">{CAREERS_TEASER.title}</h2>
          <p className="mt-6 text-neutral-300">{CAREERS_TEASER.body}</p>
          <ul className="mt-6 space-y-3">
            {CAREERS_TEASER.bullets.map((b) => <li key={b} className="flex gap-3"><span aria-hidden="true">✓</span>{b}</li>)}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={CAREERS_TEASER.primary.href} variant="inverted">{CAREERS_TEASER.primary.label}</ButtonLink>
            <ButtonLink href={CAREERS_TEASER.secondary.href} variant="ghostInverted">{CAREERS_TEASER.secondary.label}</ButtonLink>
          </div>
        </div>
        <div className="relative h-96">
          <Image src="/images/team.jpg" alt="A crew of workers in hard hats" fill className="rounded-2xl object-cover grayscale" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
