import { useSession } from "next-auth/react";

export const useUserInfo = () => {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user || null,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading"
  };
};
