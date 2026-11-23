import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ButtonLink from "@/components/ui/ButtonLink";
import Comparison from "@/components/sections/Comparison";
import HowItWorks from "@/components/sections/HowItWorks";
import ClosingCta from "@/components/sections/ClosingCta";
import { SERVICES } from "@/content/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  return { title: service?.title ?? "Service", description: service?.summary };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();
  return (
    <>
      <PageHero eyebrow="Service" title={service.title} subtitle={service.summary} image={service.image}>
        <ButtonLink href="/contact" variant="inverted">Book a consultation</ButtonLink>
      </PageHero>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-4xl font-bold uppercase">What our crews cover</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.tasks.map((t) => <li key={t} className="rounded-2xl border-2 border-black p-5 font-semibold">{t}</li>)}
        </ul>
      </section>
      <HowItWorks />
      <Comparison />
      <ClosingCta />
    </>
  );
}
