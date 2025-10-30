"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold tracking-wide">
          Admin Dashboard
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/admin/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
          <Link href="/admin/products" className="hover:text-gray-200">
            Products
          </Link>
          <Link href="/admin/users" className="hover:text-gray-200">
            Users
          </Link>
          <Link href="/logout" className="hover:text-gray-200">
            Logout
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 p-4 space-y-2">
          <Link href="/admin/dashboard" className="block hover:text-gray-200">
            Dashboard
          </Link>
          <Link href="/admin/products" className="block hover:text-gray-200">
            Products
          </Link>
          <Link href="/admin/users" className="block hover:text-gray-200">
            Users
          </Link>
          <Link href="/logout" className="block hover:text-gray-200">
            Logout
          </Link>
        </div>
      )}
    </header>
  );
}
