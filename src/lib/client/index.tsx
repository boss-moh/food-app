"use client";
import { categoryType } from "@/constants";
import { API_END_POINT } from "@/constants/api";
import { useQuery, axios } from "@/lib";

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
