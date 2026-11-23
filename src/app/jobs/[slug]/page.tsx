import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ImageCard from "@/components/ui/ImageCard";
import ValidatedForm from "@/components/ui/ValidatedForm";
import { JOBS, JOB_DETAILS } from "@/content/jobs";
import { APPLICATION_FORM } from "@/content/forms";

const RELATED_COUNT = 3;

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">) {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);
  return { title: job ? `${job.title} — ${job.area}` : "Job" };
}

export default async function JobPage({ params }: PageProps<"/jobs/[slug]">) {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);
  if (!job) notFound();
  const lists = [["Responsibilities", JOB_DETAILS.responsibilities], ["What you get", JOB_DETAILS.benefits], ["Requirements", JOB_DETAILS.requirements]] as const;
  const related = JOBS.filter((j) => j.slug !== job.slug).slice(0, RELATED_COUNT);
  return (
    <>
      <PageHero eyebrow={job.type} title={`${job.title} in ${job.area}`} subtitle={job.shift} image={job.image} />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-10">
          {lists.map(([heading, items]) => (
            <div key={heading}>
              <h2 className="font-display text-3xl font-bold uppercase">{heading}</h2>
              <ul className="mt-4 space-y-2">{items.map((i) => <li key={i} className="flex gap-3"><span aria-hidden="true">✓</span>{i}</li>)}</ul>
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-display mb-4 text-3xl font-bold uppercase">Apply for this job</h2>
          <ValidatedForm fields={APPLICATION_FORM} submitLabel="Send application" successTitle="Application received" successBody="Thanks! DFS will contact you about this job." />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <h2 className="font-display text-4xl font-bold uppercase">More jobs near you</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {related.map((j) => <ImageCard key={j.slug} href={`/jobs/${j.slug}`} image={j.image} title={j.title} meta={`${j.area} · ${j.shift}`} body={j.type} />)}
        </div>
      </section>
    </>
  );
}
