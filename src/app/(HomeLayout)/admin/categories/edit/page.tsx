import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import EditForm from "./EditForm";
export default function EditPage() {
  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold">Edit Category information </h2>
      </div>
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
        </CardHeader>
        <EditForm />
      </Card>
    </>
  );
}
