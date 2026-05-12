import { db, schema } from "./db";

const SETS_SEED = [
  {
    slug: "mega-evolutions",
    name: "Mega Evolutions",
    logo: "/brand/sets/mega-evolutions.png",
    position: 1,
  },
  {
    slug: "scarlet-violet",
    name: "Scarlet & Violet",
    logo: "/brand/sets/scarlet-violet.png",
    position: 2,
  },
  {
    slug: "sword-and-shield",
    name: "Sword and Shield",
    logo: "/brand/sets/sword-and-shield.png",
    position: 3,
  },
];

let ensured = false;

export async function ensureSeeded() {
  if (ensured) return;
  ensured = true;

  const existingSets = await db.select().from(schema.sets).limit(1);
  if (existingSets.length === 0) {
    await db.insert(schema.sets).values(SETS_SEED);
  }
}
