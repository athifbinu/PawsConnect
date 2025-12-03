"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/supabace/config";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully 👋",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => router.push("/admin/login"), 1500);
    }
  };

  // Navigation links
  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/addpets", label: "Add Pets" },
    { href: "/admin/list", label: "List" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <header className="backdrop-blur-md bg-blue-700/80 text-white shadow-lg sticky top-0 z-50 border-b border-blue-500/40">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide drop-shadow">
          🐾 PawsConnect Admin
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 rounded-xl transition-all duration-300 ${
                isActive(l.href)
                  ? "bg-white text-blue-700 shadow-md"
                  : "hover:bg-white/20"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-blue-800/90 backdrop-blur-md border-t border-blue-500/40"
          >
            <div className="p-4 space-y-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                    isActive(l.href)
                      ? "bg-white text-blue-700 font-semibold"
                      : "hover:bg-white/20"
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-3 rounded-lg text-left bg-red-600 hover:bg-red-700 transition-all font-medium"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
