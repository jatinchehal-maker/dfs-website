import Hero from "@/components/sections/Hero";
import Pillars from "@/components/sections/Pillars";
import ServiceMarquee from "@/components/sections/ServiceMarquee";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Comparison from "@/components/sections/Comparison";
import Facts from "@/components/sections/Facts";
import HowItWorks from "@/components/sections/HowItWorks";
import Advantage from "@/components/sections/Advantage";
import CareersTeaser from "@/components/sections/CareersTeaser";
import About from "@/components/sections/About";
import AreasTeaser from "@/components/sections/AreasTeaser";
import ClosingCta from "@/components/sections/ClosingCta";
import Section from "@/components/ui/Section";
import FaqList from "@/components/ui/FaqList";
import { FAQ_ITEMS } from "@/content/faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <ServiceMarquee />
      <ServicesGrid />
      <Comparison />
      <Facts />
      <HowItWorks />
      <Advantage />
      <CareersTeaser />
      <About />
      <AreasTeaser />
      <Section id="faq" eyebrow="FAQ" title="Frequently asked questions">
        <div className="max-w-3xl"><FaqList items={FAQ_ITEMS} /></div>
      </Section>
      <ClosingCta />
    </>
  );
}
