"use client";
import { RoleStatus } from "@prisma/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

type role = RoleStatus | "all" | "only-login" | "non-login";

type WhoCanSeeProps = {
  roles: role[];
};

const WhoCanSee = ({ children, roles }: PropsWithChildren<WhoCanSeeProps>) => {
  const { data: session } = useSession();

  const isCan = roles.some((role) => canSee(role, session));
  return isCan ? children : null;
};

const canSee = (role: role, session: Session | null) => {
  if (role === "all") return true;
  if (role === "only-login") {
    if (!session) return false;
  }

  if (role === "non-login") {
    if (!session) return true;
    else return false;
  }
  if (!session) return false;

  return session.user.role == role ? true : false;
};

export default WhoCanSee;
