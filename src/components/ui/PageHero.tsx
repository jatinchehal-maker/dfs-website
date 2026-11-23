import Image from "next/image";

type Props = { eyebrow?: string; title: string; subtitle?: string; image?: string; children?: React.ReactNode };

export default function PageHero({ eyebrow, title, subtitle, image, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {image && <Image src={image} alt="" fill priority className="object-cover opacity-30 grayscale" sizes="100vw" />}
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{eyebrow}</p>}
        <h1 className="font-display mt-4 max-w-4xl text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg text-neutral-300">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
