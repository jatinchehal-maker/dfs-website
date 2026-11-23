import Image from "next/image";
import Section from "@/components/ui/Section";
import { ABOUT } from "@/content/home";

export default function About() {
  return (
    <Section id={ABOUT.id} eyebrow={ABOUT.eyebrow} title={ABOUT.title}>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-5 text-lg text-neutral-700">{ABOUT.body.map((p) => <p key={p}>{p}</p>)}</div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
          <Image src="/brand/flyer.jpg" alt="DFS flyer: Delta Facilities Solutions — warehousing, packaging, distribution and delivery" fill className="rounded-2xl border-2 border-black object-cover" sizes="384px" />
        </div>
      </div>
    </Section>
  );
}
