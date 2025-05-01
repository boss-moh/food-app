import { Button } from "@/components/ui/button";
import { SideLinkRouteType } from "@/constants";
import { cn } from "@/lib";
import Link from "next/link";

type SideLinkProps = {
  isActive: boolean;
  route: SideLinkRouteType;
  onClick?: () => void;
};

export const SideLink = ({ isActive, route, onClick }: SideLinkProps) => {
  return (
    <Button
      asChild
      variant={"secondary"}
      className={cn(
        "justify-start   bg-background ",
        isActive && " bg-secondary text-primary "
      )}
      onClick={() => onClick?.()}
    >
      <Link href={route.href}>
        <div className="flex items-center flex-1">
          <route.icon className={"h-5 w-5 mr-3"} />
          {route.label}
        </div>
      </Link>
    </Button>
  );
};

export default SideLink;
