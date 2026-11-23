"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
import Logo from "@/components/ui/Logo";
import ButtonLink from "@/components/ui/ButtonLink";
import LanguageToggle from "@/components/LanguageToggle";
import AuthLinks from "@/components/auth/AuthLinks";
import { HEADER, NAV } from "@/content/site";

const TOP_NAV: LiquidNavItem[] = [
  { label: "Home", href: "/", icon: NimbusIcons.home, fx: "glow" },
  { label: "Services", href: "/services", icon: NimbusIcons.plane, fx: "plane" },
  { label: "Careers", href: "/careers", icon: NimbusIcons.user, fx: "wave" },
  { label: "Jobs", href: "/jobs", icon: NimbusIcons.drop, fx: "drop" },
  { label: "Areas", href: "/areas", icon: NimbusIcons.globe, fx: "spin" },
  { label: "Contact", href: "/contact", fx: "none" },
];

function activeIndex(pathname: string) {
  const found = TOP_NAV.findIndex((item, i) => i > 0 && item.href && pathname.startsWith(item.href));
  return found === -1 ? 0 : found;
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="Delta Facilities Solutions — home" onClick={closeMenu}><Logo /></Link>

        <div className="hidden xl:block">
          <LiquidNavbar items={TOP_NAV} active={activeIndex(pathname)} tone="light" />
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageToggle />
          <AuthLinks />
          <ButtonLink href={HEADER.cta.href} className="py-2.5">{HEADER.cta.label}</ButtonLink>
        </div>

        <button
          type="button" className="rounded-md p-2 xl:hidden" aria-expanded={menuOpen} aria-controls="mobile-menu"
          aria-label={menuOpen ? HEADER.menuClose : HEADER.menuOpen} onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t-2 border-black px-5 pb-8 xl:hidden">
          <ul className="divide-y divide-neutral-200">
            {NAV.map((item) =>
              "items" in item ? (
                <li key={item.label} className="py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{item.label}</p>
                  <ul className="mt-2">
                    {item.items.map((sub) => (
                      <li key={sub.href}><Link href={sub.href} onClick={closeMenu} className="block py-2">{sub.label}</Link></li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}><Link href={item.href} onClick={closeMenu} className="block py-3 font-medium">{item.label}</Link></li>
              ),
            )}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <AuthLinks onNavigate={closeMenu} />
            <LanguageToggle className="py-1" />
          </div>
          <ButtonLink href={HEADER.cta.href} className="mt-5 w-full">{HEADER.cta.label}</ButtonLink>
        </nav>
      )}
    </header>
  );
}
