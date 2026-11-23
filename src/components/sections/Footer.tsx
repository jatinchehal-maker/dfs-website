import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { FOOTER, SITE } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-black px-5 pt-16 pb-8 text-neutral-300 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-xs text-sm">{FOOTER.tagline}</p>
          <address className="mt-5 space-y-1 text-sm not-italic">
            <a href={`mailto:${SITE.email}`} className="block font-semibold text-white hover:underline">{SITE.email}</a>
            <p>{FOOTER.area}</p>
          </address>
        </div>
        {FOOTER.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-display text-lg font-bold uppercase text-white">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white hover:underline">{l.label}</Link></li>)}
            </ul>
          </nav>
        ))}
      </div>
      <p className="mx-auto mt-14 max-w-6xl border-t border-neutral-800 pt-6 text-xs text-neutral-400">{FOOTER.copyright}</p>
    </footer>
  );
}
