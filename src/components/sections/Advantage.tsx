"use client";
import { useState } from "react";
import { ADVANTAGES } from "@/content/home";

export default function Advantage() {
  const [activeId, setActiveId] = useState(ADVANTAGES.tabs[0].id);
  const active = ADVANTAGES.tabs.find((t) => t.id === activeId) ?? ADVANTAGES.tabs[0];
  return (
    <section aria-labelledby="advantage-heading" className="bg-neutral-100 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 id="advantage-heading" className="font-display text-center text-5xl font-bold uppercase">{ADVANTAGES.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-600">{ADVANTAGES.intro}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.5fr]">
          <div role="tablist" aria-label={ADVANTAGES.title} className="flex flex-col gap-3">
            {ADVANTAGES.tabs.map((t) => (
              <button
                key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={t.id === activeId} aria-controls={`panel-${t.id}`}
                onClick={() => setActiveId(t.id)}
                className={`font-display rounded-2xl border-2 border-black p-5 text-left text-2xl font-bold uppercase transition ${t.id === activeId ? "bg-black text-white" : "bg-white hover:bg-neutral-200"}`}
              >
                {t.title}
              </button>
            ))}
          </div>
          <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`} className="rounded-2xl border-2 border-black bg-white p-8">
            <p className="text-lg">{active.body}</p>
            <ul className="mt-6 space-y-3">
              {active.points.map((p) => <li key={p} className="flex gap-3 font-medium"><span aria-hidden="true">✓</span>{p}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
