import { Card, CardContent } from "@/components/ui/card";
import { URL_PATHS } from "@/constants";
import { fetchCategories } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await fetchCategories();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Food Categories</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.id} href={URL_PATHS.CATEGORIY(category.id)}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={category.imageUrl || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  {/* <div className="absolute inset-0   opacity-0 " /> */}
                  <div className="absolute inset-0 bg-black/40   group-hover:opacity-100 transition-all opacity-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm">{category.count} recipes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
