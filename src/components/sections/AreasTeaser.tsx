import Image from "next/image";
import Link from "next/link";
import { LocationMap } from "@/components/ui/expand-map";
import ButtonLink from "@/components/ui/ButtonLink";
import { AREAS } from "@/content/areas";
import { AREAS_TEASER } from "@/content/home";

export default function AreasTeaser() {
  return (
    <section aria-labelledby="areas-heading" className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-8">
      <Image src="/images/city.jpg" alt="" fill className="object-cover opacity-25 grayscale" sizes="100vw" />
      <div className="relative mx-auto max-w-5xl text-center">
        <h2 id="areas-heading" className="font-display text-5xl font-bold uppercase leading-none">{AREAS_TEASER.title}</h2>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {AREAS.map((a) => (
            <li key={a.slug}><Link href={`/areas/${a.slug}`} className="block rounded-full border-2 border-white px-5 py-2 text-sm font-medium hover:bg-white hover:text-black">{a.name}</Link></li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-10">
          {AREAS.slice(0, 3).map((a) => <LocationMap key={a.slug} location={`${a.name}, QC`} coordinates={a.coordinates} />)}
        </div>
        <div className="mt-14"><ButtonLink href={AREAS_TEASER.cta.href} variant="inverted">{AREAS_TEASER.cta.label}</ButtonLink></div>
      </div>
    </section>
  );
}
