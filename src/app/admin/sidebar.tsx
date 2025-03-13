"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ADMIN_LINKS } from "@/constants";

const SidebarContent = ({
  setIsMobileOpen,
}: {
  setIsMobileOpen: (isOpen: boolean) => void;
}) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </Link>
        <div className="space-y-1">
          {ADMIN_LINKS.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-gray-100 rounded-lg transition",
                pathname === route.href
                  ? "text-primary bg-gray-100"
                  : "text-gray-600"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export function AdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex h-full w-[17rem] flex-col  z-50 top-20">
        <SidebarContent setIsMobileOpen={setIsMobileOpen} />
      </aside>
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTitle className="sr-only">Drawer&apos;s Links</SheetTitle>
        <SheetTrigger asChild className="lg:hidden fixed left-4 top-24 z-50">
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent setIsMobileOpen={setIsMobileOpen} />
        </SheetContent>
      </Sheet>
    </>
  );
}
