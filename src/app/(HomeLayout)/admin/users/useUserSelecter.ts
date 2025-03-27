import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUserSelecter = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const path = usePathname();

  const defaultValue = searchParam.get("role") || "all";
  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParam);

    if (value === "all") {
      params.delete("role");
    } else {
      params.set("role", value);
    }

    router.replace(`${path}?${params.toString()}`);
  };
  return { onChange, defaultValue };
};
