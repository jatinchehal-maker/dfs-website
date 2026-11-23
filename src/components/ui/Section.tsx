type Tone = "light" | "muted" | "dark";

type Props = { id?: string; eyebrow?: string; title: string; intro?: string; tone?: Tone; center?: boolean; children?: React.ReactNode };

const TONES: Record<Tone, string> = {
  light: "bg-white text-black",
  muted: "bg-neutral-100 text-black",
  dark: "bg-black text-white",
};

// Reusable section shell used by every page.
export default function Section({ id, eyebrow, title, intro, tone = "light", center = false, children }: Props) {
  const headingId = id ? `${id}-heading` : undefined;
  const sub = tone === "dark" ? "text-neutral-400" : "text-neutral-600";
  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-20 px-5 py-20 sm:px-8 md:py-28 ${TONES[tone]}`}>
      <div className={`mx-auto max-w-6xl ${center ? "text-center" : ""}`}>
        {eyebrow && <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${sub}`}>{eyebrow}</p>}
        <h2 id={headingId} className={`font-display mt-3 text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl ${center ? "mx-auto" : ""} max-w-3xl`}>{title}</h2>
        {intro && <p className={`mt-6 max-w-2xl text-lg ${sub} ${center ? "mx-auto" : ""}`}>{intro}</p>}
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
