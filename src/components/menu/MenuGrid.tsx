"use client";

import { MenuItem } from "@/types";
import MenuCard from "./MenuCard";

interface MenuGridProps {
  items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
  const sorted = [...items].sort((a, b) => {
    if (a.is_available === b.is_available) return 0;
    return a.is_available ? -1 : 1;
  });

  if (sorted.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-stone-400 text-lg">
          No items found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sorted.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}
