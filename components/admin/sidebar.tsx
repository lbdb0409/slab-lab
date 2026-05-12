"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";

import { logout } from "@/lib/actions/admin-auth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", Icon: Package },
  { href: "/admin/orders", label: "Orders", Icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", Icon: Users },
  { href: "/admin/requests", label: "Requests", Icon: MessageSquare },
  { href: "/admin/subscribers", label: "Subscribers", Icon: Mail },
  { href: "/admin/broadcast", label: "Broadcast", Icon: Megaphone },
  { href: "/admin/analytics", label: "Analytics", Icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", Icon: Settings },
];

function NavBody({
  pathname,
  onItemClick,
}: {
  pathname: string;
  onItemClick?: () => void;
}) {
  return (
    <>
      <div className="border-b border-white/10 p-5">
        <Link
          href="/admin"
          onClick={onItemClick}
          className="flex items-center gap-3"
        >
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

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
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
          target="_blank"
          rel="noopener noreferrer"
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
    </>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer when navigating.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open.
  useEffect(() => {
    if (drawerOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [drawerOpen]);

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-text px-4 py-3 text-white lg:hidden">
        <Link href="/admin" className="inline-flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-text px-2 py-1.5 ring-1 ring-white/20">
            <Image
              src="/brand/logo.png"
              alt="Slablabs"
              width={100}
              height={24}
              className="h-5 w-auto"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
            Admin
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open admin menu"
          className="inline-flex size-9 items-center justify-center rounded-md border border-white/20 text-white hover:border-orange hover:text-orange"
        >
          <Menu className="size-4" strokeWidth={2.4} />
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden w-[260px] shrink-0 flex-col border-r border-line bg-text text-white lg:flex">
        <NavBody pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-text text-white shadow-xl">
            <div className="flex items-center justify-end border-b border-white/10 px-3 py-2">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-md text-white/70 hover:bg-white/5 hover:text-white"
              >
                <X className="size-4" strokeWidth={2.4} />
              </button>
            </div>
            <NavBody pathname={pathname} onItemClick={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
