export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "SnackSutra";
export const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";
export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "919876543210";

export const DELIVERY_TIMINGS = [
  "ASAP",
  "In 30 minutes",
  "In 1 hour",
  "In 2 hours",
] as const;

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "delivered",
  "cancelled",
] as const;
