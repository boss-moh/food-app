import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const useCategoryHandlerURL = () => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChangeCategory = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId.toLowerCase() === "all") {
      params.delete("categoryId");
    } else {
      params.set("categoryId", categoryId);
    }
    router.replace(`${path}?${params.toString()}`);
  };
  return handleChangeCategory;
};
