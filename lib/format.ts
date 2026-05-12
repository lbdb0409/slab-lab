export function formatCents(cents: number) {
  return `$${(cents / 100).toLocaleString("en-AU", {
    maximumFractionDigits: 0,
  })}`;
}

export function formatDate(date: Date | string | number) {
  const d = typeof date === "object" ? date : new Date(date);
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatRelative(date: Date | string | number) {
  const t =
    typeof date === "object"
      ? date.getTime()
      : typeof date === "number"
        ? date
        : new Date(date).getTime();
  const ms = Date.now() - t;
  if (ms < 60_000) return "just now";
  const min = Math.floor(ms / 60_000);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  return `${mo}mo ago`;
}

export function formatPrice(cents: number) {
  return formatCents(cents);
}
