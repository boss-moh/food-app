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

  const placeholder = isLoading ? "loading ... " : isError ? "Error" : "";

  return {
    categories: categories ?? [],
    isLoading,
    isError,
    placeholder,
  };
};

export const useMeals = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") || "";
  const queryKey = ["meals", categoryId || "all"];
  const {
    data: meals,
    isPending,
    isError,
  } = useQuery<mealsType>({
    queryKey,
    queryFn: async () => await axios.get(API_END_POINT.GET_MEALS(categoryId)),
  });

  return {
    meals: meals ?? [],
    isLoading: isPending,
    isError,
    queryKey,
  };
};
