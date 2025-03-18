import { GridItem, GridTemplate } from "@/components/share";
import { URL_PATHS } from "@/constants";
import { fetchCategories } from "@/lib/data";

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
