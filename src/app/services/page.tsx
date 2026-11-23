import PageHero from "@/components/ui/PageHero";
import ImageCard from "@/components/ui/ImageCard";
import ClosingCta from "@/components/sections/ClosingCta";
import { SERVICES } from "@/content/services";
import { SERVICES_INTRO } from "@/content/home";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={SERVICES_INTRO.title} subtitle={SERVICES_INTRO.intro} image="/images/forklift.jpg" />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {SERVICES.map((s) => <ImageCard key={s.slug} href={`/services/${s.slug}`} image={s.image} title={s.title} body={s.summary} />)}
      </section>
      <ClosingCta />
    </>
  );
}
