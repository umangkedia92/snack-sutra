import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MenuPageClient from "@/components/menu/MenuPageClient";
import db from "@/lib/db";
import { initializeSchema } from "@/lib/schema";
import { MenuItem, Category } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu — SnackSutra",
  description:
    "Browse our full menu of pure vegetarian dishes. Snacks, mains, breads, beverages, and more.",
};

export default async function MenuPage() {
  await initializeSchema();

  const [categoriesResult, itemsResult] = await Promise.all([
    db.execute("SELECT * FROM categories ORDER BY display_order, name"),
    db.execute(
      `SELECT mi.*, c.name as category_name
       FROM menu_items mi
       LEFT JOIN categories c ON mi.category_id = c.id
       ORDER BY mi.name`
    ),
  ]);

  const categories = (categoriesResult.rows as unknown as Category[]) || [];
  const items = (itemsResult.rows as unknown as MenuItem[]) || [];

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 lg:pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl text-brand-700 mb-2">
            Our Menu
          </h1>
          <p className="text-stone-500 mb-8">
            100% vegetarian, made fresh every day.
          </p>

          <Suspense fallback={<MenuSkeleton />}>
            <MenuPageClient items={items} categories={categories} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}

function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-white shadow-sm overflow-hidden animate-pulse"
        >
          <div className="h-44 bg-stone-100" />
          <div className="p-4 space-y-3">
            <div className="h-5 bg-stone-100 rounded w-2/3" />
            <div className="h-4 bg-stone-100 rounded w-full" />
            <div className="h-4 bg-stone-100 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
