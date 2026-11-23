export type Service = { slug: string; title: string; summary: string; image: string; tasks: string[] };

export const SERVICES: Service[] = [
  { slug: "warehousing", title: "Warehousing & material handling", image: "/images/forklift.jpg", summary: "Receiving, put-away, picking, inventory counts and loading docks, staffed for normal days and peak weeks.", tasks: ["Receiving & put-away", "Picking", "Inventory counts", "Loading docks"] },
  { slug: "packaging", title: "Packaging & co-packing", image: "/images/food.jpg", summary: "Kitting, labelling, repacking and finishing lines, with quality checks built into the shift.", tasks: ["Kitting", "Labelling", "Repacking", "Finishing lines"] },
  { slug: "distribution", title: "Distribution & fulfillment", image: "/images/boxes.jpg", summary: "Order preparation, shipping and returns handling for retail, e-commerce and wholesale.", tasks: ["Order preparation", "Shipping", "Returns handling", "Retail, e-commerce & wholesale"] },
  { slug: "delivery", title: "Delivery", image: "/images/logistics.jpg", summary: "Local deliveries across Laval and Montreal, from your dock to your customer’s door.", tasks: ["Local routes", "Dock to door", "Laval & Montreal"] },
  { slug: "seasonal-peaks", title: "Seasonal peak coverage", image: "/images/team.jpg", summary: "Holiday rushes, launches and inventory season covered without a recruiting campaign on your side.", tasks: ["Holiday rushes", "Product launches", "Inventory season"] },
];
