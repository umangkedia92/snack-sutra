"use client";

import { Category } from "@/types";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
      <div className="flex gap-2 min-w-max">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            activeCategory === "all"
              ? "bg-brand-400 text-white"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat.slug
                ? "bg-brand-400 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
