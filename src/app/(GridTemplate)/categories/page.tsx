import { GridItem, GridTemplate } from "@/components/share";
import { URL_PATHS } from "@/constants";
import { fetchCategories } from "@/data";

export const metadata = {
  title: "Meals Page | TastyGo",
  description:
    "Explore our delicious menu with a variety of meals to choose from.",
};

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Food Categories </h1>

      <GridTemplate>
        {categories.map((category) => (
          <GridItem
            key={category.id}
            href={URL_PATHS.MENU.CATEGORIY(category.id)}
            {...category}
            subText={`${category.count} recipes `}
          />
        ))}
      </GridTemplate>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}
