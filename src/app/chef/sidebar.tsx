"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CHEF_LINKS } from "@/constants";
import SideLink from "@/components/share/SideLink";
import MobileSideBar from "@/components/share/MoblieSideBar";
import { useToggle } from "@/hooks";

type SidebarContentProps = {
  setIsMobileOpen: (isOpen: boolean) => void;
};

const SidebarContent = ({ setIsMobileOpen }: SidebarContentProps) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full ">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <h1 className="text-xl font-bold">Chef Panel</h1>
        </Link>
        <div className="space-y-1 flex flex-col gap-2">
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
