import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductForm from "./Form";

const CreatProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ data: string }>;
}) => {
  const data = (await searchParams).data ?? null;
  const values = JSON.parse(decodeURIComponent(data));

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
        </CardHeader>
        <CardContent>
          {!!values ? (
            <ProductForm defaultValues={values} isEditMode={!!data} />
          ) : (
            <ProductForm />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatProductPage;
