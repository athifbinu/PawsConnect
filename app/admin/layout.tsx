"use client";

import { AdminHeader } from "./components/AdminHeader";
import { AdminFooter } from "./components/AdminFooter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
      <main className="min-h-screen p-6">{children}</main>
      <AdminFooter />
    </>
  );
}
