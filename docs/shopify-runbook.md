# Shopify migration runbook

Status: planning. Nothing here has been executed yet.

Written 19 July 2026, alongside the `slablabs_shopify_products.csv` import file.

---

## 0. The decision this assumes

Headless Shopify: this Next.js storefront stays, Shopify owns cart → checkout →
orders → customers → inventory. Shopify Basic (A$56/mo monthly, A$42/mo annual)
includes **1 headless storefront**, which is what this needs. Checkout
customisation is Plus-only, so checkout will look like Shopify's, not ours.

Payment economics are a wash versus Stripe direct (both ≈1.75% + 30¢ AUD in
Australia). **Do not run Stripe inside Shopify on Basic** — that adds a 2%
third-party gateway surcharge on top.

At $20/kit the fixed 30¢ dominates small orders: a single kit costs 3.25%
effective, five kits 2.05%. The $99 free-shipping threshold now lands at
exactly 5 kits.

---

## 1. Create the development store (owner task — needs the Shopify login)

Use a **Partner development store**, not the 3-day trial:

- Free, with an unlimited trial period, full feature set.
- No clock running while the integration is built.
- Trade-off: a transferred dev store is **not eligible for promotions**, so the
  "$1/month for 3 months" intro offer is forfeited. Worth it unless launch is
  imminent.
- Dev stores **cannot take real payments** until a plan is selected, so the
  first true end-to-end payment test happens at launch. Plan for that.

Then: Settings → Users → invite whoever needs access. Basic includes 0
additional staff accounts, so this matters on the paid plan, not the dev store.

---

## 2. Import products

File: `slablabs_shopify_products.csv` (generated from
`SlabLabs_PO_SL-2026-001.xlsx`, which is the source of truth for which
designs exist in which language).

- **126 products, 244 variant rows, 3,000 units** — reconciles to the PO totals.
- One product per card design, with a **`Language`** option: English, Japanese,
  or both. 118 designs (94%) have both; 7 are English-only, 1 Japanese-only.
- Inventory per variant is the PO production quantity.
- All priced at $20. Imported as **draft / unpublished**.
- Every product body carries the "card not included" and "not affiliated with
  rights holders" disclaimers.

Import via Products → Import → upload CSV. Do **not** tick "overwrite existing
products" on a re-run unless you mean it.

### Before importing, fix these

1. **No images.** `Image Src` is empty on all 244 rows — every product in the
   old DB pointed at the same `/brand/slab-mockup.png` placeholder. Photography
   is the real critical path. Images can be added after import by re-uploading
   a CSV keyed on `Handle`.
2. **No shipping weight.** `Variant Grams` is deliberately blank rather than
   guessed. Shopify needs it for live carrier rates. Weigh a packed kit and
   fill all 244 rows before enabling calculated shipping.

### After importing, check

- Product count is 126, not 244 (if it's 244, the `Handle` grouping failed).
- Spot-check a two-language product (e.g. `alakazam-ex-sir-151`) shows one
  product with two variants, English 10 / Japanese 7.
- Total inventory across all variants is 3,000.

---

## 3. Do NOT migrate the existing Postgres catalogue

The `products` table holds 132 rows authored independently of the PO. An
automated match was attempted and **failed**: 18 PO designs were claimed by
2–3 different DB rows, several matches were plainly wrong (e.g.
`ascended-heroes-charizard-mar` → "Diancie"), and real matches like
`promos-kingdra` scored as no-match. The proposal lives in
`slablabs_po_to_db_mapping.csv` for reference only.

**Rebuild the catalogue from the PO instead of reconciling.** The PO reflects
what is actually being manufactured; the DB reflects an earlier draft. Once
Shopify is the source of truth this is moot.

Open question for the owner: are there cards in the DB's 132 that are *not*
in the PO's 126 and still need producing?

---

## 4. Storefront API integration

1. Shopify admin → Settings → Apps → Develop apps → create a custom app.
   Grant Storefront API scopes: `unauthenticated_read_product_listings`,
   `unauthenticated_read_product_inventory`, `unauthenticated_write_checkouts`,
   `unauthenticated_read_checkouts`.
2. Put `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_TOKEN` in `.env.local`.
   Note this project already has a `COMING_SOON` gate — see
   `docs/` and `.env.local`.
3. **Watch for this:** a password-protected Shopify store can reject Storefront
   API requests unless the request carries the storefront password. Verify this
   early — it is the most likely thing to eat an afternoon.

### Code that changes

| Area | Today | After |
|---|---|---|
| `lib/cart-store.ts` | zustand + localStorage, keyed slug+language | Shopify Cart API (server-held cart id) |
| `app/(public)/checkout/` | custom form, no payments | redirect to Shopify checkout URL |
| `lib/products.ts` | Drizzle queries | Storefront API product queries |
| `components/pdp/kit-actions.tsx` | local `stockEn`/`stockJp` | Shopify variant + `availableForSale` |
| `app/admin/products/` | custom CRUD | retire; Shopify admin replaces it |

The `Language` option maps directly onto what was just built locally: the PDP
already models "this design exists in EN and/or JP" and the cart already keys
line items on slug + language, so the shapes line up.

### Order status back into the site

Add a webhook (`orders/create`, `orders/updated`) if the existing Resend
templates in `lib/email-templates.ts` should keep sending. Otherwise let
Shopify own transactional email and retire that code.

---

## 5. Launch sequence

1. Fill weights, upload images, publish products (draft → active).
2. Select a paid plan (dev store cannot take real money).
3. Configure Shopify Payments; enable Afterpay / Shop Pay.
4. Set AU GST and shipping zones; $99 free-shipping threshold = 5 kits at $20.
5. Place one real end-to-end test order and refund it.
6. Only then drop `COMING_SOON` in `.env.local`.

**The gate is currently blocking word-of-mouth traffic.** Anyone told about
Slablabs today hits a password wall. The coming-soon subscribe form works
correctly (verified) and has captured 0 emails — so either nobody has been
pointed at it, or they are arriving and leaving. Consider opening the gate to
a capture page well before full launch.

---

## 6. Known data issues in the PO (raise with the manufacturer)

- **Espeon / Sylveon share design id `mrhqtiqn`.** The PO itself flags
  "VERIFY: shares design id with EN Espeon V". Espeon and Sylveon are different
  cards — either the JP file is mislabelled or it was cloned from Espeon's and
  may carry the wrong art. **Unresolved. Confirm before printing.**
- Five EN/JP pairs have inconsistent filenames (`Mega Darkrai-mriuvx82_EN.ai`
  vs `mega darkrai_JP.ai`, and the Arceus / Mew / Pikachu Crown Zenith files).
  Six files lack the `_EN`/`_JP` suffix the other 238 use.
- Japanese section headers read **"Mega Evolusions"** (typo) in three places.
