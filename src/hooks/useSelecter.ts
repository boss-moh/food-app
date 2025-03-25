import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSelecter = (key: string) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const path = usePathname();

  const defaultValue = searchParam.get(key) || "all";
  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParam);

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`${path}?${params.toString()}`);
  };
  return { onChange, defaultValue };
};
