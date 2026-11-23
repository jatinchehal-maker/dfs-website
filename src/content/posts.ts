// SAMPLE articles — replace or edit before launch.
export type Post = { slug: string; title: string; excerpt: string; date: string; category: "Businesses" | "Workers"; image: string; sections: { heading: string; body: string }[]; faq?: { q: string; a: string }[] };

export const POSTS: Post[] = [
  {
    slug: "planning-for-peak-season", title: "Planning crews for peak season in Laval and Montreal", category: "Businesses", date: "2026-10-14", image: "/images/boxes.jpg",
    excerpt: "Map volume to labour hours early and avoid a last-minute recruiting campaign.",
    sections: [
      { heading: "Start from last year's volumes", body: "Pull weekly order or production volume and translate it into labour hours. The gap above your permanent team is the scope to hand off." },
      { heading: "Hand off a scope, not job postings", body: "Describe the work — tasks, shifts, quality rules — and let a partner staff, train and supervise it." },
      { heading: "Plan the ramp-down too", body: "Agree in advance how the crew scales down after the peak so you never pay for idle hours." },
    ],
  },
  {
    slug: "first-warehouse-job", title: "Your first warehouse job: what to expect", category: "Workers", date: "2026-09-30", image: "/images/team.jpg",
    excerpt: "No experience? Here's how DFS gets you ready for day one.",
    sections: [
      { heading: "Training comes first", body: "Before your first shift you learn the site, the process and the safety rules." },
      { heading: "Dress for the job", body: "Closed safety shoes and comfortable layers. Your supervisor tells you about any other gear." },
      { heading: "You're never alone", body: "A DFS supervisor is on site with you to answer questions." },
    ],
    faq: [
      { q: "Do I need experience?", a: "No. We train you." },
      { q: "Can I choose my shifts?", a: "Tell us when you can work — days, evenings, nights or weekends." },
    ],
  },
  {
    slug: "agency-vs-managed-crew", title: "Staffing agency or managed crew?", category: "Businesses", date: "2026-08-18", image: "/images/office.jpg",
    excerpt: "Who trains, who supervises, and who answers for the result.",
    sections: [
      { heading: "An agency sends people", body: "You still train, schedule and supervise each worker." },
      { heading: "A managed crew delivers work", body: "DFS takes on the scope: hiring, training, supervision and one invoice." },
    ],
  },
];
