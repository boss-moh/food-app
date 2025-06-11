"use client";

import { SearchInput } from "@/components/share";
import OrderSelecter from "./OrderSelectes";
import useSearch from "@/hooks/useSearch";

const FilterSection = () => {
  const settings = useSearch();
  return (
    <section>
      <div className="flex items-center gap-4">
        <SearchInput {...settings} key={settings.defaultValue} />
        <OrderSelecter />
      </div>
    </section>
  );
};

export default FilterSection;
