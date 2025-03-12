import { mealsType } from "@/lib";

export const getFilterMeals = (meals: mealsType, query: string) => {
  if (!query) return meals;
  const filterMeals = meals.filter((meal) => {
    if (meal.description.toLowerCase().includes(query)) return true;
    if (meal.name.toLowerCase().includes(query)) return true;

    return false;
  });

  return filterMeals;
};
