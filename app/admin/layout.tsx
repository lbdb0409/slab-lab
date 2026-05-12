import type { Metadata } from "next";

import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-1 bg-bg-soft">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
