import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — SnackSutra",
  description:
    "Get in touch with SnackSutra. Reach us via phone, WhatsApp, or email. View delivery zones and operating hours.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl text-brand-700 mb-2">
            Contact Us
          </h1>
          <p className="text-stone-500 mb-12">
            We would love to hear from you. Reach out any time.
          </p>

          {/* Contact info */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ContactCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
              title="Phone"
              value="+91 98765 43210"
              href="tel:+919876543210"
            />
            <ContactCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              }
              title="WhatsApp"
              value="Chat with us"
              href="https://wa.me/919876543210"
            />
            <ContactCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              title="Email"
              value="hello@snacksutra.in"
              href="mailto:hello@snacksutra.in"
            />
          </section>

          {/* Delivery Zones */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl text-brand-700 mb-6">
              Delivery Zones
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-50">
                    <th className="text-left px-5 py-3 font-medium text-brand-700">
                      Area
                    </th>
                    <th className="text-left px-5 py-3 font-medium text-brand-700">
                      Estimated Delivery
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {deliveryZones.map((zone) => (
                    <tr key={zone.area}>
                      <td className="px-5 py-3 text-stone-700">{zone.area}</td>
                      <td className="px-5 py-3 text-stone-500">{zone.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Operating Hours */}
          <section className="mb-16">
            <h2 className="font-heading text-2xl text-brand-700 mb-6">
              Operating Hours
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-50">
                    <th className="text-left px-5 py-3 font-medium text-brand-700">
                      Day
                    </th>
                    <th className="text-left px-5 py-3 font-medium text-brand-700">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {operatingHours.map((row) => (
                    <tr key={row.day}>
                      <td className="px-5 py-3 text-stone-700">{row.day}</td>
                      <td className="px-5 py-3 text-stone-500">{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-2xl text-brand-700 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden"
                >
                  <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-stone-800 flex items-center justify-between list-none">
                    <span>{faq.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-stone-400 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-stone-500 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* --- Contact card helper --- */

function ContactCard({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-stone-100 p-5 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-400 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-stone-400 mb-0.5">
          {title}
        </p>
        <p className="text-sm font-medium text-brand-700">{value}</p>
      </div>
    </a>
  );
}

/* --- Static data --- */

const deliveryZones = [
  { area: "Koramangala", time: "25-35 minutes" },
  { area: "Indiranagar", time: "30-40 minutes" },
  { area: "HSR Layout", time: "20-30 minutes" },
  { area: "BTM Layout", time: "25-35 minutes" },
  { area: "Jayanagar", time: "35-45 minutes" },
  { area: "JP Nagar", time: "30-40 minutes" },
  { area: "Whitefield", time: "45-60 minutes" },
];

const operatingHours = [
  { day: "Monday - Friday", hours: "11:00 AM - 10:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 10:30 PM" },
  { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
];

const faqs = [
  {
    question: "What is the minimum order?",
    answer:
      "There is no minimum order amount. You can order as little or as much as you like!",
  },
  {
    question: "Do you accept cash on delivery?",
    answer:
      "Yes, we accept cash on delivery. You can also pay via UPI or other digital methods — just let us know on WhatsApp.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once you place your order through WhatsApp, our team will keep you updated with real-time status messages in the same chat. You can reach out any time to ask about your order.",
  },
  {
    question: "Is your kitchen pure vegetarian?",
    answer:
      "Yes, SnackSutra is a 100% pure vegetarian kitchen. We do not use any non-vegetarian ingredients, including eggs. All our dishes are completely vegetarian.",
  },
];
