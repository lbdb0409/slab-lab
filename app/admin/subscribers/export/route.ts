import { getAllSubscribers } from "@/lib/subscribers";

export async function GET() {
  const rows = await getAllSubscribers();
  const header = "email,signed_up_at\n";
  const body = rows
    .map((r) => `"${r.email.replace(/"/g, '""')}",${r.createdAt.toISOString()}`)
    .join("\n");

  const today = new Date().toISOString().slice(0, 10);
  return new Response(header + body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="slablabs-subscribers-${today}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
