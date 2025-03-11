"use client";
import {
  GridTemplate,
  SearchInput,
  Meals,
  CategoriesSelecter,
} from "@/components/share";

import DishCardSkeleton from "./DishCardSkeleton";
import { useCategoryHandlerURL } from "@/hooks/useCategoryURL";
import { useFilterMeals } from "@/hooks/useFilterMeals";

export default function MealsPage() {
  const { filterMeals, isLoading } = useFilterMeals();
  const onchange = useCategoryHandlerURL();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <SearchInput />
        <CategoriesSelecter onChange={onchange} />
      </div>
      {isLoading ? (
        <GridTemplate>
          {new Array(8).fill(0).map((_, key) => (
            <DishCardSkeleton key={key} />
          ))}
        </GridTemplate>
      ) : (
        <Meals meals={filterMeals} />
      )}
    </div>
  );
}
