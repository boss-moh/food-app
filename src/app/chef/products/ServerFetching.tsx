import { fetchProducts } from "@/data/admin";
import MealsCards from "./_components/MealsCards";

type ServerFetchingProps = {
  query: string;
  categoryId: string;
};
export const ServerFetching = async ({
  query,
  categoryId,
}: ServerFetchingProps) => {
  const meals = await fetchProducts(query, categoryId);
  return <MealsCards meals={meals} />;
};
