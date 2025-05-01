import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import FormEdit from "./EditForm";
import { DynamicProps } from "@/constants";
import { fetchCategoryById } from "@/lib";
import NotFound from "@/app/not-found";
export default async function EditPage({ params }: DynamicProps<"categoryId">) {
  const { categoryId } = await params;

  const category = await fetchCategoryById(categoryId);
  if (!category) {
    NotFound();
  }
  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold">Edit Category information </h2>
      </div>
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
        </CardHeader>
        <FormEdit defaultValues={category!} />
      </Card>
    </>
  );
}
