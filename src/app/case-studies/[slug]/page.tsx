import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ButtonLink from "@/components/ui/ButtonLink";
import { CASES } from "@/content/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = CASES.find((c) => c.slug === slug);
  if (!study) notFound();
  const parts = [["Problem", study.problem], ["Solution", study.solution], ["Results", study.results]];
  return (
    <>
      <PageHero eyebrow={study.client} title={study.title} image={study.image} />
      <section className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1fr_2fr]">
        <dl className="space-y-4">
          {study.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-black p-6 text-white">
              <dd className="font-display text-5xl font-bold">{s.value}</dd>
              <dt className="text-sm text-neutral-400">{s.label}</dt>
            </div>
          ))}
        </dl>
        <div className="space-y-10">
          {parts.map(([heading, body]) => (
            <div key={heading}>
              <h2 className="font-display text-3xl font-bold uppercase">{heading}</h2>
              <p className="mt-3 text-lg text-neutral-800">{body}</p>
            </div>
          ))}
          <ButtonLink href="/contact">Plan your next peak with DFS</ButtonLink>
        </div>
      </section>
    </>
  );
}
