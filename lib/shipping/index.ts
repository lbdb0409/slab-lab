// Shipping carrier abstraction.
//
// Three carriers are scaffolded: AusPost MyPost Business, Couriers Please, and
// FedEx. None of them call real APIs yet — each carrier's `createShipment`
// returns the manually-entered tracking number plus a generated tracking URL.
// Wire up real label generation by replacing the stub functions in each
// adapter (see ./auspost.ts, etc.) once you have merchant credentials.
//
// To go live with a carrier:
//   1. Sign up for a merchant account (e.g. AusPost MyPost Business).
//   2. Get API keys / OAuth credentials.
//   3. Set the corresponding env vars (see each adapter's top comment).
//   4. Replace the stub body in `createShipment` with a real API call that
//      returns { trackingNumber, trackingUrl, labelUrl }.

import { auspost } from "./auspost";
import { couriersPlease } from "./couriers-please";
import { fedex } from "./fedex";

export type CarrierId = "auspost" | "couriers-please" | "fedex";

export type ShipmentInput = {
  orderNumber: string;
  recipientName: string;
  recipientEmail: string;
  city?: string | null;
  state?: string | null;
  // For manual entry until a real API is wired:
  manualTrackingNumber?: string;
};

export type ShipmentResult = {
  carrier: CarrierId;
  trackingNumber: string;
  trackingUrl: string;
  labelUrl?: string;
};

export type CarrierAdapter = {
  id: CarrierId;
  label: string;
  isLive: boolean; // true once real API is wired
  trackingUrlFor(trackingNumber: string): string;
  createShipment(input: ShipmentInput): Promise<ShipmentResult>;
};

export const CARRIERS: CarrierAdapter[] = [auspost, couriersPlease, fedex];

export const CARRIER_LABEL: Record<CarrierId, string> = {
  auspost: "Australia Post",
  "couriers-please": "Couriers Please",
  fedex: "FedEx",
};

export function getCarrier(id: CarrierId): CarrierAdapter {
  const c = CARRIERS.find((c) => c.id === id);
  if (!c) throw new Error(`Unknown carrier: ${id}`);
  return c;
}
