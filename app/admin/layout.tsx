"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/supabace/config";
import { AdminHeader } from "./components/AdminHeader";
import { AdminFooter } from "./components/AdminFooter";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const isAuthRoute = pathname === "/admin/login" || pathname === "/admin/signup";

      if (session) {
        if (isAuthRoute) {
          router.push("/admin/dashboard");
        } else {
          setIsLoading(false);
        }
      } else {
        if (!isAuthRoute) {
          router.push("/admin/login");
        } else {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const isAuthRoute = pathname === "/admin/login" || pathname === "/admin/signup";
      if (session) {
        if (isAuthRoute) router.push("/admin/dashboard");
      } else {
        if (!isAuthRoute) router.push("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  const isAuthRoute = pathname === "/admin/login" || pathname === "/admin/signup";

  return (
    <>
      {!isAuthRoute && <AdminHeader />}
      <main className={!isAuthRoute ? "min-h-screen bg-gray-50" : "min-h-screen"}>
        {children}
      </main>
      {!isAuthRoute && <AdminFooter />}
    </>
  );
}
