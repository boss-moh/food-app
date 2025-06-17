import { FormControlSearch, GridTemplate } from "@/components/share";
import { searchParamsProps } from "@/constants";

import { Suspense } from "react";
import DishCardSkeleton from "./DishCardSkeleton";
import ServerFetch from "./Meals";
import { fetchCategories } from "@/data";

export const metadata = {
  title: "Meals Page | TastyGo",
  description:
    "Explore our delicious menu with a variety of meals to choose from.",
};

export default async function MealsPage({
  searchParams,
}: searchParamsProps<"categoryId"> & searchParamsProps<"query">) {
  const { categoryId = "", query = "" } = await searchParams;

  const categories = await fetchCategories();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <FormControlSearch
          categoryId={categoryId}
          query={query}
          categories={categories}
        />
      </div>
      <Suspense
        fallback={
          <GridTemplate>
            {new Array(10).fill(0).map((_, i) => (
              <DishCardSkeleton key={i} />
            ))}
          </GridTemplate>
        }
      >
        <ServerFetch categoryId={categoryId} query={query} />
      </Suspense>
    </div>
  );
}
