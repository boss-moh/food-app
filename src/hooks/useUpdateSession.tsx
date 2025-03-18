import { useSession } from "next-auth/react";

export const useUpdateSession = () => {
  const { update } = useSession();
  return update;
};
