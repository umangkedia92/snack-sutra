import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-50 to-cream overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-brand-100/60 blur-2xl" />
      <div className="absolute bottom-32 right-16 w-36 h-36 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="absolute top-1/3 right-10 w-16 h-16 rounded-full bg-brand-100/50 blur-xl" />

      {/* Decorative leaf shape */}
      <div className="absolute bottom-20 left-1/4 opacity-10">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 10C60 10 20 40 20 70C20 90 38 110 60 110C82 110 100 90 100 70C100 40 60 10 60 10Z"
            fill="#4A7C59"
          />
          <path
            d="M60 30V100M60 50L45 65M60 65L75 50"
            stroke="#F5F1EB"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-brand-400 font-medium mb-4">
          Pure Vegetarian Cloud Kitchen
        </p>

        <h1 className="font-heading text-4xl md:text-6xl text-brand-700 mb-6 leading-tight">
          Fresh Flavors, Delivered to Your Door
        </h1>

        <p className="text-stone-500 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Wholesome, home-style vegetarian cooking made with love and the
          freshest ingredients — delivered straight to you, piping hot.
        </p>

        <Button variant="primary" size="lg" href="/menu">
          Explore Our Menu
        </Button>
      </div>
    </section>
  );
}
