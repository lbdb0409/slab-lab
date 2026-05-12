import {
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Catalog"
        title="New product"
        body="Add a new slab kit. It appears on the catalog as soon as you save."
        crumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/products", label: "Products" },
          { label: "New" },
        ]}
      />
      <AdminContent>
        <ProductForm mode="new" />
      </AdminContent>
    </>
  );
}
