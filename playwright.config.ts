import { defineConfig, devices } from "@playwright/test";

/**
 * Visual-regression harness. Its only job is to prove that the mobile
 * formatting pass left desktop rendering untouched: baselines are captured
 * from the pre-change tree, then re-run after the edits.
 *
 * Not part of CI. Run against a dev server on :4000 with COMING_SOON=0.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  snapshotPathTemplate: "{testDir}/__screenshots__/{projectName}/{arg}{ext}",
  use: {
    baseURL: "http://localhost:4000",
  },
  expect: {
    toHaveScreenshot: {
      // Anti-aliasing and subpixel text jitter between runs is expected;
      // a real layout regression moves far more than this.
      maxDiffPixelRatio: 0.002,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "laptop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1024, height: 800 } },
    },
    {
      // The md breakpoint exactly — the floor of the "don't change desktop"
      // guarantee, and the width most likely to catch an lg:-vs-md: slip.
      name: "tablet",
      use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 12"], viewport: { width: 390, height: 844 } },
    },
    {
      name: "mobile-small",
      use: { ...devices["iPhone SE"], viewport: { width: 375, height: 667 } },
    },
  ],
});
