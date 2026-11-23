import Section from "@/components/ui/Section";
import ImageCard from "@/components/ui/ImageCard";
import ButtonLink from "@/components/ui/ButtonLink";
import { SERVICES } from "@/content/services";
import { SERVICES_INTRO } from "@/content/home";

export default function ServicesGrid() {
  return (
    <Section id={SERVICES_INTRO.id} eyebrow={SERVICES_INTRO.eyebrow} title={SERVICES_INTRO.title} intro={SERVICES_INTRO.intro}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => <ImageCard key={s.slug} href={`/services/${s.slug}`} image={s.image} title={s.title} body={s.summary} />)}
      </div>
      <div className="mt-10"><ButtonLink href={SERVICES_INTRO.cta.href} variant="secondary">{SERVICES_INTRO.cta.label}</ButtonLink></div>
    </Section>
  );
}
