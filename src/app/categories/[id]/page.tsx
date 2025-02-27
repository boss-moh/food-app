import { Card, CardContent } from "@/components/ui/card";
import { DynamicProps, URL_PATHS } from "@/constants";
import { fetchCategoryById, fetchProductsById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params }: DynamicProps<"id">) => {
  const id = (await params).id;
  const category = await fetchCategoryById(id);
  const products = await fetchProductsById(id);
  if (!category) return "this is no items ";
  const { name, count } = category;
  return (
    <div className="container mx-auto py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 ">{name} Category </h1>
        <p>there are ({count}) items in this Category </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} href={URL_PATHS.PRODUCTS(id, product.id)}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {/* <div className="absolute inset-0   opacity-0 " /> */}
                  <div className="absolute inset-0 bg-black/40   group-hover:opacity-100 transition-all opacity-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-sm">{product.price} price</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
