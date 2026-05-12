"use client";

import { ImageIcon, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition, type FormEvent } from "react";

import {
  archiveProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/actions/products";
import {
  AdminCard,
  AdminCardHeader,
} from "@/components/admin/page-shell";
import { EXPANSIONS } from "@/data/kits";
import { cn } from "@/lib/utils";

type Props = {
  mode: "new" | "edit";
  initial?: {
    slug?: string;
    card?: string;
    setSlug?: string;
    number?: string;
    status?: "live" | "soon";
    priceCents?: number;
    stock?: number;
    editionTotal?: number;
    description?: string;
  };
};

export function ProductForm({ mode, initial = {} }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        if (mode === "new") {
          await createProduct(formData);
        } else if (initial.slug) {
          await updateProduct(initial.slug, formData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't save product.");
      }
    });
  };

  const handleArchive = () => {
    if (!initial.slug) return;
    if (!confirm("Archive this product? It'll be hidden from the catalog but kept in the database.")) {
      return;
    }
    startTransition(() => archiveProduct(initial.slug!));
  };

  const handleDelete = () => {
    if (!initial.slug) return;
    if (!confirm("Permanently delete this product? This cannot be undone.")) {
      return;
    }
    startTransition(() => deleteProduct(initial.slug!));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 md:grid-cols-[1fr_320px]"
    >
      <div className="flex flex-col gap-6">
        <AdminCard>
          <AdminCardHeader title="Basics" />
          <div className="grid gap-4 p-5 md:grid-cols-2">
            <Field
              name="card"
              label="Card name"
              required
              defaultValue={initial.card ?? ""}
              placeholder="e.g. Mega Gengar EX"
            />
            <Field
              name="slug"
              label="Slug"
              required
              defaultValue={initial.slug ?? ""}
              placeholder="mega-gengar-ex"
              hint="Lowercase letters, numbers, and dashes only. Used in URLs."
              readOnly={mode === "edit"}
            />
            <Field
              name="number"
              label="Kit number"
              defaultValue={initial.number ?? ""}
              placeholder="001"
              required
              mono
            />
            <SelectField
              name="setSlug"
              label="Set / expansion"
              required
              defaultValue={initial.setSlug ?? ""}
              options={[
                { value: "", label: "Pick a set…" },
                ...EXPANSIONS.map((e) => ({ value: e.slug, label: e.name })),
              ]}
            />
            <Field
              name="price"
              label="Price (AUD)"
              defaultValue={
                initial.priceCents
                  ? (initial.priceCents / 100).toFixed(0)
                  : "149"
              }
              placeholder="149"
              mono
              required
            />
            <Field
              name="editionTotal"
              label="Edition size"
              defaultValue={
                initial.editionTotal ? String(initial.editionTotal) : "100"
              }
              placeholder="100"
              mono
              required
              hint="Total prints in this run"
            />
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="Description" />
          <div className="p-5">
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Product description
              </span>
              <textarea
                name="description"
                rows={6}
                defaultValue={initial.description ?? ""}
                placeholder="Describe the kit, the artwork, what makes it unique…"
                className="rounded-md border border-line bg-white px-3 py-2.5 text-sm placeholder:text-muted focus:border-text focus:outline-none"
              />
            </label>
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="Images" />
          <div className="p-5">
            <div className="flex aspect-[3/2] flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-line bg-bg-soft p-6 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-tint text-muted">
                <ImageIcon className="size-5" strokeWidth={2} />
              </span>
              <p className="font-display text-lg uppercase">Drop images here</p>
              <p className="max-w-xs text-xs text-muted">
                Image upload wires to your storage provider (Vercel Blob /
                Cloudflare R2) when you set up `BLOB_READ_WRITE_TOKEN`. For
                now, all products use the default slab mockup.
              </p>
              <button
                type="button"
                className="rounded-md border border-line bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-text hover:border-text"
                disabled
              >
                Choose files (soon)
              </button>
            </div>
          </div>
        </AdminCard>
      </div>

      <aside className="flex flex-col gap-6">
        <AdminCard>
          <AdminCardHeader title="Publish" />
          <div className="flex flex-col gap-3 p-5">
            <label className="flex items-center justify-between gap-3 rounded-md border border-line bg-bg-soft px-3 py-2.5">
              <span className="text-sm font-bold">Status</span>
              <select
                name="status"
                defaultValue={initial.status ?? "soon"}
                className="rounded-md border border-line bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider"
              >
                <option value="live">Live</option>
                <option value="soon">Coming soon</option>
              </select>
            </label>

            {error && (
              <p className="rounded-md border border-danger/40 bg-danger/5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-orange px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-orange-deep disabled:opacity-60"
            >
              <Save className="size-3.5" strokeWidth={2.6} />
              {pending
                ? "Saving…"
                : mode === "new"
                  ? "Create product"
                  : "Save changes"}
            </button>
            <Link
              href="/admin/products"
              className="text-center text-[11px] font-bold uppercase tracking-wider text-muted hover:text-orange"
            >
              Cancel
            </Link>
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="Inventory" />
          <div className="flex flex-col gap-3 p-5">
            <Field
              name="stock"
              label="Stock on hand"
              defaultValue={initial.stock != null ? String(initial.stock) : "0"}
              placeholder="76"
              mono
              hint="Pieces still available to sell"
            />
            <p className="text-xs text-muted">
              Stock decrements automatically when paid orders come in (once
              Stripe is wired). Edition size sits on the product itself.
            </p>
          </div>
        </AdminCard>

        {mode === "edit" && initial.slug && (
          <AdminCard className="border-danger/30">
            <AdminCardHeader title="Danger zone" />
            <div className="flex flex-col gap-3 p-5">
              <button
                type="button"
                onClick={handleArchive}
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-danger/40 bg-danger/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-danger hover:bg-danger hover:text-white disabled:opacity-60"
              >
                <Trash2 className="size-3.5" strokeWidth={2.6} />
                Archive product
              </button>
              <p className="text-xs text-muted">
                Archiving hides the product from the public catalog without
                deleting its history. Reversible from this form (un-archive).
              </p>
              <button
                type="button"
                onClick={handleDelete}
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-danger bg-danger px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-danger/90 disabled:opacity-60"
              >
                <Trash2 className="size-3.5" strokeWidth={2.6} />
                Delete permanently
              </button>
            </div>
          </AdminCard>
        )}
      </aside>
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
  placeholder,
  hint,
  required,
  mono,
  readOnly,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  mono?: boolean;
  readOnly?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
        {label}
        {required && <span className="ml-1 text-orange">*</span>}
      </span>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={cn(
          "rounded-md border border-line bg-white px-3 py-2 text-sm placeholder:text-muted focus:border-text focus:outline-none",
          mono && "font-mono",
          readOnly && "bg-bg-soft text-muted",
        )}
      />
      {hint && <span className="text-[10px] text-muted">{hint}</span>}
    </label>
  );
}

function SelectField({
  name,
  label,
  defaultValue,
  options,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
        {label}
        {required && <span className="ml-1 text-orange">*</span>}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-text focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
