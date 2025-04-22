import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import FormCreate from "./FormCreate";

export default function Page() {
  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold">Create New Category</h2>
      </div>
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
        </CardHeader>
        <FormCreate />
      </Card>
    </>
  );
}
