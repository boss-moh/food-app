import { GridItem, GridTemplate } from "@/components/share";
import { Button } from "@/components/ui/button";
import { DynamicProps, URL_PATHS } from "@/constants";
import { fetchCategoryById, fetchProductsById } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = async ({ params }: DynamicProps<"categoryId">) => {
  const categoryId = (await params).categoryId;
  const category = await fetchCategoryById(categoryId);
  const products = await fetchProductsById(categoryId);

  if (!category)
    return (
      <div className="container mx-auto py-20 text-center">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2 ">Category Not Found </h1>
          <p className="mb-6 text-lg">
            The category you are looking for does not exist.
          </p>
        </header>
        <Button asChild>
          <Link href={URL_PATHS.CATEGORIES}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>
      </div>
    );

  const { name, count } = category;
  return (
    <div className="container mx-auto py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 ">{name} Category </h1>
        {count ? <p>there are ({count}) items in this Category </p> : null}
      </header>

      {products.length ? (
        <GridTemplate>
          {products.map((product) => (
            <GridItem
              {...product}
              subText={`${product.price}`}
              key={product.id}
              href={URL_PATHS.PRODUCTS(categoryId, product.id)}
              imageUrl={product.imageUrl!}
            />
          ))}
        </GridTemplate>
      ) : (
        <div className="text-center w-full py-16  rounded-lg">
          <div className=" mx-auto">
            <h2 className="text-2xl font-semibold mb-2">
              No products available yet
            </h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re working hard to add more delicious items to this
              category. Check back soon for exciting new products!
            </p>
            <Button asChild>
              <Link href={URL_PATHS.CATEGORIES}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Categories
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
