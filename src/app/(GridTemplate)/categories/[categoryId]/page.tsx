import { GridItem, GridTemplate } from "@/components/share";
import { DynamicProps, URL_PATHS } from "@/constants";
import { fetchCategoryById, fetchProductsById } from "@/lib/data";

const page = async ({ params }: DynamicProps<"categoryId">) => {
  const categoryId = (await params).categoryId;
  const category = await fetchCategoryById(categoryId);
  const products = await fetchProductsById(categoryId);
  if (!category) return "this is no items ";
  const { name, count } = category;
  return (
    <div className="container mx-auto py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 ">{name} Category </h1>
        <p>there are ({count}) items in this Category </p>
      </header>
      <GridTemplate>
        {products.map((product) => (
          <GridItem
            {...product}
            subText={`${product.price}`}
            key={product.id}
            href={URL_PATHS.PRODUCTS(categoryId, product.id)}
          />
        ))}
      </GridTemplate>
    </div>
  );
};

export default page;
