"use client";
import { useEffect, useState } from "react";
import MealsCards from "./MealsCards";
import { fetchProducts } from "@/lib/data/admin";

type ClientContentProps = {
  meals: Awaited<ReturnType<typeof fetchProducts>>;
};
export const ClientContent = ({ meals }: ClientContentProps) => {
  const [mealsList, setMealsList] = useState(meals);
  const handleDelete = (id: string) => {
    const newMealsList = mealsList.filter((meal) => meal.id !== id);
    setMealsList(newMealsList);
  };

  useEffect(() => {
    setMealsList(meals);
  }, [meals]);

  const handleChangeAvaliable = (id: string) => {
    const newMealsList = mealsList.map((meal) =>
      meal.id === id ? { ...meal, isAvailable: !meal.isAvailable } : meal
    );
    setMealsList(newMealsList);
  };

  return (
    <MealsCards
      meals={mealsList}
      onDelete={handleDelete}
      onChangeAvaliable={handleChangeAvaliable}
    />
  );
};
