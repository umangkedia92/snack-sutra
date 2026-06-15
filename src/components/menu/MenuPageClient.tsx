"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MenuItem, Category } from "@/types";
import { useCart } from "@/context/CartContext";
import { CURRENCY_SYMBOL } from "@/lib/constants";
import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuGrid from "@/components/menu/MenuGrid";
import Button from "@/components/ui/Button";

interface MenuPageClientProps {
  items: MenuItem[];
  categories: Category[];
}

export default function MenuPageClient({
  items,
  categories,
}: MenuPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { totalItems, subtotal } = useCart();

  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    const params = new URLSearchParams();
    if (slug !== "all") params.set("category", slug);
    router.replace(`/menu${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
  };

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => {
          const cat = categories.find((c) => c.slug === activeCategory);
          return cat ? item.category_id === cat.id : true;
        });

  return (
    <div className="flex gap-8">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="mt-8">
          <MenuGrid items={filteredItems} />
        </div>
      </div>

      {/* Desktop mini cart */}
      {totalItems > 0 && (
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-24 rounded-xl bg-white shadow-sm border border-stone-100 p-5">
            <h3 className="font-heading text-lg text-brand-700 mb-3">
              Your Cart
            </h3>
            <div className="text-sm text-stone-500 mb-1">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </div>
            <div className="text-xl font-bold text-brand-700 mb-4">
              {CURRENCY_SYMBOL}
              {subtotal.toFixed(0)}
            </div>
            <Button variant="primary" size="md" href="/cart" className="w-full">
              Go to Cart
            </Button>
          </div>
        </div>
      )}

      {/* Mobile floating cart bar */}
      {totalItems > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-stone-200 shadow-lg px-4 py-3">
          <Link
            href="/cart"
            className="flex items-center justify-between bg-brand-400 text-white rounded-lg px-5 py-3"
          >
            <span className="font-medium">
              View Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
            <span className="font-bold">
              {CURRENCY_SYMBOL}
              {subtotal.toFixed(0)}
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
