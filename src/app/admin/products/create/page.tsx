import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductForm from "./Form";
import { fetchCategories } from "@/lib";
import { makeOptions } from "@/utils";
import { categoryType } from "@/constants";

const CreatProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ data: string }>;
}) => {
  const data = (await searchParams).data ?? null;
  const values = JSON.parse(decodeURIComponent(data));
  const haveData = !!values;

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
          <CardTitle>
            {haveData ? "Edit Info Product" : "Create New Product"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!!values ? (
            <ProductForm
              categories={options}
              defaultValues={values}
              isEditMode={!!data}
            />
          ) : (
            <ProductForm categories={options} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatProductPage;
