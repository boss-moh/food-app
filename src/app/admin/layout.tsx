import type React from "react";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 pt-20">
      <AdminSidebar />
      <div className="flex-1 p-8 md:ml-64">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
