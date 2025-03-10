import type React from "react";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className=" bg-gray-100 pt-20 flex-grow">
        <div className="flex-1 p-8 ">
          <div className="max-w-7xl max-w- mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
