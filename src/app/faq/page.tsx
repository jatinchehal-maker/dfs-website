import PageHero from "@/components/ui/PageHero";
import FaqList from "@/components/ui/FaqList";
import ClosingCta from "@/components/sections/ClosingCta";
import { FAQ_ITEMS } from "@/content/faq";

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8"><FaqList items={FAQ_ITEMS} /></section>
      <ClosingCta />
    </>
  );
}
