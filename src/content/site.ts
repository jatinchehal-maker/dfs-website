// Site-wide text. Homepage wording comes from deltafacilitiessolutions.com.
// Items marked PLACEHOLDER still need confirmation from Jatin.

export const SITE = {
  name: "Delta Facilities Solutions",
  shortName: "DFS",
  description:
    "Warehouse, packaging & distribution crews in Laval and Montreal. DFS hires, trains and supervises its own crews.",
  url: "https://deltafacilitiessolutions.com",
  email: "deltafacilitiessolutions@gmail.com",
  established: 2022,
};

export type NavLink = { label: string; href: string };
export type NavItem = NavLink | { label: string; items: NavLink[] };

export const NAV: NavItem[] = [
  {
    label: "Services",
    items: [
      { label: "All services", href: "/services" },
      { label: "Warehousing", href: "/services/warehousing" },
      { label: "Packaging & co-packing", href: "/services/packaging" },
      { label: "Distribution & fulfillment", href: "/services/distribution" },
      { label: "Delivery", href: "/services/delivery" },
      { label: "Seasonal peak coverage", href: "/services/seasonal-peaks" },
    ],
  },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Careers", items: [{ label: "Work with DFS", href: "/careers" }, { label: "Open jobs", href: "/jobs" }] },
  {
    label: "Resources",
    items: [
      { label: "Areas we serve", href: "/areas" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Estimate savings", href: "/savings" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export const HEADER = {
  languageToggle: { label: "FR", title: "Version française bientôt disponible" },
  cta: { label: "Book a consultation", href: "/contact" },
  login: { label: "Log in", href: "/login" },
  menuOpen: "Open menu",
  menuClose: "Close menu",
  logoAlt: "DFS logo, established 2022",
};

export const FOOTER = {
  tagline: "Warehousing, packaging, distribution and delivery for Laval and Montreal. Established 2022.",
  area: "Laval and Montréal",
  copyright: "© 2026 Delta Facilities Solutions. All rights reserved.",
  columns: [
    { title: "Services", links: [{ label: "All services", href: "/services" }, { label: "Areas we serve", href: "/areas" }, { label: "Estimate savings", href: "/savings" }] },
    { title: "Work with DFS", links: [{ label: "Careers", href: "/careers" }, { label: "Open jobs", href: "/jobs" }] },
    { title: "Company", links: [{ label: "About", href: "/#about" }, { label: "Case studies", href: "/case-studies" }, { label: "Blog", href: "/blog" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }] },
  ],
};

export const LOGIN_PLACEHOLDER = {
  title: "Log in",
  notice: "Login isn't set up yet.",
  body: "Accounts are coming soon. In the meantime, contact us by email.",
  back: "Back to the homepage",
};

export function mailto(subject: string): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}
