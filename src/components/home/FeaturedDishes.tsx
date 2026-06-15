import Link from "next/link";
import { MenuItem } from "@/types";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface FeaturedDishesProps {
  dishes: MenuItem[];
}

export default function FeaturedDishes({ dishes }: FeaturedDishesProps) {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl text-brand-700 text-center mb-12">
          Our Signature Dishes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                <span className="text-5xl" role="img" aria-label={dish.name}>
                  {getCategoryEmoji(dish.category_name)}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-heading text-lg text-brand-700 mb-1">
                  {dish.name}
                </h3>
                <p className="text-sm text-stone-500 line-clamp-2 mb-3">
                  {dish.description}
                </p>
                <p className="text-lg font-bold text-brand-400">
                  {CURRENCY_SYMBOL}
                  {dish.price.toFixed(0)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-brand-400 font-medium hover:text-brand-500 transition-colors"
          >
            View Full Menu
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function getCategoryEmoji(categoryName?: string): string {
  const name = (categoryName || "").toLowerCase();
  if (name.includes("snack")) return "🥟";
  if (name.includes("rice") || name.includes("biryani")) return "🍚";
  if (name.includes("bread") || name.includes("roti")) return "🥙";
  if (name.includes("curry") || name.includes("dal") || name.includes("main"))
    return "🍛";
  if (name.includes("sweet") || name.includes("dessert")) return "🍪";
  if (name.includes("drink") || name.includes("beverage")) return "🧃";
  if (name.includes("salad")) return "🥗";
  if (name.includes("soup")) return "🍲";
  return "🌿";
}
