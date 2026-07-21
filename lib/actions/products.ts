"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { isAuthenticated } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { getSetBySlug } from "@/lib/sets";

const slugRegex = /^[a-z0-9-]+$/;

function optionalInt(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? "").trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : null;
}

const productSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(slugRegex, "Slug can only contain lowercase letters, numbers, and dashes."),
  card: z.string().min(1).max(120),
  setSlug: z.string().min(1),
  expansion: z.string().max(120).optional(),
  number: z.string().min(1).max(20),
  status: z.enum(["live", "soon"]),
  priceCents: z.number().int().min(0),
  // Blank means "this printing is not produced", which is distinct from 0
  // ("produced but sold out") — the PDP uses that difference to decide
  // whether to offer the language at all.
  stockEn: z.number().int().min(0).nullable().default(null),
  stockJp: z.number().int().min(0).nullable().default(null),
  stock: z.number().int().min(0).default(0),
  editionTotal: z.number().int().min(1).default(100),
  description: z.string().max(2000).default(""),
});

type ProductInput = z.infer<typeof productSchema>;

function parseForm(formData: FormData): ProductInput {
  const expansionRaw = String(formData.get("expansion") ?? "").trim();
  const raw = {
    slug: String(formData.get("slug") ?? "")
      .trim()
      .toLowerCase(),
    card: String(formData.get("card") ?? "").trim(),
    setSlug: String(formData.get("setSlug") ?? "").trim(),
    expansion: expansionRaw || undefined,
    number: String(formData.get("number") ?? "").trim(),
    status: String(formData.get("status") ?? "soon") as "live" | "soon",
    priceCents:
      Math.round(Number(formData.get("price") ?? 0) * 100) || 2000,
    stockEn: optionalInt(formData.get("stockEn")),
    stockJp: optionalInt(formData.get("stockJp")),
    stock: 0, // replaced below; always derived from the two languages
    editionTotal: Number(formData.get("editionTotal") ?? 100) || 100,
    description: String(formData.get("description") ?? "").trim(),
  };
  const parsed = productSchema.parse(raw);
  // Single write path for the aggregate, so `stock` can never drift from
  // the per-language numbers the PDP actually sells against.
  parsed.stock = (parsed.stockEn ?? 0) + (parsed.stockJp ?? 0);
  return parsed;
}

function buildDetailAndBadge(input: ProductInput) {
  if (input.status === "soon") {
    return { detail: "Coming soon", badge: "Coming soon" };
  }
  const sold = (input.editionTotal ?? 100) - (input.stock ?? 0);
  return {
    detail: `Ed. ${Math.max(sold, 0)} / ${input.editionTotal}`,
    badge:
      (input.stock ?? 0) > 0 && (input.stock ?? 0) <= 10
        ? "Almost gone"
        : "Available now",
  };
}

async function guard() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function createProduct(formData: FormData) {
  await guard();
  const input = parseForm(formData);

  const set = await getSetBySlug(input.setSlug);
  if (!set) throw new Error("Unknown set");

  const existing = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.slug, input.slug))
    .limit(1);
  if (existing.length > 0) {
    redirect(`/admin/products/new?error=duplicate-slug`);
  }

  const { detail, badge } = buildDetailAndBadge(input);
  const now = new Date();

  await db.insert(schema.products).values({
    slug: input.slug,
    card: input.card,
    setName: set.name,
    setSlug: set.slug,
    expansion: input.expansion ?? null,
    number: input.number,
    status: input.status,
    priceCents: input.priceCents,
    stock: input.stock,
    editionTotal: input.editionTotal,
    description: input.description,
    badge,
    detail,
    archived: false,
    createdAt: now,
    updatedAt: now,
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/sets/${set.slug}`);
  redirect("/admin/products");
}

export async function updateProduct(slug: string, formData: FormData) {
  await guard();
  const input = parseForm(formData);

  const set = await getSetBySlug(input.setSlug);
  if (!set) throw new Error("Unknown set");

  const { detail, badge } = buildDetailAndBadge(input);

  await db
    .update(schema.products)
    .set({
      card: input.card,
      setName: set.name,
      setSlug: set.slug,
      expansion: input.expansion ?? null,
      number: input.number,
      status: input.status,
      priceCents: input.priceCents,
      stock: input.stock,
      stockEn: input.stockEn,
      stockJp: input.stockJp,
      editionTotal: input.editionTotal,
      description: input.description,
      badge,
      detail,
      updatedAt: new Date(),
    })
    .where(eq(schema.products.slug, slug));

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${slug}`);
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath(`/kits/${slug}`);
  revalidatePath(`/sets/${set.slug}`);
  redirect("/admin/products");
}

export async function archiveProduct(slug: string) {
  await guard();
  await db
    .update(schema.products)
    .set({ archived: true, updatedAt: new Date() })
    .where(eq(schema.products.slug, slug));
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProduct(slug: string) {
  await guard();
  await db.delete(schema.products).where(eq(schema.products.slug, slug));
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin/products");
}
