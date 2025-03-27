import { fetchProducts } from "@/lib/data/admin";
import { ClientContent } from "./ClientContent";

type ServerFetchingProps = {
  query: string;
  categoryId: string;
};
export const ServerFetching = async ({
  query,
  categoryId,
}: ServerFetchingProps) => {
  const meals = await fetchProducts(query, categoryId);
  return <ClientContent meals={meals} />;
};
