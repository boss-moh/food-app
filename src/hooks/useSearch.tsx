import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useSearch = (key: string = "query") => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const path = usePathname();

  const defaultValue = searchParam.get(key) ?? "";

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParam);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`${path}?${params.toString()}`);
  };
  return { onChange, defaultValue };
};

export default useSearch;
