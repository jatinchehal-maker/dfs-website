export type Area = { slug: string; name: string; region: string; neighbourhoods: string[]; coordinates: string };

const raw: [string, string, string[], string][] = [
  ["Laval", "Laval", ["Chomedey", "Saint-François", "Vimont", "Sainte-Rose"], "45.6066° N, 73.7124° W"],
  ["Montreal", "Montreal", ["Saint-Laurent", "Anjou", "Lachine", "Montréal-Est"], "45.5019° N, 73.5674° W"],
  ["Longueuil", "South Shore", ["Vieux-Longueuil", "Saint-Hubert", "Greenfield Park"], "45.5312° N, 73.5181° W"],
  ["Brossard", "South Shore", ["Quartier DIX30", "Industrial park"], "45.4584° N, 73.4569° W"],
  ["Boucherville", "South Shore", ["Industrial park", "Port area"], "45.5911° N, 73.4363° W"],
  ["Terrebonne", "North Shore of Laval", ["Lachenaie", "La Plaine"], "45.7000° N, 73.6470° W"],
];

export const AREAS: Area[] = raw.map(([name, region, neighbourhoods, coordinates]) => ({
  slug: name.toLowerCase(),
  name, region, neighbourhoods, coordinates,
}));
