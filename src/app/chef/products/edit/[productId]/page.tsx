import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchCategories, fetchProductById } from "@/lib";
import { makeOptions } from "@/utils";
import { categoryType, DynamicProps, editProductType } from "@/constants";
import ProductForm from "./Form";

const CreatProductPage = async ({ params }: DynamicProps<"productId">) => {
  const productId = (await params).productId;
  const categories = await fetchCategories();
  const productValues = (await fetchProductById(productId)) as editProductType;
  const options = makeOptions<categoryType>(
    categories,
    (i) => ({ name: i.name, value: i.id }),
    false
  );

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-5xl">
        <CardHeader>
          <CardTitle>Edit Info Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm categories={options} defaultValues={productValues} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatProductPage;
