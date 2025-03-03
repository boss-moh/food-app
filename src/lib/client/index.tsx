"use client";
import { categoryType } from "@/constants";
import { API_END_POINT } from "@/constants/api";
import { useQuery, axios, mealsType } from "@/lib";
import { useSearchParams } from "next/navigation";

export const useCategoriy = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<categoryType[]>({
    queryKey: ["categories"],
    queryFn: async () => await axios.get(API_END_POINT.GET_CATEGORIES),
    staleTime: Infinity,
  });

  return {
    categories: categories ?? [],
    isLoading,
    isError,
  };
};

export const useMeals = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") || "";
  console.log("categoryId from hook ", categoryId);
  const {
    data: meals,
    isPending,
    isError,
  } = useQuery<mealsType>({
    queryKey: ["meals", categoryId || "all"],
    queryFn: async () => await axios.get(API_END_POINT.GET_MEALS(categoryId)),
  });
  console.log("meals inside hook", meals);

  return {
    meals: meals ?? [],
    isLoading: isPending,
    isError,
  };
};
