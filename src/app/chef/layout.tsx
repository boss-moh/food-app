import { childrenProps } from "@/constants";
import { AdminSidebar } from "./sidebar";

export default function AdminLayout({ children }: childrenProps) {
  return (
    <div className="flex min-h-screen container ">
      <div className="flex-shrink-0 ">
        <AdminSidebar />
      </div>
      <div className=" bg-secondary px-4 md:px-6 py-12 flex-grow overflow-hidden">
        {children}
      </div>
    </div>
  );
}
