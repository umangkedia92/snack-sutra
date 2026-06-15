"use client";

import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-stone-100 last:border-0">
      {/* Image placeholder */}
      <div className="w-[60px] h-[60px] rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-brand-300"
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

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-stone-800 text-sm">{item.name}</h3>
        <p className="text-sm text-stone-400">
          {CURRENCY_SYMBOL}
          {item.price.toFixed(0)} each
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-7 h-7 rounded-full border border-brand-300 text-brand-400 flex items-center justify-center text-sm font-bold hover:bg-brand-50 transition-colors"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="w-6 text-center text-sm font-medium text-stone-700">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 rounded-full border border-brand-300 text-brand-400 flex items-center justify-center text-sm font-bold hover:bg-brand-50 transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Line total */}
      <div className="w-20 text-right">
        <span className="font-bold text-brand-700 text-sm">
          {CURRENCY_SYMBOL}
          {lineTotal.toFixed(0)}
        </span>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
