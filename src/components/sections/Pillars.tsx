import { PILLARS } from "@/content/home";

export default function Pillars() {
  return (
    <section aria-label="What DFS does" className="border-b-2 border-black">
      <ul className="mx-auto grid max-w-7xl md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <li key={p.title} className={`px-5 py-10 sm:px-8 ${i > 0 ? "border-t-2 border-black md:border-t-0 md:border-l-2" : ""}`}>
            <p className="font-display text-4xl font-bold uppercase">{p.title}</p>
            <p className="mt-2 text-neutral-700">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
