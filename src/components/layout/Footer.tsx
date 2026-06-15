import Link from "next/link";

const quickLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-700 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-heading text-xl mb-2">SnackSutra</h3>
            <p className="text-white/70 text-sm">Pure Vegetarian Cloud Kitchen</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-white/50 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-white/50 mb-4">
              Order
            </h4>
            <a
              href="https://wa.me/919999999999?text=Hi%20SnackSutra!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785c-1.813 0-3.592-.488-5.14-1.412l-.369-.219-3.826 1.004 1.022-3.732-.24-.382A9.738 9.738 0 012.26 12.05C2.26 6.65 6.65 2.26 12.05 2.26c2.613 0 5.07 1.018 6.916 2.865A9.716 9.716 0 0121.84 12.05c-.003 5.4-4.393 9.785-9.79 9.785zM12.05 0C5.405 0 .005 5.392 0 12.037a12.017 12.017 0 001.61 6.012L0 24l6.115-1.603A12.04 12.04 0 0012.05 24.07C18.695 24.07 24.1 18.678 24.1 12.037 24.1 5.395 18.695 0 12.05 0z" />
              </svg>
              Order on WhatsApp
            </a>
            <p className="text-sm text-white/50 mt-3">
              Delivery Hours: 11 AM - 10 PM
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          &copy; 2026 SnackSutra. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
