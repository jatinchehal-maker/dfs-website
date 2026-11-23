import Image from "next/image";
import Link from "next/link";
import { GlowCard } from "@/components/ui/spotlight-card";

type Props = { href: string; image: string; title: string; meta: string; body: string };

export default function BlogCard({ href, image, title, meta, body }: Props) {
  return (
    <GlowCard className="group flex flex-col transition hover:-translate-y-1">
      <Link href={href} className="relative z-10 flex flex-1 flex-col overflow-hidden rounded-[14px]">
        <div className="relative h-52 overflow-hidden">
          <Image src={image} alt="" fill className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{meta}</p>
          <h3 className="mt-2 text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-neutral-600">{body}</p>
          <span className="mt-auto pt-4 text-sm font-semibold" aria-hidden="true">Read article →</span>
        </div>
      </Link>
    </GlowCard>
  );
}
