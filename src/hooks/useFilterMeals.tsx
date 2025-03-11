import { useMeals } from "@/lib";
import { useSearchParams } from "next/navigation";

export const useFilterMeals = () => {
  const mealsData = useMeals();

  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const filterMeals = !query
    ? mealsData.meals
    : mealsData.meals.filter((meal) => {
        if (meal.description.toLowerCase().includes(query)) return true;
        if (meal.name.toLowerCase().includes(query)) return true;

        return false;
      });

  return { filterMeals, ...mealsData };
};
