import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { AREAS } from "@/content/areas";

export const metadata = { title: "Areas we serve" };

export default function AreasPage() {
  return (
    <>
      <PageHero eyebrow="Areas we serve" title="Laval, Montreal and the South Shore" subtitle="DFS crews work across the Greater Montreal area." image="/images/city.jpg" />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:grid-cols-2 sm:px-8 md:grid-cols-3">
        {AREAS.map((a) => (
          <Link key={a.slug} href={`/areas/${a.slug}`} className="group rounded-2xl border-2 border-black p-6 transition hover:bg-black hover:text-white">
            <p className="font-display text-3xl font-bold uppercase">{a.name}</p>
            <p className="mt-1 text-sm opacity-70">{a.region}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
