import { GridTemplate } from "@/components/share";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { URL_PATHS } from "@/constants";
import { fetchCategories } from "@/lib";
import Image from "next/image";
import Link from "next/link";
import DeleteCategory from "./DeleteCategory";

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <Card>
      <CardHeader className="mb-4 flex flex-row justify-between gap-4 items-center  ">
        <div>
          <h2 className="text-2xl font-bold ">Categories</h2>
          <p className="font-semibold text-sm text-gray-600 ">
            Manage your food categories
          </p>
        </div>
        <Button asChild>
          <Link href={URL_PATHS.CHEF.CATEGORIE.CREATE}>Create Category</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <GridTemplate>
          {categories.map((i) => (
            <Card key={i.id} className="overflow-hidden flex flex-col">
              <div className="relative aspect-video">
                <Image
                  src={i.imageUrl!}
                  alt={i.name}
                  className="object-cover"
                  fill
                />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{i.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground ">
                  Items Count:
                  <span className="text-sm font-medium text-black">
                    {i.count}
                  </span>
                </p>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link href={URL_PATHS.CHEF.CATEGORIE.EDIT(i.id)}>Edit</Link>
                </Button>

                <DeleteCategory id={i.id} />
              </CardFooter>
            </Card>
          ))}
        </GridTemplate>
      </CardContent>
    </Card>
  );
}
