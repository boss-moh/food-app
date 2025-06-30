"use client";
import { getURLRedirectBaseOnRole } from "@/utils/getRedirectURL";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useRedirectAfterUpdate = () => {
  const { update } = useSession();
  const router = useRouter();

  const handleUpdate = async () => {
    const session = await update();
    if (!session) return null;

    const { role } = session.user;
    router.push(getURLRedirectBaseOnRole(role));
  };

  return {
    redirectAfterUpdate: handleUpdate,
    update,
  };
};

export default useRedirectAfterUpdate;
