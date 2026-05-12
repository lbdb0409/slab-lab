"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";

import { logout } from "@/lib/actions/admin-auth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", Icon: Package },
  { href: "/admin/orders", label: "Orders", Icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", Icon: Users },
  { href: "/admin/subscribers", label: "Subscribers", Icon: Mail },
  { href: "/admin/analytics", label: "Analytics", Icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", Icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[260px] shrink-0 flex-col border-r border-line bg-text text-white lg:flex">
      <div className="border-b border-white/10 p-5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-text px-3 py-2.5 ring-1 ring-white/20">
            <Image
              src="/brand/logo.png"
              alt="Slablabs"
              width={120}
              height={28}
              className="h-7 w-auto"
            />
          </div>
        </Link>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-orange/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
          <span className="inline-block size-1.5 rounded-full bg-orange" />
          Admin
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors",
                active
                  ? "bg-white/10 text-orange"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              {active && (
                <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-r bg-orange" />
              )}
              <item.Icon className="size-4" strokeWidth={2.4} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-white"
        >
          <span className="inline-flex items-center gap-2">
            <ExternalLink className="size-3.5" strokeWidth={2.4} />
            Live site
          </span>
          <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
        </Link>
        <form action={logout} className="mt-1">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="size-3.5" strokeWidth={2.4} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
