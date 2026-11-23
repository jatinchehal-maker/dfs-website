"use client";
import { useState } from "react";
import ImageCard from "./ui/ImageCard";
import { JOBS, JOB_TYPES } from "@/content/jobs";

const ALL = "All";

export default function JobBoard() {
  const [type, setType] = useState(ALL);
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = JOBS.filter((j) => (type === ALL || j.type === type) && (!q || `${j.title} ${j.area}`.toLowerCase().includes(q)));

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="flex flex-col gap-4">
        <label className="text-sm font-semibold">
          Search jobs
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Job title or city" className="mt-2 w-full rounded-full border-2 border-black px-5 py-3 text-sm font-normal" />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type of work">
          {[ALL, ...JOB_TYPES].map((t) => (
            <button key={t} type="button" aria-pressed={t === type} onClick={() => setType(t)}
              className={`rounded-full border-2 border-black px-4 py-1.5 text-sm font-medium ${t === type ? "bg-black text-white" : "bg-white"}`}>{t}</button>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-neutral-500" aria-live="polite">{visible.length} job{visible.length === 1 ? "" : "s"}</p>
      {visible.length === 0 ? (
        <p className="py-16 text-center text-neutral-600">No jobs match. Try another search, or <a href="/careers" className="underline">apply anyway</a>.</p>
      ) : (
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {visible.map((j) => <ImageCard key={j.slug} href={`/jobs/${j.slug}`} image={j.image} title={j.title} meta={`${j.area} · ${j.shift}`} body={j.type} />)}
        </div>
      )}
    </section>
  );
}
