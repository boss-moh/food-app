import { Meals } from "@/components/share";
import { searchProps } from "@/constants";
import { fetchSearchedProducts } from "@/data/gloable";

export const ServerFetch = async ({ query, categoryId }: searchProps) => {
  const meals = await fetchSearchedProducts(query, categoryId);
  return <Meals meals={meals} />;
};

export default ServerFetch;
