"use client";

import { MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { CURRENCY_SYMBOL } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart();

  const available = item.is_available === 1;

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image_url: item.image_url,
    });
  };

  return (
    <div
      className={`rounded-xl bg-white shadow-sm overflow-hidden transition-shadow ${
        available ? "hover:shadow-md" : "opacity-70"
      }`}
    >
      {/* Image placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-brand-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>

        {!available && (
          <div className="absolute top-3 right-3">
            <Badge variant="error">Unavailable</Badge>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-heading text-lg text-brand-700 mb-1">
          {item.name}
        </h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-brand-700">
            {CURRENCY_SYMBOL}
            {item.price.toFixed(0)}
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAdd}
            disabled={!available}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
