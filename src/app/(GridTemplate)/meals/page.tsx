"use client";
import {
  GridTemplate,
  SearchInput,
  Meals,
  CategoriesSelecter,
} from "@/components/share";

import { useMeals } from "@/lib";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import DishCardSkeleton from "./DishCardSkeleton";

export default function MealsPage() {
  const mealsData = useMeals();

  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const filterMeals = !query
    ? mealsData.meals
    : mealsData.meals.filter((meal) => {
        if (meal.description.includes(query)) return true;
        if (meal.name.includes(query)) return true;

        return false;
      });

  const handleChangeCategory = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId.toLowerCase() === "all") {
      params.delete("categoryId");
    } else {
      params.set("categoryId", categoryId);
    }
    router.replace(`${path}?${params.toString()}`);
  };
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <SearchInput />
        <CategoriesSelecter onChange={handleChangeCategory} />
      </div>
      {mealsData.isLoading ? (
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
