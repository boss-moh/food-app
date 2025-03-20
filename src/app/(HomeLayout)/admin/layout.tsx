import { childrenProps } from "@/constants";
import { AdminSidebar } from "./sidebar";

export default function AdminLayout({ children }: childrenProps) {
  return (
    <div className="flex min-h-screen ">
      <div className="flex-shrink-0">
        <AdminSidebar />
      </div>
      <div className=" bg-gray-100 pt-14 flex-grow">
        <div className="flex-1 p-8 ">
          <div className="max-w-6xl max-w- mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
