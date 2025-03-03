"use client";

import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoriy } from "@/lib";

type CategoriesSelecterProps = {
  onChange: (id: string) => void;
};
export const CategoriesSelecter = ({ onChange }: CategoriesSelecterProps) => {
  const { categories, isLoading, isError } = useCategoriy();
  const placeholder = isLoading ? "loading ... " : isError ? "Error" : false;
  return (
    <Select defaultValue="" onValueChange={onChange}>
      <SelectTrigger className="w-full md:w-[180px]">
        {/* selecetedCategory?.name */}
        <SelectValue placeholder={placeholder || "All Categories"} />
      </SelectTrigger>
      <SelectContent>
        {placeholder || (
          <>
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.map((category) => (
              <SelectItem
                className="capitalize"
                key={category.id}
                value={category.id}
              >
                {category.name}
              </SelectItem>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default CategoriesSelecter;
