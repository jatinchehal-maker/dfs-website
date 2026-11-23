"use client";
import { useEffect, useRef, useState } from "react";
import { FACTS } from "@/content/home";

const DURATION_MS = 1400;

function CountUp({ target }: { target: number }) {
  const [value, setValue] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        setValue(Math.round(target * progress));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value}</span>;
}

export default function Facts() {
  return (
    <section aria-labelledby="facts-heading" className="bg-black px-5 py-20 text-white sm:px-8">
      <h2 id="facts-heading" className="font-display text-center text-3xl font-bold uppercase">{FACTS.title}</h2>
      <dl className="mx-auto mt-12 grid max-w-5xl divide-neutral-700 md:grid-cols-3 md:divide-x">
        {FACTS.items.map((f) => (
          <div key={f.label} className="py-6 text-center">
            <dd className="font-display text-6xl font-bold"><CountUp target={f.value} />{f.suffix}</dd>
            <dt className="mt-2 text-sm text-neutral-400">{f.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
