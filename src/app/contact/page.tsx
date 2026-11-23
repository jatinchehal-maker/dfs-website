import { LocationMap } from "@/components/ui/expand-map";
import ValidatedForm from "@/components/ui/ValidatedForm";
import { CONSULTATION_FORM } from "@/content/forms";
import { FOOTER, SITE } from "@/content/site";

export const metadata = { title: "Book a consultation", description: "Tell us about the work you need covered. We reply within one business day." };

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <h1 className="font-display text-6xl font-bold uppercase leading-none">Book a consultation</h1>
        <p className="mt-5 text-lg text-neutral-700">Tell us about the work you need covered. We reply within one business day.</p>
        <div className="mt-10 space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Prefer email?</p>
            <a href={`mailto:${SITE.email}`} className="mt-1 block font-semibold underline">{SITE.email}</a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Where we work</p>
            <p className="mt-1 font-semibold">{FOOTER.area}</p>
          </div>
          <LocationMap location="Laval & Montréal, QC" coordinates="45.5500° N, 73.6400° W" className="pb-6" />
        </div>
      </div>
      <ValidatedForm formId="consultation" fields={CONSULTATION_FORM} submitLabel="Send request" successTitle="Request received" successBody="Thanks! We reply within one business day." />
    </section>
  );
}
