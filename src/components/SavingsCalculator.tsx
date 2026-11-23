"use client";
import { useState } from "react";
import ButtonLink from "./ui/ButtonLink";

const WEEKS_PER_YEAR = 52;
// ASSUMPTION — confirm with Jatin: management hours your own team saves per crew member per week
// when DFS handles hiring, training and supervision.
const MANAGER_HOURS_SAVED_PER_WORKER = 2;

type Key = "workers" | "managerRate" | "recruitingCost";
type Input = { key: Key; label: string; min: number; max: number; step: number; format: (v: number) => string };

const INPUTS: Input[] = [
  { key: "workers", label: "Extra crew members needed in peak weeks", min: 1, max: 100, step: 1, format: (v) => `${v}` },
  { key: "managerRate", label: "Your supervisor's hourly cost", min: 20, max: 80, step: 1, format: (v) => `$${v}/h` },
  { key: "recruitingCost", label: "Your recruiting cost per hire", min: 0, max: 2000, step: 50, format: (v) => `$${v.toLocaleString()}` },
];

export default function SavingsCalculator() {
  const [values, setValues] = useState<Record<Key, number>>({ workers: 15, managerRate: 35, recruitingCost: 400 });
  const supervisionSaved = values.workers * MANAGER_HOURS_SAVED_PER_WORKER * values.managerRate * WEEKS_PER_YEAR;
  const recruitingSaved = values.workers * values.recruitingCost;
  const total = supervisionSaved + recruitingSaved;

  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2">
      <div className="space-y-8">
        {INPUTS.map((i) => (
          <label key={i.key} className="block">
            <span className="flex justify-between gap-4 text-sm font-semibold">{i.label}<span>{i.format(values[i.key])}</span></span>
            <input type="range" min={i.min} max={i.max} step={i.step} value={values[i.key]}
              onChange={(e) => setValues((prev) => ({ ...prev, [i.key]: Number(e.target.value) }))}
              className="mt-3 w-full accent-black" />
          </label>
        ))}
      </div>
      <div className="rounded-2xl bg-black p-8 text-white" aria-live="polite">
        <p className="text-sm text-neutral-400">Estimated yearly time & recruiting cost you hand off</p>
        <p className="font-display mt-2 text-6xl font-bold">${total.toLocaleString()}</p>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-neutral-400">Supervision time</dt><dd>${supervisionSaved.toLocaleString()}</dd></div>
          <div className="flex justify-between"><dt className="text-neutral-400">Recruiting</dt><dd>${recruitingSaved.toLocaleString()}</dd></div>
        </dl>
        <p className="mt-6 text-xs text-neutral-400">Illustrative only, assuming {MANAGER_HOURS_SAVED_PER_WORKER} supervisor hours saved per crew member per week. Not a quote.</p>
        <ButtonLink href="/contact" variant="inverted" className="mt-8">Get a real quote</ButtonLink>
      </div>
    </section>
  );
}
