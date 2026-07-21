"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tab = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

const TABS: Tab[] = [
  { href: "/account", label: "Overview", Icon: LayoutDashboard },
  { href: "/account/orders", label: "Orders", Icon: Package },
  { href: "/wishlist", label: "Wishlist", Icon: Heart },
  { href: "/account/addresses", label: "Addresses", Icon: MapPin },
  { href: "/account/settings", label: "Settings", Icon: Settings },
];

export function AccountSidebar({ name, email }: { name: string; email: string }) {
  const pathname = usePathname();

  return (
    <aside className="min-w-0 md:sticky md:top-[180px] md:self-start">
      <div className="hidden items-center gap-3 border-2 border-text bg-white p-5 md:flex">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-orange/15 font-display text-xl text-orange">
          {name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-bold">{name}</span>
          <span className="truncate text-xs text-muted">{email}</span>
        </div>
      </div>

      <nav className="scrollbar-hide flex gap-2 overflow-x-auto md:mt-3 md:flex-col md:gap-0 md:overflow-visible">
        {TABS.map((tab) => {
          const active =
            tab.href === "/account"
              ? pathname === "/account"
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex shrink-0 items-center gap-3 whitespace-nowrap border-2 border-text bg-white px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors md:-mt-px",
                active
                  ? "bg-orange text-white"
                  : "text-text hover:bg-bg-soft",
              )}
            >
              <tab.Icon className="size-4" strokeWidth={2.4} />
              {tab.label}
            </Link>
          );
        })}
        <button
          type="button"
          className="flex shrink-0 items-center gap-3 whitespace-nowrap border-2 border-line bg-white px-4 py-3 text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:bg-bg-soft hover:text-orange md:-mt-px"
        >
          <LogOut className="size-4" strokeWidth={2.4} />
          Sign out
        </button>
      </nav>
    </aside>
  );
}

export function AccountShell({
  name,
  email,
  children,
}: {
  name: string;
  email: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr] md:gap-10">
      <AccountSidebar name={name} email={email} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
