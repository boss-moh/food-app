"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";
import { NAV_LINKS } from "@/constants";

const NavItems = ({ mobile = false }) => (
  <>
    <Button variant="ghost" className="flex items-center gap-1">
      Home
    </Button>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1">
          Menu
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {NAV_LINKS.menu.map((item) => (
          <DropdownMenuItem key={item.name} asChild>
            <Link href={item.href}>{item.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1">
          Pages
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {NAV_LINKS.pages.map((item) => (
          <DropdownMenuItem key={item.name} asChild>
            <Link href={item.href}>{item.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    <Button variant="ghost">Buy</Button>

    {mobile && (
      <div className="mt-4 flex flex-col gap-4">
        <Button variant="outline" className="w-full justify-start">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
      </div>
    )}
  </>
);
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b  bg-white ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            <NavItems />
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Link
                    href="/"
                    className="text-2xl font-bold italic"
                    onClick={() => setIsOpen(false)}
                  >
                    Tastelife
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  <NavItems mobile />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
