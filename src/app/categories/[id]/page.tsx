import { Card, CardContent } from "@/components/ui/card";
import { DynamicProps } from "@/constants";
import { fetchCategoryById, fetchProductsById } from "@/lib/data";
import Image from "next/image";

const page = async ({ params }: DynamicProps) => {
  const id = (await params).id;
  const category = await fetchCategoryById(id);
  const products = await fetchProductsById(id);
  // console.log("category", category);
  const { name, imageUrl, count } = category!;
  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
        <CardContent className="p-0">
          <div className="aspect-square relative">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover"
            />
            {/* <div className="absolute inset-0   opacity-0 " /> */}
            <div className="absolute inset-0 bg-black/40   group-hover:opacity-100 transition-all opacity-0 flex flex-col items-center justify-center text-white">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm">{count} recipes</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
};

export default page;
