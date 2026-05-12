import { cn } from "@/lib/utils";

export function Octagon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn("pointer-events-none", className)}>
      <polygon
        points="29.3,0 70.7,0 100,29.3 100,70.7 70.7,100 29.3,100 0,70.7 0,29.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

export function ConfettiField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span className="confetti-dot left-[8%] top-[18%] size-2 bg-yellow" />
      <span className="confetti-dot left-[18%] top-[72%] size-1.5 bg-cyan" />
      <span className="confetti-dot left-[6%] top-[55%] size-1.5 bg-magenta" />
      <span className="confetti-dot right-[12%] top-[20%] size-2 bg-lime" />
      <span className="confetti-dot right-[8%] top-[68%] size-1.5 bg-yellow" />
      <span className="confetti-dot right-[24%] top-[40%] size-2 bg-magenta" />
    </div>
  );
}
