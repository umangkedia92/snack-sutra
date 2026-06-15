import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import db from "@/lib/db";
import { initializeSchema } from "@/lib/schema";
import { MenuItem } from "@/types";

export default async function HomePage() {
  await initializeSchema();

  const result = await db.execute(
    `SELECT mi.*, c.name as category_name
     FROM menu_items mi
     LEFT JOIN categories c ON mi.category_id = c.id
     WHERE mi.is_featured = 1 AND mi.is_available = 1
     ORDER BY mi.id
     LIMIT 4`
  );

  const dishes = (result.rows as unknown as MenuItem[]) || [];

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        {dishes.length > 0 && <FeaturedDishes dishes={dishes} />}
        <TrustStrip />
      </main>
      <Footer />
    </>
  );
}

function TrustStrip() {
  const signals = [
    {
      title: "Fresh Ingredients",
      description: "Locally sourced, quality-checked daily",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-brand-400"
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
      ),
    },
    {
      title: "Fast Delivery",
      description: "Hot and fresh to your door in 30-45 min",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-brand-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Hygiene Certified",
      description: "FSSAI compliant, spotless kitchen standards",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-brand-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-16 border-t border-stone-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signals.map((signal) => (
            <div key={signal.title} className="text-center">
              <div className="flex justify-center mb-3">{signal.icon}</div>
              <h3 className="font-heading text-lg text-brand-700 mb-1">
                {signal.title}
              </h3>
              <p className="text-sm text-stone-500">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
