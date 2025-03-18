"use client";

//**
//
// FIXME:delete Avter
//
//  */

import { logout, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "./logo";
import { NAV_LINKS, URL_PATHS } from "@/constants";
import { useOrder } from "@/store";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useUpdateSession } from "@/hooks/useUpdateSession";

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
          </nav>

          {/* moblie */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTitle className="sr-only">Drawer&apos;s Links</SheetTitle>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] md:hidden"
            >
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
                  <NavItems onClick={() => setIsOpen(false)} />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const NavItems = ({ onClick = () => {} }) => {
  const { items } = useOrder();
  const count = items.length;

  return (
    <>
      {NAV_LINKS.map((link) => (
        <Button onClick={onClick} variant="ghost" asChild key={link.label}>
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}

      <Button onClick={onClick} asChild variant="ghost" className="relative">
        <Link href={URL_PATHS.CART}>
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {count}
          </span>
        </Link>
      </Button>
      {<UserDorpDownMenu onClick={onClick} />}
    </>
  );
};

/**
 * #TODO:Make Switch Veiw
 */
const UserDorpDownMenu = ({ onClick = () => {} }) => {
  const user = useUserInfo();
  const update = useUpdateSession();

  const handleClick = async () => {
    await logout();
    await update();
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative  md:size-8 md:rounded-full">
          <User className=" h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={URL_PATHS.USER.ORDERS.HOME_PAGE}>
            <ShoppingBag className="mr-2 h-5 w-5" />
            <span>My Orders</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClick}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button onClick={onClick} variant="ghost" asChild>
      <Link href={URL_PATHS.AUTH.SIGN_IN}>Sign in</Link>
    </Button>
  );
};
