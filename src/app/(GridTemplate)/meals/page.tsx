"use client";
import { GridTemplate, SearchInput } from "@/components/share";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoriy, useMeals } from "@/lib";
import Meals from "./Meals";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DishCardSkeleton from "./DishCardSkeleton";

export default function MealsPage() {
  const { categories, isLoading, isError } = useCategoriy();
  const mealsData = useMeals();

  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selecetedCategoryID = searchParams.get("categoryId");
  const selecetedCategory = categories?.find(
    (category) => category.id == selecetedCategoryID
  );

  const handleChangeCategory = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId === "all") {
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
        <Select onValueChange={handleChangeCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue
              placeholder={selecetedCategory?.name ?? "All Categories"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>

            {isLoading ? (
              "loading..."
            ) : isError ? (
              "Error..."
            ) : categories?.length == 0 ? (
              <p>There Are No categories</p>
            ) : (
              categories?.map((category) => (
                <SelectItem
                  className="capitalize"
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      {mealsData.isLoading ? (
        <GridTemplate>
          {new Array(8).fill(0).map((_, key) => (
            <DishCardSkeleton key={key} />
          ))}
        </GridTemplate>
      ) : (
        <Meals meals={mealsData.meals} />
      )}
    </div>
  );
}

export { MealsPage };
