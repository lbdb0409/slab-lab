export type SetContent = {
  slug: string;
  tagline: string;
  intro: string;
  about: string[];
  era: string;
  year: string;
  signature: string;
  bg: string;
  accent: string;
  accentText: string;
  accentBgClass: string;
  pageHeaderBg: "cream" | "pink" | "sky" | "mint" | "lavender" | "gold";
};

export const SET_CONTENT: Record<string, SetContent> = {
  "mega-evolutions": {
    slug: "mega-evolutions",
    tagline: "When a Pokémon takes on a second form.",
    intro:
      "The slabbing line built around Mega-era artwork — cards where the printed scene already feels too big for the border. We extend the spotlight past the edge so the Mega gets the room it always wanted.",
    about: [
      "Mega Evolution introduced cards with some of the most dynamic art in the entire game — full-art Megas, alternate-art Megas, EX prints where the Pokémon explodes off the border.",
      "These are the cards that started the slabbing conversation. They photograph beautifully and they collect a passionate audience that often doesn't care about a 10 — they care about presentation.",
      "Each Slablabs surround for this line is keyed to a specific Mega card. The printed artwork extends the existing scene outward into the slab, so the card and the slab read as one continuous piece.",
    ],
    era: "Mega-era",
    year: "2026",
    signature: "Mega Gengar EX",
    bg: "#26104a",
    accent: "#c277ff",
    accentText: "text-purple",
    accentBgClass: "bg-lavender",
    pageHeaderBg: "lavender",
  },
  "scarlet-violet": {
    slug: "scarlet-violet",
    tagline: "The current era. Paldea, Terastal, today's hottest pulls.",
    intro:
      "The active generation. Scarlet & Violet sets are what's actually opening in card shops right now — chase cards from this era cost what they cost because they're being pulled today.",
    about: [
      "Scarlet & Violet shifted the design language: cleaner full-arts, more illustration rares, and Terastal cards with that iridescent gem treatment that screams to be displayed.",
      "Played condition is normal in this era — these cards are getting handled and traded. Which means a lot of S&V cards never crack a high grade, but they're still the cards everyone wants on display.",
      "Slablabs surrounds for S&V kits lean into the Terastal gem aesthetic where applicable — gradient washes and angular bleeds that complement the modern card frame.",
    ],
    era: "S&V era",
    year: "2023 – now",
    signature: "Charizard ex",
    bg: "#a01030",
    accent: "#ffd0d8",
    accentText: "text-red",
    accentBgClass: "bg-pink-tint",
    pageHeaderBg: "pink",
  },
  "sword-and-shield": {
    slug: "sword-and-shield",
    tagline: "Six years of releases that built the modern collector market.",
    intro:
      "Evolving Skies, Silver Tempest, Brilliant Stars, Lost Origin — the Sword & Shield generation is a goldmine for slabbing because so much of its alt-art belongs on a wall.",
    about: [
      "Sword & Shield is the era that minted modern Pokémon as a serious collectible — Umbreon VMAX, Lugia VSTAR, Rayquaza VMAX, the cards that hit secondary-market prices nobody expected.",
      "It's also the era where most of the cards have already been played. A 7-grade Umbreon VMAX is still a $200+ card, and we think it still deserves to be displayed like one.",
      "Surrounds for this line lean into the storybook-style alt-art moments S&S did so well — landscape extensions, character close-ups, scene completions.",
    ],
    era: "Sword & Shield",
    year: "2020 – 2023",
    signature: "Umbreon VMAX",
    bg: "#0e466e",
    accent: "#7adcff",
    accentText: "text-cyan-deep",
    accentBgClass: "bg-sky-tint",
    pageHeaderBg: "sky",
  },
};
