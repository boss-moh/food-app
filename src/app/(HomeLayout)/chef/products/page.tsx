//# TODO:fetch again after delete

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { CategoriesSelecter, SearchInput } from "@/components/share";
import Link from "next/link";
import { categoryType, searchParamsProps, URL_PATHS } from "@/constants";

import { fetchCategories } from "@/lib";
import { makeOptions } from "@/utils";
import { Suspense } from "react";
import { ServerFetching } from "./ServerFetching";

export type ProductsPageProps = searchParamsProps<"categoryId"> &
  searchParamsProps<"query">;

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const categoryId = (await searchParams).categoryId;
  const query = (await searchParams).query;

  const categories = await fetchCategories();

  const options = makeOptions<categoryType>(categories, (i) => ({
    name: i.name,
    value: i.id,
  }));

  return (
    <section className="">
      <header className="mb-4">
        <h1 className="text-3xl font-bold mb-4">Products Management</h1>
        <div className="flex flex-col md:flex-row  w-full gap-4">
          <SearchInput />
          <div className="flex gap-4 flex-shrink-0">
            <CategoriesSelecter options={options} defaultValue="all" />
            <Button asChild>
              <Link href={URL_PATHS.ADMIN.PRODUCT.CREATE}>
                Add Product
                <Plus className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <Suspense fallback={"loading ... "}>
        <ServerFetching categoryId={categoryId} query={query} />
      </Suspense>
    </section>
  );
}
