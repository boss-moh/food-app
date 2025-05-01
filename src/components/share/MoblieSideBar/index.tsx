import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { childrenProps } from "@/constants";
import { Menu } from "lucide-react";

type MobileSideBarProps = childrenProps & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const MobileSideBar = ({
  children,
  isOpen,
  setIsOpen,
}: MobileSideBarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTitle className="sr-only">Drawer&apos;s Links</SheetTitle>
      <SheetTrigger asChild className="lg:hidden fixed left-4 top-24 z-50">
        <Button variant="outline" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
