import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { CategoriesSelecter, SearchInput } from "@/components/share";
import Link from "next/link";
import { categoryType, searchParamsProps, URL_PATHS } from "@/constants";
import MealsCards from "./MealsCards";
import { fetchCategories, fetchProductsById } from "@/lib";
import { getFilterMeals, makeOptions } from "@/utils";

export default async function ProductsPage({
  searchParams,
}: searchParamsProps<"categoryId"> & searchParamsProps<"query">) {
  const categoryId = (await searchParams).categoryId;
  const query = (await searchParams).query;

  const [categories, meals] = await Promise.all([
    fetchCategories(),
    fetchProductsById(categoryId),
  ]);

  const filterMeals = getFilterMeals(meals, query);

  const options = makeOptions<categoryType>(categories, (i) => ({
    name: i.name,
    value: i.id,
  }));

  return (
    <section className="">
      <header className="mb-4">
        <h1 className="text-3xl font-bold mb-4">Products Management</h1>
        <div className="flex flex-col md:flex-row  w-full gap-4">
          <SearchInput />
          <div className="flex gap-4 flex-shrink-0">
            <CategoriesSelecter options={options} defaultValue="All" />
            <Button asChild>
              <Link href={URL_PATHS.PRODUCT.CREATE}>
                Add Product
                <Plus className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      {/* {isLoading ? (
        <GridTemplate>
          {new Array(8).fill(0).map((_, key) => (
            <DishCardSkeleton key={key} />
          ))}
        </GridTemplate>
      ) : (
        <MealsCards meals={filterMeals} Invalidatekey={queryKey} />
      )} */}

      <MealsCards meals={filterMeals} Invalidatekey={["queryKey"]} />
    </section>
  );
}
