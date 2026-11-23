import PageHero from "@/components/ui/PageHero";
import JobBoard from "@/components/JobBoard";
import ButtonLink from "@/components/ui/ButtonLink";

export const metadata = { title: "Open jobs" };

export default function JobsPage() {
  return (
    <>
      <PageHero eyebrow="Open jobs" title="Find work in Laval and Montreal" subtitle="Warehouse, packaging, distribution and delivery jobs. No experience? We train you." image="/images/team.jpg">
        <ButtonLink href="/careers" variant="inverted">Apply in two minutes</ButtonLink>
      </PageHero>
      <JobBoard />
    </>
  );
}
