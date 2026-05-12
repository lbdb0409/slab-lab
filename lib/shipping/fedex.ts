// FedEx Web Services API integration.
//
// To wire up real label generation:
//   1. Sign up for a FedEx Developer account: https://developer.fedex.com/
//   2. Create a project + obtain OAuth credentials.
//   3. Set env vars:
//        FEDEX_CLIENT_ID
//        FEDEX_CLIENT_SECRET
//        FEDEX_ACCOUNT_NUMBER
//   4. Replace `createShipment` with the OAuth + Ship API call:
//        - POST https://apis.fedex.com/oauth/token
//        - POST https://apis.fedex.com/ship/v1/shipments
//      Docs: https://developer.fedex.com/api/en-us/catalog/ship/v1/docs.html
//
// Until then, returns the manually entered tracking number with the FedEx
// tracking URL.

import type { CarrierAdapter } from "./index";

const HAS_KEYS = !!process.env.FEDEX_CLIENT_ID;

export const fedex: CarrierAdapter = {
  id: "fedex",
  label: "FedEx",
  isLive: HAS_KEYS,
  trackingUrlFor(trackingNumber: string) {
    return `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(trackingNumber)}`;
  },
  async createShipment(input) {
    const trackingNumber = input.manualTrackingNumber?.trim();
    if (!HAS_KEYS) {
      if (!trackingNumber) {
        throw new Error(
          "FedEx API not configured — enter the tracking number manually.",
        );
      }
      return {
        carrier: "fedex",
        trackingNumber,
        trackingUrl: this.trackingUrlFor(trackingNumber),
      };
    }

    throw new Error(
      "FedEx integration not implemented yet — wire createShipment in lib/shipping/fedex.ts.",
    );
  },
};
