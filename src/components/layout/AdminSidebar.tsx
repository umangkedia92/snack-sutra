"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: "~" },
  { href: "/admin/menu", label: "Menu Items", icon: "#" },
  { href: "/admin/categories", label: "Categories", icon: "=" },
  { href: "/admin/orders", label: "Orders", icon: ">" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {
      // proceed regardless
    }
    router.push("/");
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-stone-200">
        <div className="p-6 border-b border-stone-100">
          <Link href="/admin" className="font-heading text-lg text-brand-700">
            SnackSutra
          </Link>
          <p className="text-xs text-stone-400 mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 py-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive(link.href)
                  ? "text-brand-400 bg-brand-50 border-r-2 border-brand-400 font-medium"
                  : "text-stone-600 hover:text-brand-400 hover:bg-stone-50"
              }`}
            >
              <span className="w-5 text-center text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-100">
          <button
            onClick={handleLogout}
            className="w-full text-left px-6 py-2 text-sm text-stone-500 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile horizontal nav */}
      <nav className="md:hidden flex items-center gap-1 overflow-x-auto bg-white border-b border-stone-200 px-4 py-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex-shrink-0 px-3 py-2 text-xs rounded-lg transition-colors ${
              isActive(link.href)
                ? "text-brand-400 bg-brand-50 font-medium"
                : "text-stone-600 hover:bg-stone-50"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex-shrink-0 ml-auto px-3 py-2 text-xs text-stone-500 hover:text-red-600 transition-colors"
        >
          Logout
        </button>
      </nav>
    </>
  );
}
