"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Carousel({
  children,
  ariaLabel,
  className,
}: {
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 8);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)} aria-label={ariaLabel}>
      <div
        ref={scrollerRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className={cn(
          "absolute left-2 top-[42%] z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all md:inline-flex",
          "hover:bg-text hover:text-white",
          !showLeft && "pointer-events-none opacity-0",
        )}
      >
        <ChevronLeft className="size-5" strokeWidth={2.4} />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Next"
        className={cn(
          "absolute right-2 top-[42%] z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all md:inline-flex",
          "hover:bg-text hover:text-white",
          !showRight && "pointer-events-none opacity-0",
        )}
      >
        <ChevronRight className="size-5" strokeWidth={2.4} />
      </button>
    </div>
  );
}

export function CarouselItem({
  children,
  width = "w-[240px] md:w-[260px]",
}: {
  children: ReactNode;
  width?: string;
}) {
  return (
    <div className={cn("snap-start shrink-0", width)}>{children}</div>
  );
}
