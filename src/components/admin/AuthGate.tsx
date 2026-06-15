"use client";

import { useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

interface AuthGateProps {
  children: ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  // Skip auth check for login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setStatus("authenticated");
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/auth/check");
        if (res.ok) {
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
          router.replace("/admin/login");
        }
      } catch {
        setStatus("unauthenticated");
        router.replace("/admin/login");
      }
    };

    checkAuth();
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}
