// Homepage text — wording from deltafacilitiessolutions.com.
export const HERO = {
  title: "Delta Facilities Solutions",
  body: "We run warehousing, packaging and distribution work for businesses around Laval and Montreal. We hire, train and supervise our own crews, so your team stays focused on its permanent roles.",
  primary: { label: "Book a consultation", href: "/contact" },
  secondary: { label: "Find work with DFS", href: "/careers" },
  hint: "Move your cursor across the logo",
};

export const PILLARS = [
  { title: "We hire", body: "Recruiting, screening and onboarding handled by DFS" },
  { title: "We train", body: "Crews trained for your site, process and safety rules" },
  { title: "We supervise", body: "A DFS lead on site, so you manage results, not schedules" },
];

export const SERVICES_INTRO = {
  id: "services",
  eyebrow: "Services",
  title: "Operational crews for the work that peaks",
  intro: "Hand us a scope of work instead of a pile of job postings. We staff it, run it and answer for it.",
  cta: { label: "See all services", href: "/services" },
};

export const COMPARISON = {
  title: "Why hand the work to DFS",
  them: "Staffing agency",
  rows: [
    { label: "What you get", them: "People to manage", us: "A scope of work, delivered" },
    { label: "Training", them: "Usually on you", us: "Done by DFS before day one" },
    { label: "Supervision", them: "Your managers", us: "A DFS lead on site" },
    { label: "Contacts", them: "Every worker", us: "One DFS contact" },
    { label: "Invoices", them: "Per worker, per hour", us: "One invoice" },
    { label: "Scaling", them: "New requests each time", us: "Up or down as volume changes" },
  ],
};

export const FACTS = {
  title: "Local, focused, accountable",
  items: [
    { value: 2022, suffix: "", label: "Established" },
    { value: 5, suffix: "", label: "Service lines" },
    { value: 3, suffix: "", label: "Regions: Laval, Montreal, South Shore" },
  ],
};

export const HOW_IT_WORKS = {
  id: "how-it-works",
  eyebrow: "How it works",
  title: "From first call to a crew on site",
  hint: "Click a folder to open it",
  steps: [
    {
      title: "Tell us the work", art: "glacier", folderMeta: "15-minute call",
      body: "A 15-minute call about volumes, shifts, location and the tasks your team needs covered.",
      files: [{ name: "Volumes", meta: "Orders or units per week" }, { name: "Shifts", meta: "Days, evenings, weekends" }, { name: "Location", meta: "Laval, Montreal, South Shore" }, { name: "Tasks", meta: "What the crew will do" }],
    },
    {
      title: "We build the crew", art: "aurora", folderMeta: "Done by DFS",
      body: "DFS hires, screens and trains the people for your process, and assigns a lead.",
      files: [{ name: "Hiring", meta: "Local recruiting" }, { name: "Screening", meta: "Interviews & references" }, { name: "Training", meta: "Your site & safety rules" }, { name: "Crew lead", meta: "One DFS lead on site" }],
    },
    {
      title: "We run it with you", art: "verdant", folderMeta: "Ongoing",
      body: "The crew works under DFS supervision. You get one contact and one invoice, and scale up or down as volume changes.",
      files: [{ name: "Supervision", meta: "DFS lead every shift" }, { name: "One contact", meta: "Your DFS manager" }, { name: "One invoice", meta: "Per worker, per hour" }, { name: "Scaling", meta: "Up or down with volume" }],
    },
  ],
};

export const ADVANTAGES = {
  title: "The DFS difference",
  intro: "Hiring, training and supervision in one partner — so peaks stop being a recruiting problem.",
  tabs: [
    { id: "hire", title: "We hire", body: "Recruiting, screening and onboarding handled by DFS. You never post a job ad or sort a résumé.", points: ["Local recruiting", "Screening & references", "Onboarding paperwork"] },
    { id: "train", title: "We train", body: "Crews are trained for your site, process and safety rules before they start.", points: ["Site-specific training", "Safety rules", "Quality checks built into the shift"] },
    { id: "supervise", title: "We supervise", body: "A DFS lead is on site, so you manage results, not schedules.", points: ["On-site DFS lead", "One contact", "One invoice"] },
  ],
};

export const CAREERS_TEASER = {
  id: "careers",
  eyebrow: "Careers",
  title: "Looking for work in Laval or Montreal?",
  body: "We hire for warehouse, packaging, distribution and delivery roles. No experience? We train you. Tell us about yourself and when you can work.",
  bullets: ["Training before you start", "Day, evening and weekend shifts", "A DFS supervisor on site with you"],
  primary: { label: "Apply now", href: "/careers" },
  secondary: { label: "See open jobs", href: "/jobs" },
};

export const ABOUT = {
  id: "about",
  eyebrow: "About",
  title: "A local partner, not a job board",
  body: [
    "Delta Facilities Solutions was founded by Jatin Chehal to give businesses in the Montreal area a simpler way to handle busy seasons. Instead of recruiting for every peak, HR and operations teams hand the work to us.",
    "We are based in the Montreal area and work across Laval, Montreal and the South Shore.",
  ],
};

export const AREAS_TEASER = { title: "Working across Laval, Montreal and the South Shore", cta: { label: "See areas we serve", href: "/areas" } };

export const CLOSING_CTA = {
  title: "Planning for your next peak?",
  body: "Book a 15-minute consultation and we’ll tell you how a DFS crew could cover it.",
  cta: { label: "Book a consultation", href: "/contact" },
};
