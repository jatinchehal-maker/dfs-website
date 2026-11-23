// SAMPLE case studies — NOT real clients. Replace with real stories (with permission) before launch.
export type CaseStudy = { slug: string; client: string; title: string; image: string; stats: { value: string; label: string }[]; problem: string; solution: string; results: string };

export const CASES: CaseStudy[] = [
  { slug: "sample-holiday-fulfillment", client: "Sample — e-commerce retailer", title: "Covering a holiday fulfillment peak", image: "/images/boxes.jpg", stats: [{ value: "[X]", label: "Extra crew members" }, { value: "[X]", label: "Weeks covered" }], problem: "Holiday order volume outgrew the permanent team.", solution: "DFS staffed, trained and supervised a picking and packing crew for the peak weeks.", results: "[PLACEHOLDER — add the real outcome]" },
  { slug: "sample-co-packing-line", client: "Sample — food producer", title: "Running a co-packing line for a launch", image: "/images/food.jpg", stats: [{ value: "[X]", label: "Shifts per week" }, { value: "1", label: "Invoice" }], problem: "A product launch needed a temporary repacking line.", solution: "DFS ran the line with its own lead and quality checks built into each shift.", results: "[PLACEHOLDER — add the real outcome]" },
];
