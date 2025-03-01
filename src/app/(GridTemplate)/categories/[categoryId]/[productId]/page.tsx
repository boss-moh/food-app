import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DynamicProps } from "@/constants";
import { ActionsButtons } from "./Actions";
import { fetchProductById } from "@/lib/data";

export default async function ProductPage({
  params,
}: DynamicProps<"productId">) {
  const productId = (await params).productId;

  const product = await fetchProductById(productId);

  if (!product) return "there is no product";
  const { imageUrl, name, price, description } = product!;

  return (
    <div className="container mx-auto py-10">
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              width={600}
              height={600}
              className="w-full object-cover h-full"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{name}</CardTitle>
              {/* <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.rating})
                </span>
              </div> */}
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mt-4">${price.toFixed(2)}</p>
              <p className="mt-4 text-muted-foreground">{description}</p>

              <Separator className="my-6" />

              <ActionsButtons />
            </CardContent>
          </div>
        </div>
      </Card>
      {/* <div className="mt-12 grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nutritional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Calories: {product.nutritionalInfo.calories}</p>
              <p>Fat: {product.nutritionalInfo.fat}g</p>
              <p>Carbs: {product.nutritionalInfo.carbs}g</p>
              <p>Protein: {product.nutritionalInfo.protein}g</p>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
