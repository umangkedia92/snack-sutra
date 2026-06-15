import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — SnackSutra",
  description:
    "Learn about SnackSutra, our pure vegetarian cloud kitchen. Fresh ingredients, home-style recipes, packed with care.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-b from-brand-50 to-cream py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm uppercase tracking-widest text-brand-400 font-medium mb-3">
              About Us
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-brand-700 mb-6">
              Our Story
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed max-w-xl mx-auto">
              Born from a love for honest, home-style vegetarian cooking,
              SnackSutra brings fresh-made flavours straight to your doorstep.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-heading text-3xl text-brand-700 text-center mb-12">
              What We Stand For
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Fresh Every Day */}
              <div className="text-center p-6 rounded-xl bg-cream">
                <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-brand-400"
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
                <h3 className="font-heading text-xl text-brand-700 mb-2">
                  Fresh Every Day
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  We source ingredients from local markets each morning. Nothing
                  frozen, nothing stale — just real, fresh food prepared the day
                  you order it.
                </p>
              </div>

              {/* Home-Style Recipes */}
              <div className="text-center p-6 rounded-xl bg-cream">
                <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-brand-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl text-brand-700 mb-2">
                  Home-Style Recipes
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Our recipes are inspired by generations of home cooking. Every
                  dish is crafted with the warmth and care of a family kitchen.
                </p>
              </div>

              {/* Packed with Care */}
              <div className="text-center p-6 rounded-xl bg-cream">
                <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-brand-400"
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
                </div>
                <h3 className="font-heading text-xl text-brand-700 mb-2">
                  Packed with Care
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Eco-friendly packaging, tamper-proof seals, and insulated bags
                  ensure your food arrives safe, warm, and ready to enjoy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-cream py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-heading text-3xl text-brand-700 mb-8 text-center">
              The SnackSutra Journey
            </h2>

            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                SnackSutra started with a simple belief: vegetarian food should
                never be boring. Growing up in a household where every meal was
                a celebration of flavours, we wanted to share that joy beyond
                our kitchen walls.
              </p>

              <p>
                As a 100% pure vegetarian cloud kitchen, we take pride in
                serving food that is free from any non-vegetarian ingredients.
                Every spice is hand-picked, every recipe tested dozens of times,
                and every dish prepared with the kind of attention you would
                expect from a home kitchen — because that is exactly what we
                are, just on a bigger scale.
              </p>

              <p>
                We believe in keeping things simple: great ingredients, classic
                techniques, and a whole lot of heart. Whether it is a quick
                evening snack or a full family meal, we want every bite to
                feel like it was made just for you. That is the SnackSutra
                promise.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
