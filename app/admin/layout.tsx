import "../globals.css";
import { AdminHeader } from "./components/AdminHeader";
import { AdminFooter } from "./components/AdminFooter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AdminHeader />
        <main className="min-h-screen p-6">{children}</main>
        <AdminFooter />
      </body>
    </html>
  );
}
