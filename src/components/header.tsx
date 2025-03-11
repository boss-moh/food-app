"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";
import { NAV_LINKS, URL_PATHS } from "@/constants";

const NavItems = ({ mobile = false, onClick = () => {} }) => (
  <>
    <Button asChild variant="ghost">
      <Link href={URL_PATHS.HOME}>Home</Link>
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
            <Link onClick={onClick} href={item.href}>
              {item.name}
            </Link>
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
            <Link onClick={onClick} href={item.href}>
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    <Button asChild variant="ghost">
      <Link onClick={onClick} href={URL_PATHS.CART}>
        Cart
      </Link>
    </Button>
    {mobile && (
      <div className="mt-4 flex flex-col gap-4">
        {/* <Button variant="outline" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button> */}
        <Button variant="outline" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Sign In
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

          {/* desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <NavItems />
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button asChild variant="ghost">
                <Link href={URL_PATHS.AUTH.SIGN_IN}>Sign In</Link>
              </Button>
            </div>
          </nav>

          {/* moblie */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTitle className="sr-only">Drawer&apos;s Links</SheetTitle>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Logo />

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close Drawer</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4">
                  <NavItems mobile onClick={() => setIsOpen(false)} />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
