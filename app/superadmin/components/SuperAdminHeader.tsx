"use client";

import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export function SuperAdminHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-purple-700 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Shield size={24} />
          <h1 className="text-2xl font-semibold">Super Admin Panel</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/superadmin/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
          <Link
            href="/superadmin/manage-admins"
            className="hover:text-gray-200"
          >
            Manage Admins
          </Link>
          <Link href="/superadmin/settings" className="hover:text-gray-200">
            Settings
          </Link>
          <Link href="/logout" className="hover:text-gray-200">
            Logout
          </Link>
        </nav>

        {/* Mobile Menu */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-purple-800 p-4 space-y-2">
          <Link
            href="/superadmin/dashboard"
            className="block hover:text-gray-200"
          >
            Dashboard
          </Link>
          <Link
            href="/superadmin/manage-admins"
            className="block hover:text-gray-200"
          >
            Manage Admins
          </Link>
          <Link
            href="/superadmin/settings"
            className="block hover:text-gray-200"
          >
            Settings
          </Link>
          <Link href="/logout" className="block hover:text-gray-200">
            Logout
          </Link>
        </div>
      )}
    </header>
  );
}
