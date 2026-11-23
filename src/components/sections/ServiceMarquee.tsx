import { SERVICES } from "@/content/services";

// Scrolling strip of service names (replaces a client-logo strip until DFS has client permission).
export default function ServiceMarquee() {
  const doubled = [...SERVICES, ...SERVICES];
  return (
    <div className="overflow-hidden border-b-2 border-black py-6" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-12">
        {doubled.map((s, i) => (
          <span key={i} className="font-display whitespace-nowrap text-3xl font-bold uppercase">{s.title} <span className="ml-12">✦</span></span>
        ))}
      </div>
    </div>
  );
}
