import Image from "next/image";
import { notFound } from "next/navigation";
import ImageCard from "@/components/ui/ImageCard";
import FaqList from "@/components/ui/FaqList";
import ButtonLink from "@/components/ui/ButtonLink";
import { POSTS } from "@/content/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return { title: post?.title ?? "Article", description: post?.excerpt };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const cta = post.category === "Workers" ? { label: "Apply now", href: "/careers" } : { label: "Book a consultation", href: "/contact" };
  return (
    <>
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{post.category} · <time dateTime={post.date}>{post.date}</time></p>
      <h1 className="font-display mt-3 text-5xl font-bold uppercase leading-none">{post.title}</h1>
      <div className="relative mt-8 h-80"><Image src={post.image} alt="" fill priority className="rounded-2xl object-cover grayscale" sizes="768px" /></div>
      {post.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="font-display text-3xl font-bold uppercase">{s.heading}</h2>
          <p className="mt-3 text-lg leading-relaxed text-neutral-800">{s.body}</p>
        </section>
      ))}
      {post.faq && (
        <section className="mt-12">
          <h2 className="font-display text-3xl font-bold uppercase">FAQ</h2>
          <div className="mt-4"><FaqList items={post.faq} /></div>
        </section>
      )}
      <ButtonLink href={cta.href} className="mt-12">{cta.label}</ButtonLink>
    </article>
    <section aria-labelledby="more-articles" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
      <h2 id="more-articles" className="font-display text-4xl font-bold uppercase">More articles</h2>
      <div className="mt-8 grid gap-6 gap-y-12 md:grid-cols-2">
        {POSTS.filter((p) => p.slug !== post.slug).map((p) => <ImageCard key={p.slug} href={`/blog/${p.slug}`} image={p.image} badge={p.category} title={p.title} meta={p.date} body={p.excerpt} />)}
      </div>
    </section>
    </>
  );
}
