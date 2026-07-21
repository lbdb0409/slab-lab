"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-[11px] md:min-h-0 font-bold uppercase tracking-wider text-text hover:border-text print:hidden"
    >
      <Printer className="size-3.5" strokeWidth={2.4} />
      Print this guide
    </button>
  );
}
