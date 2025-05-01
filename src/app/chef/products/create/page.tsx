import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductForm from "./Form";
import { fetchCategories } from "@/lib";
import { makeOptions } from "@/utils";
import { categoryType } from "@/constants";

const CreatProductPage = async () => {
  const categories = await fetchCategories();
  const options = makeOptions<categoryType>(
    categories,
    (i) => ({ name: i.name, value: i.id }),
    false
  );

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-5xl">
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm categories={options} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatProductPage;
