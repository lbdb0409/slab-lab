import type { Page } from "@playwright/test";

/**
 * Get a page into a stable, fully-settled state before measuring or
 * screenshotting it. Scroll-triggered reveals (framer-motion `whileInView`,
 * `animation-timeline: view()`) only fire once their element has been in the
 * viewport, so an unscrolled full-page screenshot catches them mid-flight.
 */
export async function settle(page: Page) {
  await page.waitForLoadState("networkidle").catch(() => {});

  // Walk the page so every in-view reveal fires, then return to the top.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 120));
  });

  await page.evaluate(() => document.fonts.ready);

  // Decode every image so nothing pops in mid-capture. A lazy image that never
  // enters the viewport stays `complete === false` and fires no event, so each
  // wait needs its own timeout or this hangs forever.
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map((img) =>
          Promise.race([
            new Promise((r) => { img.onload = r; img.onerror = r; }),
            new Promise((r) => setTimeout(r, 2000)),
          ]),
        ),
    );
  });

  await page.waitForTimeout(300);
}

/** Elements whose box escapes the viewport horizontally. */
export async function findOverflowingElements(page: Page) {
  return page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const bad: { selector: string; right: number; width: number }[] = [];

    const describe = (el: Element) => {
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : "";
      const cls = typeof el.className === "string" && el.className
        ? "." + el.className.trim().split(/\s+/).slice(0, 4).join(".")
        : "";
      return `${tag}${id}${cls}`;
    };

    for (const el of Array.from(document.body.querySelectorAll("*"))) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      // Fixed/sticky elements are positioned against the viewport and are
      // allowed to sit off-screen (drawers, slide-in panels).
      if (style.position === "fixed") continue;

      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right > docWidth + 1 || rect.left < -1) {
        // Only report if no ancestor already clips it.
        let clipped = false;
        let parent = el.parentElement;
        while (parent) {
          const ps = getComputedStyle(parent);
          if (ps.overflowX !== "visible") { clipped = true; break; }
          parent = parent.parentElement;
        }
        if (!clipped) {
          bad.push({ selector: describe(el), right: Math.round(rect.right), width: Math.round(rect.width) });
        }
      }
    }
    return bad;
  });
}

/** Interactive controls smaller than the 44px touch-target minimum. */
export async function findSmallTouchTargets(page: Page) {
  return page.evaluate(() => {
    const MIN = 44;
    const out: { selector: string; w: number; h: number; text: string }[] = [];
    const sel = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"]';

    for (const el of Array.from(document.querySelectorAll(sel))) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      // An element inside a large tappable label is fine — the label is the target.
      const label = el.closest("label");
      if (label && label !== el) {
        const lr = label.getBoundingClientRect();
        if (lr.height >= MIN) continue;
      }
      // Inline links inside running prose are exempt from the target rule.
      if (el.tagName === "A" && el.closest("p, li")) continue;

      // Height is what governs tappability for a text link in a row — its
      // width legitimately tracks the label ("Home" is 39px wide and fine).
      // Width only matters when it drops to icon-hitbox territory.
      if (rect.height < MIN || rect.width < 24) {
        out.push({
          selector: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className
            ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
          text: (el.textContent || (el as HTMLInputElement).value || "").trim().slice(0, 30),
        });
      }
    }
    return out;
  });
}

/** Form controls under 16px, which make iOS Safari zoom the viewport on focus. */
export async function findZoomTriggeringInputs(page: Page) {
  return page.evaluate(() => {
    const out: { selector: string; fontSize: string; type: string }[] = [];
    for (const el of Array.from(document.querySelectorAll("input, select, textarea"))) {
      const type = (el as HTMLInputElement).type;
      if (type === "hidden" || type === "checkbox" || type === "radio" || type === "submit") continue;
      const style = getComputedStyle(el);
      if (style.display === "none") continue;
      // A control's own display can be visible while an ancestor is `hidden`
      // (e.g. the header's desktop-only search form). Zero box = not rendered.
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (parseFloat(style.fontSize) < 16) {
        out.push({
          selector: el.tagName.toLowerCase() + (typeof el.className === "string" && el.className
            ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""),
          fontSize: style.fontSize,
          type,
        });
      }
    }
    return out;
  });
}
