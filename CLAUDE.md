# DFS Website — build instructions for Claude Code

Owner: Jatin Chehal (call him "Devil"), Founder & CEO of Delta Facilities Solutions (DFS).
Project folder: `~/dfs-website` (empty at the start). Steps 0 and 1 are done (Node v26 / npm 11 installed, folder created).

Work through the steps below in order. After each step, tell Jatin what you did and what he needs to do next.
Do the work in `~/dfs-website` only.

## Rules
- Stack: **Next.js (latest, App Router, TypeScript, Tailwind, ESLint, `src/` folder, npm)** + **Supabase Auth** (`@supabase/ssr` + `@supabase/supabase-js`). Hosting later on Vercel.
- Use the conventions of the Next.js version you install (Next 16 renamed `middleware.ts` to `proxy.ts`; check the installed version's docs in `node_modules/next/dist/docs` or AGENTS.md if present).
- **Never read, print or ask for the contents of `.env.local`, and never ask Jatin to paste keys into chat.** He adds the Supabase keys himself.
- The site must still load (homepage works, login pages show a friendly "Login isn't set up yet" note) when the Supabase keys are missing.
- Passwords are handled only by Supabase (hashed). Never store passwords yourself.
- Ask Jatin before anything that deletes files, pushes to GitHub, deploys, or changes settings outside this folder.

---

## Step 2 — Main page (the DFS template)

If the folder is empty, scaffold the Next.js app here. Build the homepage as a single page with anchored sections. Clean, professional, mobile-first. Brand color black (#000000), white background, dark footer. Put **all text in one content file** (e.g. `src/content/site.ts`) so it's easy to edit and translate. Make every section a reusable component so this layout is the template for future pages.

**HEADER:** Logo + "Delta Facilities Solutions". Menu: Services, How it works, Careers, About, Contact. "FR" language toggle. Primary button "Book a consultation". A "Log in" link on the right. Mobile menu.

**HERO:** "DFS runs warehousing, packaging, and distribution work in Laval and Montreal, with its own hired, trained, and supervised crews."
Three pillars: We hire / We train / We supervise.
Buttons: "Book a consultation" and "Find work with DFS".
DFS logo/monogram with a subtle effect that follows the mouse cursor. Build our own effect (do NOT copy the current site's third-party "guglielmogiannattasio.it" effect). Respect prefers-reduced-motion.

**SERVICES:** Heading "Operational crews for the work that peaks". Intro: DFS takes on a full scope of work, not individual job postings.
5 cards: Warehousing & material handling · Packaging & co-packing · Distribution & fulfillment (retail, e-commerce, wholesale) · Delivery (local, Laval and Montreal) · Seasonal peak coverage.

**HOW IT WORKS** (numbered):
1. Tell us the work — a 15-minute call about volumes, shifts, location and tasks.
2. We build the crew — DFS hires, screens, trains and assigns a lead.
3. We run it with you — one contact, one invoice, flexible scaling.

**CAREERS:** "Looking for work in Laval or Montreal?" Roles: warehouse, packaging, distribution, delivery. Bullets: training before you start; day, evening and weekend shifts; a DFS supervisor on site. Button "Apply now".

**ABOUT:** "A local partner, not a job board." Founded by Jatin Chehal to make busy seasons simpler for Montreal-area businesses. Based in the Montreal area, serving Laval, Montreal and the South Shore. Established 2022.

**FAQ** (accordion):
- How is DFS different from a staffing agency? — DFS hires, trains and supervises the crew itself, so you deal with one contact.
- Which areas do you cover? — Laval, Montreal and the South Shore.
- How quickly can a crew start? — `[PLACEHOLDER — ask Jatin]`
- Do you work in French and English? — Yes, both.

**CLOSING CTA:** "Planning for your next peak?" A 15-minute consultation to see how a DFS crew could cover it. Button "Book a consultation".

**FOOTER:** White logo, "Warehousing, packaging, distribution and delivery. Est. 2022", nav links, email `[PLACEHOLDER — ask Jatin, ideally info@deltafacilitiessolutions.com]`, "Laval and Montréal", "© 2026 Delta Facilities Solutions".

Accessibility: semantic HTML, visible keyboard focus, good contrast, alt text. Add favicon, meta description and Open Graph tags.

Then run `npm run dev` and give Jatin the localhost URL.

---

## Step 3 — Supabase keys (Jatin does this himself)

Tell Jatin to:
1. Create a free project at supabase.com called `dfs-website` (region: Canada Central).
2. Copy **Project URL** and **anon public key** from Project Settings → API.
3. Create `~/dfs-website/.env.local` himself with:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
Create `.env.example` with empty values, and make sure `.env*.local` is in `.gitignore`.

---

## Step 4 — Login and password

Add Supabase Auth with `@supabase/ssr` (server + browser clients):
- `/login` — email + password, "Forgot password?" link, link to sign up. DFS styling.
- `/signup` — full name, email, password, confirm password (min 8 chars).
- `/forgot-password` and `/reset-password` — send reset email, set new password (with an auth callback route).
- `/dashboard` — protected. "Welcome, <name>" and a Log out button.
- Route protection (proxy/middleware per the installed Next version): not logged in + `/dashboard` → redirect to `/login`.
- Header: "Log in" when logged out; "Dashboard" + "Log out" when logged in.
- Clear errors: "Wrong email or password", "Email already used", etc.
- `profiles` table: `id` (uuid → auth.users), `full_name`, `role` (default 'worker'), `created_at`. Row Level Security: each user can only read/update their own row. Trigger to create the profile automatically on sign-up.
- Save the SQL in `supabase/schema.sql` and tell Jatin to paste it into Supabase → SQL Editor → Run.
- Tell Jatin to set Supabase → Authentication → URL Configuration → Site URL to `http://localhost:3000` (and add `http://localhost:3000/**` to redirect URLs).

Run `npm run build` and `npm run lint`; fix errors. Test sign-up, login, logout and the protected redirect once keys are in, and report what you tested.

---

## Step 5 (optional, ask Jatin first) — Roles and French
1. Roles: worker, client, admin. Workers → shifts page; clients → "request a crew" form; admins → list of users and can change roles. Enforce with RLS, not just the UI.
2. Make the FR toggle real: French versions of all text in the content file, `/fr` routes.
Jatin makes himself admin in Supabase → Table Editor → profiles → role = admin.

---

## Step 6 (ask Jatin first) — Put it online
1. `git init`, commit, push to a **private** GitHub repo.
2. Import the repo on vercel.com, add the two env vars in Vercel.
3. Add domain deltafacilitiessolutions.com in Vercel; Jatin updates DNS at his registrar.
4. Change Supabase Site URL to `https://deltafacilitiessolutions.com`.
