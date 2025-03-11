"use client";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import {
  CategoriesSelecter,
  GridTemplate,
  SearchInput,
} from "@/components/share";
import Link from "next/link";
import { URL_PATHS } from "@/constants";
import { useCategoryHandlerURL } from "@/hooks/useCategoryURL";
import { useFilterMeals } from "@/hooks/useFilterMeals";
import MealsCards from "./MealsCards";
import DishCardSkeleton from "@/app/(GridTemplate)/meals/DishCardSkeleton";

export default function ProductsPage() {
  const { filterMeals, isLoading, queryKey } = useFilterMeals();

  const onChange = useCategoryHandlerURL();

  return (
    <section className="">
      <header className="mb-4">
        <h1 className="text-3xl font-bold mb-4">Products Management</h1>
        <div className="flex flex-col md:flex-row  w-full gap-4">
          <SearchInput />
          <div className="flex gap-4 flex-shrink-0">
            <CategoriesSelecter onChange={onChange} />
            <Button asChild>
              <Link href={URL_PATHS.PRODUCT.CREATE}>
                Add Product
                <Plus className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      {isLoading ? (
        <GridTemplate>
          {new Array(8).fill(0).map((_, key) => (
            <DishCardSkeleton key={key} />
          ))}
        </GridTemplate>
      ) : (
        <MealsCards meals={filterMeals} Invalidatekey={queryKey} />
      )}
    </section>
  );
}
