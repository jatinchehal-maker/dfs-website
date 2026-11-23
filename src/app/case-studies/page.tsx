import PageHero from "@/components/ui/PageHero";
import ImageCard from "@/components/ui/ImageCard";
import { CASES } from "@/content/cases";

export const metadata = { title: "Case studies" };

export default function CasesPage() {
  return (
    <>
      <PageHero eyebrow="Case studies" title="How DFS crews cover the peaks" />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-3">
        {CASES.map((c) => <ImageCard key={c.slug} href={`/case-studies/${c.slug}`} image={c.image} title={c.title} badge={c.client} body={c.problem} />)}
      </section>
    </>
  );
}
