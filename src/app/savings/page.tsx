import PageHero from "@/components/ui/PageHero";
import SavingsCalculator from "@/components/SavingsCalculator";

export const metadata = { title: "Estimate savings" };

export default function SavingsPage() {
  return (
    <>
      <PageHero eyebrow="Estimate savings" title="What could handing off a peak save you?" subtitle="A rough estimate of the recruiting and supervision time DFS takes off your team." />
      <SavingsCalculator />
    </>
  );
}
