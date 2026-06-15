"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItemRow from "@/components/cart/CartItem";
import DeliveryForm from "@/components/cart/DeliveryForm";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { CURRENCY_SYMBOL, WHATSAPP_NUMBER } from "@/lib/constants";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import { DeliveryDetails } from "@/types";

type PageState = "cart" | "submitting" | "confirmed";

interface OrderConfirmation {
  orderRef: string;
  whatsappUrl: string;
}

export default function CartPage() {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const [pageState, setPageState] = useState<PageState>("cart");
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (details: DeliveryDetails) => {
    setPageState("submitting");
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerName: details.customerName,
          customerPhone: details.customerPhone,
          deliveryAddress: details.deliveryAddress,
          deliveryNotes: details.deliveryNotes,
          preferredTiming: details.preferredTiming,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to place order. Please try again.");
      }

      const data = await res.json();
      const orderRef: string = data.order_ref || data.orderRef || "ORD-XXXX";

      const whatsappUrl = buildWhatsAppURL(
        {
          orderRef,
          items,
          subtotal,
          customerName: details.customerName,
          customerPhone: details.customerPhone,
          deliveryAddress: details.deliveryAddress,
          deliveryNotes: details.deliveryNotes,
          preferredTiming: details.preferredTiming,
        },
        WHATSAPP_NUMBER
      );

      clearCart();
      setConfirmation({ orderRef, whatsappUrl });
      setPageState("confirmed");

      window.open(whatsappUrl, "_blank");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setPageState("cart");
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-4">
          {/* Confirmed state */}
          {pageState === "confirmed" && confirmation && (
            <div className="max-w-md mx-auto text-center py-20">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="font-heading text-2xl text-brand-700 mb-2">
                Order Placed!
              </h1>
              <p className="text-stone-500 mb-1">
                Your order reference is
              </p>
              <p className="text-xl font-bold text-brand-400 mb-4">
                {confirmation.orderRef}
              </p>
              <p className="text-sm text-stone-500 mb-8">
                Your order has been sent to WhatsApp. We will confirm your order
                shortly via chat.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="whatsapp"
                  size="md"
                  onClick={() =>
                    window.open(confirmation.whatsappUrl, "_blank")
                  }
                >
                  Open WhatsApp
                </Button>
                <Button variant="secondary" size="md" href="/menu">
                  Order More
                </Button>
              </div>
            </div>
          )}

          {/* Empty cart */}
          {pageState !== "confirmed" && items.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-brand-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h1 className="font-heading text-2xl text-brand-700 mb-2">
                Your cart is empty
              </h1>
              <p className="text-stone-500 mb-6">
                Looks like you have not added anything yet.
              </p>
              <Button variant="primary" size="md" href="/menu">
                Browse Menu
              </Button>
            </div>
          )}

          {/* Cart with items */}
          {pageState !== "confirmed" && items.length > 0 && (
            <>
              <h1 className="font-heading text-3xl text-brand-700 mb-8">
                Your Cart
              </h1>

              {error && (
                <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Cart items */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-5">
                    {items.map((item) => (
                      <CartItemRow key={item.id} item={item} />
                    ))}

                    <div className="pt-4 mt-2 border-t border-stone-200 flex justify-between items-center">
                      <span className="text-stone-500">
                        Subtotal ({totalItems}{" "}
                        {totalItems === 1 ? "item" : "items"})
                      </span>
                      <span className="text-xl font-bold text-brand-700">
                        {CURRENCY_SYMBOL}
                        {subtotal.toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery form */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-5">
                    <DeliveryForm
                      onSubmit={handleSubmit}
                      disabled={pageState === "submitting"}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
