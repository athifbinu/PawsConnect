import "../globals.css";
import { SuperAdminHeader } from "./components/SuperAdminHeader";
import { SuperAdminFooter } from "./components/SuperAdminFooter";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <SuperAdminHeader />
        <main className="min-h-screen p-6">{children}</main>
        <SuperAdminFooter />
      </body>
    </html>
  );
}
