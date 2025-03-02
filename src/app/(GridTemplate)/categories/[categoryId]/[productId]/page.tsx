import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DynamicProps } from "@/constants";
import { ActionsButtons } from "./Actions";
import { fetchProductById } from "@/lib/data";
import Rating from "./rating";
import { Clock, Utensils } from "lucide-react";
import { formatPrice } from "@/utils";

export default async function ProductPage({
  params,
}: DynamicProps<"productId">) {
  const productId = (await params).productId;

  const product = await fetchProductById(productId);

  if (!product) return "there is no product";
  const { imageUrl, name, price, description, rating, nutritionalInfo } =
    product!;

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
              <div className="flex justify-between items-center">
                <Rating rating={rating} />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Utensils className="h-4 w-4" />
                    <span>{product.category.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{product.prepTime}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-2xl font-bold mt-4">{formatPrice(price)}</p>
              <p className="mt-4 text-muted-foreground">{description}</p>

              <Separator className="my-6" />

              <ActionsButtons />
            </CardContent>
          </div>
        </div>
      </Card>
      <div className="mt-12 grid md:grid-cols-2 gap-8">
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
              {nutritionalInfo.map((info, index) => (
                <p key={index}>{info}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
