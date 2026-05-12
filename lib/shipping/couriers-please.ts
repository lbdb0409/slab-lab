// Couriers Please API integration.
//
// To wire up real label generation:
//   1. Sign up: https://www.couriersplease.com.au/
//   2. Request API access from your account manager.
//   3. Set env vars:
//        COURIERS_PLEASE_API_KEY  — your API key
//        COURIERS_PLEASE_ACCOUNT  — your account code
//   4. Replace `createShipment` with a real call to their consignment API.
//      Docs (request from CP account team): typically POST /v1/consignments
//
// Until then, behaves identically to the AusPost stub — uses the manually
// entered tracking number and generates the public tracking URL.

import type { CarrierAdapter } from "./index";

const HAS_KEYS = !!process.env.COURIERS_PLEASE_API_KEY;

export const couriersPlease: CarrierAdapter = {
  id: "couriers-please",
  label: "Couriers Please",
  isLive: HAS_KEYS,
  trackingUrlFor(trackingNumber: string) {
    return `https://www.couriersplease.com.au/tools-track/track-trace/?id=${encodeURIComponent(trackingNumber)}`;
  },
  async createShipment(input) {
    const trackingNumber = input.manualTrackingNumber?.trim();
    if (!HAS_KEYS) {
      if (!trackingNumber) {
        throw new Error(
          "Couriers Please API not configured — enter the tracking number manually.",
        );
      }
      return {
        carrier: "couriers-please",
        trackingNumber,
        trackingUrl: this.trackingUrlFor(trackingNumber),
      };
    }

    throw new Error(
      "Couriers Please integration not implemented yet — wire createShipment in lib/shipping/couriers-please.ts.",
    );
  },
};
