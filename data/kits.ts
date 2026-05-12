export type KitStatus = "live" | "soon";

export type Kit = {
  slug: string;
  card: string;
  set: string;
  setSlug: string;
  number: string;
  status: KitStatus;
  badge: string;
  detail: string;
};

export type Expansion = {
  slug: string;
  name: string;
  logo?: string;
};

// Static expansion list. Also seeded into the `sets` table in the DB for FK references.
// Edit set names/order/logos here AND re-seed the DB if they change.
export const EXPANSIONS: Expansion[] = [
  {
    slug: "mega-evolutions",
    name: "Mega Evolutions",
    logo: "/brand/sets/mega-evolutions.png",
  },
  {
    slug: "scarlet-violet",
    name: "Scarlet & Violet",
    logo: "/brand/sets/scarlet-violet.png",
  },
  {
    slug: "sword-and-shield",
    name: "Sword and Shield",
    logo: "/brand/sets/sword-and-shield.png",
  },
  {
    slug: "black-star-promos",
    name: "Black Star Promos",
    logo: "/brand/sets/promo.webp",
  },
];
