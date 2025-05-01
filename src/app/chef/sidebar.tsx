"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CHEF_LINKS, URL_PATHS } from "@/constants";
import SideLink from "@/components/share/SideLink";
import MobileSideBar from "@/components/share/MoblieSideBar";
import { useToggle } from "@/hooks";

export function ChefSidebar() {
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
          href={URL_PATHS.CHEF.HOME_PAGE}
          className="flex items-center pl-3 mb-14"
        >
          <h1 className="text-xl font-bold">Chef Panel</h1>
        </Link>
        <div className="flex flex-col gap-3 ">
          {CHEF_LINKS.map((route) => (
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
