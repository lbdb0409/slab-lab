import { test, expect } from "@playwright/test";
import { PAGES } from "./pages";
import { settle } from "./helpers";

/**
 * Full-page screenshot of every public route. The desktop/laptop projects are
 * the regression guard for the mobile formatting pass — they must not move.
 * The mobile projects are documentation of what changed.
 */
for (const { name, path } of PAGES) {
  test(`visual: ${name}`, async ({ page }) => {
    // The success page scatters confetti with Math.random(), which would make
    // its screenshot differ on every run. Swap in a seeded PRNG so the page is
    // reproducible rather than masked out.
    await page.addInitScript(() => {
      let seed = 42;
      Math.random = () => {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };
    });

    await page.goto(path, { waitUntil: "domcontentloaded" });
    await settle(page);
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}
