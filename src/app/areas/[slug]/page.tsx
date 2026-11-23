import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ButtonLink from "@/components/ui/ButtonLink";
import ImageCard from "@/components/ui/ImageCard";
import { LocationMap } from "@/components/ui/expand-map";
import { AREAS } from "@/content/areas";
import { SERVICES } from "@/content/services";
import { JOBS } from "@/content/jobs";

const SERVICES_SHOWN = 3;

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);
  return { title: area ? `Warehouse crews in ${area.name}` : "Area" };
}

export default async function AreaPage({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);
  if (!area) notFound();
  const localJobs = JOBS.filter((j) => j.area === area.name);
  return (
    <>
      <PageHero eyebrow={area.region} title={`Warehouse, packaging and distribution crews in ${area.name}`} subtitle="Hired, trained and supervised by DFS." image="/images/city.jpg">
        <ButtonLink href="/contact" variant="inverted">Book a consultation</ButtonLink>
        <ButtonLink href="/jobs" variant="ghostInverted">Find work in {area.name}</ButtonLink>
      </PageHero>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase">Where we work in {area.name}</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {area.neighbourhoods.map((n) => <li key={n} className="rounded-full border-2 border-black px-4 py-2 text-sm font-medium">{n}</li>)}
            </ul>
          </div>
          <LocationMap location={`${area.name}, QC`} coordinates={area.coordinates} className="shrink-0 pb-6" />
        </div>
        <h2 className="font-display mt-16 text-4xl font-bold uppercase">Services in {area.name}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {SERVICES.slice(0, SERVICES_SHOWN).map((s) => <ImageCard key={s.slug} href={`/services/${s.slug}`} image={s.image} title={s.title} body={s.summary} />)}
        </div>
        {localJobs.length > 0 && (
          <>
            <h2 className="font-display mt-16 text-4xl font-bold uppercase">Jobs in {area.name}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {localJobs.map((j) => <ImageCard key={j.slug} href={`/jobs/${j.slug}`} image={j.image} title={j.title} meta={j.shift} body={j.type} />)}
            </div>
          </>
        )}
      </section>
    </>
  );
}
