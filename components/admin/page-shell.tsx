import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Crumb = { href?: string; label: string };

export function AdminPageHeader({
  title,
  eyebrow,
  body,
  actions,
  crumbs,
}: {
  title: ReactNode;
  eyebrow?: string;
  body?: ReactNode;
  actions?: ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <header className="border-b border-line bg-white px-6 py-6 md:px-10 md:py-8">
      {crumbs && (
        <nav className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
          {crumbs.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              {i > 0 && <span className="text-line-strong">›</span>}
              {c.href ? (
                <a href={c.href} className="hover:text-orange">
                  {c.label}
                </a>
              ) : (
                <span className="text-text">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          {eyebrow && (
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display text-3xl uppercase leading-tight tracking-tight md:text-4xl">
            {title}
          </h1>
          {body && (
            <p className="max-w-2xl text-sm text-text-soft md:text-base">{body}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

export function AdminContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-6 py-6 md:px-10 md:py-8", className)}>{children}</div>
  );
}

export function AdminCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-md border border-line bg-white", className)}>
      {children}
    </div>
  );
}

export function AdminCardHeader({
  title,
  action,
}: {
  title: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line px-5 py-4">
      <h2 className="font-display text-lg uppercase leading-none tracking-tight md:text-xl">
        {title}
      </h2>
      {action}
    </div>
  );
}
