import { test, expect } from "@playwright/test";
import { PAGES } from "./pages";
import { settle, findOverflowingElements, findSmallTouchTargets, findZoomTriggeringInputs } from "./helpers";

/**
 * Objective mobile checks. Unlike the screenshots these assert a standard
 * rather than a baseline, so they measure whether mobile is actually good —
 * not merely whether it changed.
 */
test.describe("mobile health", () => {
  test.skip(({ viewport }) => !viewport || viewport.width > 500, "mobile projects only");

  for (const { name, path } of PAGES) {
    test(`${name}: no horizontal overflow`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await settle(page);

      const scrolls = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      const offenders = await findOverflowingElements(page);
      expect(offenders, `page scrolls sideways: ${scrolls}`).toEqual([]);
      expect(scrolls).toBe(false);
    });

    test(`${name}: form controls are 16px+`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await settle(page);
      expect(await findZoomTriggeringInputs(page)).toEqual([]);
    });

    test(`${name}: touch targets are 44px+`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await settle(page);
      expect(await findSmallTouchTargets(page)).toEqual([]);
    });
  }
});
