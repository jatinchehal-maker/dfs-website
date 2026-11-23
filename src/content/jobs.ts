// SAMPLE job listings — replace with real openings.
export type Job = { slug: string; title: string; area: string; type: string; shift: string; image: string };

export const JOB_TYPES = ["Warehouse / material handling", "Packaging", "Distribution / shipping", "Delivery"];

const raw: [string, string, string, string, string][] = [
  ["Warehouse associate", "Laval", "Warehouse / material handling", "Day shift", "/images/forklift.jpg"],
  ["Order picker", "Montreal", "Warehouse / material handling", "Evening shift", "/images/boxes.jpg"],
  ["Packaging line worker", "Laval", "Packaging", "Day shift", "/images/food.jpg"],
  ["Co-packing associate", "Longueuil", "Packaging", "Weekends", "/images/manufacturing.jpg"],
  ["Shipping & returns clerk", "Montreal", "Distribution / shipping", "Day shift", "/images/boxes.jpg"],
  ["Delivery helper", "Laval", "Delivery", "Day shift", "/images/logistics.jpg"],
  ["Cold storage handler", "Montreal", "Warehouse / material handling", "Night shift", "/images/cold.jpg"],
];

export const JOBS: Job[] = raw.map(([title, area, type, shift, image]) => ({
  slug: `${title}-${area}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""),
  title, area, type, shift, image,
}));

export const JOB_DETAILS = {
  responsibilities: ["Follow site safety rules and wear the required PPE", "Complete assigned tasks accurately and on time", "Work with your DFS supervisor on site", "Keep the work area clean and organized"],
  benefits: ["Training before you start", "Day, evening and weekend shifts", "A DFS supervisor on site with you"],
  requirements: ["Legally allowed to work in Canada", "Able to stand and lift for a full shift", "Reliable way to get to the site", "French or English"],
};
