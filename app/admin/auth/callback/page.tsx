"use client";

import { useEffect } from "react";
import { supabase } from "@/supabace/config";
import { useRouter } from "next/navigation";

export default function AdminAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.push("/admin/dashboard");
      } else {
        router.push("/admin/login");
      }
    };

    checkUser();
  }, [router]);

  return <p className="text-white p-6">Logging in...</p>;
}
