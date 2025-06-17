import { categoryType, searchParamsProps } from "@/constants";

import { fetchCategories } from "@/lib";
import { makeOptions } from "@/utils";
import { Suspense } from "react";
import { ServerFetching } from "./ServerFetching";
import FilterSection from "./FilterSection";

export type ProductsPageProps = searchParamsProps<"categoryId"> &
  searchParamsProps<"query">;

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { categoryId, query } = await searchParams;

  const categories = await fetchCategories();

  const options = makeOptions<categoryType>(categories, (i) => ({
    name: i.name,
    value: i.id,
  }));

  return (
    <section className="">
      <header className="mb-4">
        <h1 className="text-3xl font-bold mb-4">Products Management</h1>
        <FilterSection options={options} />
      </header>
      <Suspense fallback={"loading ... "}>
        <ServerFetching categoryId={categoryId} query={query} />
      </Suspense>
    </section>
  );
}
