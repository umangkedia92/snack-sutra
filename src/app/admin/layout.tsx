"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AuthGate from "@/components/admin/AuthGate";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-stone-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <AuthGate>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            {children}
          </main>
        </div>
      </AuthGate>
    </div>
  );
}
