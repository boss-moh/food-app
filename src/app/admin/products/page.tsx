import { Button } from "@/components/ui/button";

import { fetchCategories, fetchMenu } from "@/lib";
import { Plus } from "lucide-react";
import { SearchInput, Selecter } from "@/components/share";
import Link from "next/link";
import { URL_PATHS } from "@/constants";
import MealsCards from "./MealsCards";
export default async function ProductsPage() {
  const [meals, categories] = await Promise.all([
    fetchMenu(),
    fetchCategories(),
  ]);

  const options = [
    {
      name: "All",
      value: "All",
    },
    ...categories.map((item) => ({
      name: item.name,
      value: item.id,
    })),
  ];
  return (
    <section className="">
      <header className="mb-4">
        <h1 className="text-3xl font-bold mb-4">Products Management</h1>
        <div className="flex flex-col md:flex-row  w-full gap-4">
          <SearchInput />
          <div className="flex gap-4 flex-shrink-0">
            <Selecter options={options} defaultValue={options[0].value} />
            <Button asChild>
              <Link href={URL_PATHS.PRODUCT.CREATE}>
                Add Product
                <Plus className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <MealsCards meals={meals} />
    </section>
  );
}
