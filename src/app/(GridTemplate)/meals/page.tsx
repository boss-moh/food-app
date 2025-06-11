import { FormControlSearch } from "@/components/share";
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
  const searchProps = await searchParams;

  const categories = await fetchCategories();

  console.log("searchProps", searchProps);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <FormControlSearch {...searchProps} categories={categories} />
      </div>
      <Suspense
        fallback={new Array(10).fill(0).map((_, i) => (
          <DishCardSkeleton key={i} />
        ))}
      >
        <ServerFetch {...searchProps} />
      </Suspense>
    </div>
  );
}
