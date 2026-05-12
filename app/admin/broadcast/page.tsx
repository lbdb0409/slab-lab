import {
  AdminContent,
  AdminPageHeader,
} from "@/components/admin/page-shell";
import { BroadcastForm } from "@/components/admin/broadcast-form";
import { countSubscribers } from "@/lib/subscribers";

export default async function AdminBroadcastPage() {
  const subscriberCount = await countSubscribers();

  return (
    <>
      <AdminPageHeader
        eyebrow="Email"
        title="Broadcast"
        body="Send an email to every launch-list subscriber. Use this for the launch announcement, restocks, or one-off updates."
      />
      <AdminContent>
        <BroadcastForm subscriberCount={subscriberCount} />
      </AdminContent>
    </>
  );
}
