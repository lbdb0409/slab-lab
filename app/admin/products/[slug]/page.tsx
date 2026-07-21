import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import {
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { ProductForm } from "@/components/admin/product-form";
import { getProductBySlugAdmin } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export default async function EditProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlugAdmin(slug);
  if (!product) notFound();

  return (
    <>
      <AdminPageHeader
        eyebrow={`Editing · ${product.setName}`}
        title={product.card}
        crumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/products", label: "Products" },
          { label: product.card },
        ]}
        actions={
          <Link
            href={`/kits/${product.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-text hover:border-text"
          >
            <ExternalLink className="size-3.5" strokeWidth={2.6} />
            View live
          </Link>
        }
      />
      <AdminContent>
        <ProductForm
          mode="edit"
          initial={{
            slug: product.slug,
            card: product.card,
            setSlug: product.setSlug,
            expansion: product.expansion ?? "",
            number: product.number,
            status: product.status,
            priceCents: product.priceCents,
            stock: product.stock ?? 0,
            stockEn: product.stockEn ?? null,
            stockJp: product.stockJp ?? null,
            editionTotal: product.editionTotal ?? 100,
            description: product.description ?? "",
          }}
        />
      </AdminContent>
    </>
  );
}
