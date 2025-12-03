"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabace/config";
import { motion } from "framer-motion";
import { PawPrint, Users } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [petCount, setPetCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // CHECK USER LOGIN
  // -------------------------
  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/admin/login");
      } else {
        setUser(data.user);
        fetchCounts();
      }
    }
    checkUser();
  }, []);

  // -------------------------
  // FETCH PET & CUSTOMER COUNT
  // -------------------------
  async function fetchCounts() {
    setLoading(true);

    const { count: totalPets } = await supabase
      .from("pets")
      .select("*", { count: "exact", head: true });

    const { count: totalCustomers } = await supabase
      .from("customers")
      .select("*", { count: "exact", head: true });

    setPetCount(totalPets || 0);
    setCustomerCount(totalCustomers || 0);
    setLoading(false);
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {user.email} 👋
      </h1>

      {/* GRID STATS */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TOTAL PETS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-white rounded-2xl shadow-lg border flex items-center gap-4"
        >
          <div className="bg-blue-100 p-4 rounded-full">
            <PawPrint className="text-blue-600 w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 font-medium">Total Pets Listed</p>
            <h2 className="text-3xl font-bold text-gray-800">
              {loading ? "..." : petCount}
            </h2>
          </div>
        </motion.div>

        {/* TOTAL CUSTOMERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-6 bg-white rounded-2xl shadow-lg border flex items-center gap-4"
        >
          <div className="bg-green-100 p-4 rounded-full">
            <Users className="text-green-600 w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-500 font-medium">Total Customers</p>
            <h2 className="text-3xl font-bold text-gray-800">
              {loading ? "..." : customerCount}
            </h2>
          </div>
        </motion.div>

        {/* MORE FEATURES BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="p-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-lg text-white"
        >
          <h3 className="text-xl font-semibold">More Features Coming… 🚀</h3>
          <p className="opacity-90 mt-2">
            Analytics, sales insights, and advanced admin tools.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
