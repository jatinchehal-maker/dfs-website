import PageHero from "@/components/ui/PageHero";
import ImageCard from "@/components/ui/ImageCard";
import { POSTS } from "@/content/posts";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Notes for operations teams and crews" />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 gap-y-12 md:grid-cols-3">
        {POSTS.map((p) => <ImageCard key={p.slug} href={`/blog/${p.slug}`} image={p.image} badge={p.category} title={p.title} meta={p.date} body={p.excerpt} />)}
      </section>
    </>
  );
}
