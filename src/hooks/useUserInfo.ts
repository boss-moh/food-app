import { useSession } from "next-auth/react";

export const useUserInfo = () => {
  const session = useSession();
  return session.data?.user || null;
};
