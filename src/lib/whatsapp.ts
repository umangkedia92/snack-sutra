import { CURRENCY_SYMBOL } from "./constants";
import { CartItem } from "@/types";

interface WhatsAppOrderDetails {
  orderRef: string;
  items: CartItem[];
  subtotal: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryNotes: string;
  preferredTiming: string;
}

export function buildWhatsAppURL(
  order: WhatsAppOrderDetails,
  whatsappNumber: string
): string {
  const itemLines = order.items.map(
    (item) =>
      `• ${item.name} × ${item.quantity} — ${CURRENCY_SYMBOL}${(item.price * item.quantity).toFixed(0)}`
  );

  const lines = [
    `*New Order — ${order.orderRef}*`,
    ``,
    `*Items:*`,
    ...itemLines,
    ``,
    `*Subtotal: ${CURRENCY_SYMBOL}${order.subtotal.toFixed(0)}*`,
    ``,
    `*Delivery Details:*`,
    `Name: ${order.customerName}`,
    `Phone: ${order.customerPhone}`,
    `Address: ${order.deliveryAddress}`,
    order.deliveryNotes ? `Notes: ${order.deliveryNotes}` : "",
    `Timing: ${order.preferredTiming}`,
    ``,
    `— Sent from SnackSutra`,
  ].filter(Boolean);

  const message = lines.join("\n");
  const phone = whatsappNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
