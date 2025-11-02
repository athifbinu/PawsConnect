"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabace/config";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/admin/login");
      } else {
        setUser(data.user);
      }
    }
    checkUser();
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {user.email} 👋
      </h1>
    </div>
  );
}
