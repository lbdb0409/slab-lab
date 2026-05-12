// Australia Post. MyPost Business API integration.
//
// To wire up real label generation:
//   1. Sign up at https://www.auspost.com.au/mypost-business
//   2. Apply for API access. Https://developers.auspost.com.au/apis
//   3. Set env vars:
//        AUSPOST_API_KEY            : your MyPost Business API key
//        AUSPOST_ACCOUNT_NUMBER     : your MyPost Business account number
//        AUSPOST_SENDER_NAME        : name shown on the from-address
//        AUSPOST_SENDER_STREET      : sender street address
//        AUSPOST_SENDER_SUBURB      : sender suburb
//        AUSPOST_SENDER_STATE       : sender state (e.g. "VIC")
//        AUSPOST_SENDER_POSTCODE    : sender postcode
//   4. Replace the body of `createShipment` below with a call to
//        POST https://digitalapi.auspost.com.au/shipping/v1/shipments
//      Documentation: https://developers.auspost.com.au/apis/pacpcs-shipping
//
// Until real keys are set, `createShipment` returns the tracking number that
// the admin typed manually plus the standard AusPost tracking URL. No label
// is generated. The admin is expected to paste a label they printed
// elsewhere (e.g. directly from the MyPost Business portal).

import type { CarrierAdapter } from "./index";

const HAS_KEYS = !!process.env.AUSPOST_API_KEY;

export const auspost: CarrierAdapter = {
  id: "auspost",
  label: "Australia Post",
  isLive: HAS_KEYS,
  trackingUrlFor(trackingNumber: string) {
    return `https://auspost.com.au/mypost/track/#/details/${encodeURIComponent(trackingNumber)}`;
  },
  async createShipment(input) {
    if (!HAS_KEYS) {
      const trackingNumber = input.manualTrackingNumber?.trim();
      if (!trackingNumber) {
        throw new Error(
          "AusPost API not configured. Enter the tracking number manually.",
        );
      }
      return {
        carrier: "auspost",
        trackingNumber,
        trackingUrl: this.trackingUrlFor(trackingNumber),
      };
    }

    // TODO: Replace this stub with a real AusPost API call once
    // AUSPOST_API_KEY is set. Expected shape:
    //
    //   const res = await fetch("https://digitalapi.auspost.com.au/shipping/v1/shipments", {
    //     method: "POST",
    //     headers: {
    //       "Authorization": `Basic ${Buffer.from(process.env.AUSPOST_API_KEY!).toString("base64")}`,
    //       "Account-Number": process.env.AUSPOST_ACCOUNT_NUMBER!,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ shipments: [...] }),
    //   });
    //   const json = await res.json();
    //   const shipment = json.shipments[0];
    //   const trackingNumber = shipment.items[0].tracking_details.article_id;
    //   return {
    //     carrier: "auspost",
    //     trackingNumber,
    //     trackingUrl: this.trackingUrlFor(trackingNumber),
    //     labelUrl: shipment.label_url, // from a follow-up /labels call
    //   };

    throw new Error(
      "AusPost integration not implemented yet. Wire createShipment in lib/shipping/auspost.ts.",
    );
  },
};
