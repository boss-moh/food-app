import { SearchInput, CategoriesSelecter, Meals } from "@/components/share";
import { categoryType, searchParamsProps } from "@/constants";
import { fetchCategories, fetchProductsById } from "@/lib";
import { makeOptions } from "@/utils";
import { getFilterMeals } from "@/utils/getFilterMeals";

export default async function MealsPage({
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
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <SearchInput />
        <CategoriesSelecter defaultValue="all" options={options} />
      </div>
      <Meals meals={filterMeals} />
    </div>
  );
}
