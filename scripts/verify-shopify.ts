/**
 * Connectivity + import sanity check for the Shopify development store.
 *
 *   npm run shopify:verify
 *
 * Run it right after creating the store (expect 0 products), and again after
 * importing slablabs_shopify_products.csv (expect 126 products / 244 variants
 * / 3000 units). It checks the things that actually go wrong: credentials, the
 * password page blocking the Storefront API, and a botched CSV grouping.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Load .env.local without pulling in a dependency.
try {
  const env = readFileSync(join(process.cwd(), ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  // No .env.local — rely on the ambient environment.
}

const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const publicToken = process.env.SHOPIFY_STOREFRONT_TOKEN;
const version = process.env.SHOPIFY_API_VERSION || "2026-07";


function fail(msg: string): never {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

if (!domain || (!privateToken && !publicToken)) {
  fail(
    "Missing credentials. Add to .env.local:\n" +
      "  SHOPIFY_STORE_DOMAIN=your-store.myshopify.com\n" +
      "  SHOPIFY_STOREFRONT_PRIVATE_TOKEN=<private token from the Headless channel>\n" +
      "  # or SHOPIFY_STOREFRONT_TOKEN=<public token, blocked while the password page is on>",
  );
}

async function gql<T>(query: string): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (privateToken) headers["Shopify-Storefront-Private-Token"] = privateToken;
  else headers["X-Shopify-Storefront-Access-Token"] = publicToken!;

  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  if (res.status === 401 || res.status === 403) {
    fail(
      `Storefront API returned ${res.status}.\n` +
        "  Most likely one of:\n" +
        "   - the token is wrong, or the storefront lacks Storefront API permissions\n" +
        "   - you are using the public token while the store password page is on;\n" +
        "     use SHOPIFY_STOREFRONT_PRIVATE_TOKEN instead",
    );
  }
  if (!res.ok) fail(`Storefront API ${res.status}: ${(await res.text()).slice(0, 300)}`);

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) fail(`GraphQL errors: ${json.errors.map((e) => e.message).join("; ")}`);
  if (!json.data) fail("No data returned.");
  return json.data;
}

(async () => {
  console.log(`\nStore   : ${domain}`);
  console.log(`Version : ${version}`);
  console.log(`Token   : ${privateToken ? "private (server-side)" : "public"}\n`);

  const shop = await gql<{ shop: { name: string; primaryDomain: { url: string } } }>(
    `query { shop { name primaryDomain { url } } }`,
  );
  console.log(`✓ Connected to "${shop.shop.name}" (${shop.shop.primaryDomain.url})`);

  const data = await gql<{
    products: {
      nodes: {
        handle: string;
        title: string;
        variants: {
          nodes: { title: string; quantityAvailable: number | null; selectedOptions: { name: string; value: string }[] }[];
        };
      }[];
    };
  }>(`query {
    products(first: 250) {
      nodes {
        handle
        title
        variants(first: 10) {
          nodes { title quantityAvailable selectedOptions { name value } }
        }
      }
    }
  }`);

  const products = data.products.nodes;
  const variants = products.flatMap((p) => p.variants.nodes);
  const units = variants.reduce((s, v) => s + (v.quantityAvailable ?? 0), 0);
  const withLanguage = products.filter((p) =>
    p.variants.nodes.some((v) => v.selectedOptions.some((o) => o.name.toLowerCase() === "language")),
  );
  const both = products.filter((p) => p.variants.nodes.length === 2);

  console.log(`\nproducts : ${products.length}`);
  console.log(`variants : ${variants.length}`);
  console.log(`units    : ${units}`);
  console.log(`with a Language option : ${withLanguage.length}`);
  console.log(`with both printings    : ${both.length}`);

  if (products.length === 0) {
    console.log(
      "\n→ The Storefront API returned no products.\n" +
        "  This does NOT mean the import failed. The Storefront API only sees\n" +
        "  products that are BOTH Active and published to the Headless sales\n" +
        "  channel. The import creates them as Draft, so zero is expected until\n" +
        "  you publish them.\n\n" +
        "  To check the import itself, look at Products in the admin (expect 126),\n" +
        "  or grant this token read_products and re-run.",
    );
    return;
  }

  const problems: string[] = [];
  if (products.length !== 126) problems.push(`expected 126 products, found ${products.length}`);
  if (variants.length !== 244) problems.push(`expected 244 variants, found ${variants.length}`);
  if (units !== 3000) problems.push(`expected 3000 units, found ${units}`);
  if (both.length !== 118) problems.push(`expected 118 dual-language products, found ${both.length}`);
  if (products.length === 244)
    problems.push("244 products means the CSV Handle grouping failed — variants imported as separate products");

  if (problems.length) {
    console.log("\n⚠ Import does not match the PO:");
    for (const p of problems) console.log(`   - ${p}`);
    process.exitCode = 1;
  } else {
    console.log("\n✓ Import matches the manufacturing PO exactly.");
  }
})().catch((e) => fail(e instanceof Error ? e.message : String(e)));
