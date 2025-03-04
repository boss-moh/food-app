import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateProductForm from "./Form";

const CreatProductPage = async () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateProductForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatProductPage;
