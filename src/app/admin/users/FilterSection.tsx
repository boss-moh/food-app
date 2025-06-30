"use client";

import { SearchInput } from "@/components/share";
import UserSelecter from "./UserSelecter";
import useSearch from "@/hooks/useSearch";

const FilterSection = () => {
  const { onChange, defaultValue } = useSearch();
  return (
    <div className="flex items-center gap-4">
      <SearchInput
        onChange={onChange}
        defaultValue={defaultValue}
        key={defaultValue}
      />
      <UserSelecter />
    </div>
  );
};

export default FilterSection;
