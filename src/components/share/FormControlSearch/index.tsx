"use client";

import CategorySelecter from "./CategorySelecter";
import SearchInput from "./SearchInput";
import { usePathname, useRouter } from "next/navigation";
import { categoryType } from "@/constants";

type FormControlSearch = {
  query: string;
  categoryId: string;
  categories: categoryType[];
};

export const FormControlSearch = ({
  categoryId,
  query,
  categories,
}: FormControlSearch) => {
  const path = usePathname();
  const router = useRouter();

  const onChangeText = (text: string) => {
    router.push(`${path}?query=${text}&categoryId=${categoryId}`);
  };

  const onChangeCategory = (categoryId: string) => {
    router.push(`${path}?&categoryId=${categoryId}`);
  };

  return (
    <section className="w-full flex items-center gap-2">
      <div className="relative flex-grow">
        <SearchInput onChange={onChangeText} defaultValue={query} key={query} />
      </div>

      <CategorySelecter
        categories={categories}
        onChange={onChangeCategory}
        defaultValue={categoryId}
      />
    </section>
  );
};

export default FormControlSearch;
