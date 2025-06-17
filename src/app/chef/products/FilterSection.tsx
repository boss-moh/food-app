"use client";

import { CategoriesSelecter, SearchInput } from "@/components/share";
import { Button } from "@/components/ui/button";
import { option, URL_PATHS } from "@/constants";
import useSearch from "@/hooks/useSearch";
import { Plus } from "lucide-react";
import Link from "next/link";

const FilterSection = ({ options }: { options: option[] }) => {
  const settingsSearch = useSearch();
  return (
    <div className="flex flex-col md:flex-row  w-full gap-4">
      <SearchInput {...settingsSearch} key={settingsSearch.defaultValue} />
      <div className="flex gap-4 flex-shrink-0">
        <CategoriesSelecter options={options} defaultValue="all" />
        <Button asChild>
          <Link href={URL_PATHS.CHEF.PRODUCT.CREATE}>
            Add Product
            <Plus className="mr-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
