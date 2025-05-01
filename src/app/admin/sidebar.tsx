"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_LINKS, URL_PATHS } from "@/constants";
import { useToggle } from "@/hooks";
import MobileSideBar from "@/components/share/MoblieSideBar";
import SideLink from "@/components/share/SideLink";

export function AdminSidebar() {
  const { isOpen, toggle, setIsOpen } = useToggle(false);

  return (
    <div className="flex-shrink-0 ">
      <aside className="hidden lg:flex h-full w-[17rem] flex-col  z-50 top-20">
        <SidebarContent setIsMobileOpen={setIsOpen} />
      </aside>

      <MobileSideBar setIsOpen={setIsOpen} isOpen={isOpen}>
        <SidebarContent setIsMobileOpen={toggle} />
      </MobileSideBar>
    </div>
  );
}

interface SidebarProps {
  setIsMobileOpen: ReturnType<typeof useToggle>["setIsOpen"];
}

const SidebarContent = ({ setIsMobileOpen }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full ">
      <div className="px-3 py-2 flex-1">
        <Link
          href={URL_PATHS.ADMIN.HOME_PAGE}
          className="flex items-center pl-3 mb-14"
        >
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </Link>

        <div className="gap-3 flex flex-col ">
          {ADMIN_LINKS.map((route) => (
            <SideLink
              route={route}
              onClick={() => setIsMobileOpen(false)}
              isActive={pathname === route.href}
              key={route.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
