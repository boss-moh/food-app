"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";

// This would typically come from an API or database
const product = {
  id: "1",
  name: "Mighty Super Cheesecake",
  description:
    "A creamy and delicious cheesecake topped with fresh berries and a drizzle of berry sauce. This indulgent dessert is perfect for any occasion and will satisfy your sweet tooth cravings.",
  price: 8.99,
  rating: 4.5,
  image: "/placeholder.svg",
  ingredients: [
    "Cream Cheese",
    "Sugar",
    "Eggs",
    "Vanilla Extract",
    "Graham Cracker Crust",
    "Fresh Berries",
  ],
  nutritionalInfo: {
    calories: 350,
    fat: 24,
    carbs: 28,
    protein: 6,
  },
};

export default function ProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity(Math.max(1, quantity + amount));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name}(s) to cart`);
    // Here you would typically update your cart state or send a request to your backend
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full object-cover h-full"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {product.name}
              </CardTitle>
              <div className="flex items-center mt-2">
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
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mt-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="mt-4 text-muted-foreground">
                {product.description}
              </p>
              <Separator className="my-6" />
              <div className="flex items-center mt-6">
                <Label htmlFor="quantity" className="mr-4">
                  Quantity
                </Label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Number.parseInt(e.target.value)))
                    }
                    className="w-16 mx-2 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </CardFooter>
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
              <p>Calories: {product.nutritionalInfo.calories}</p>
              <p>Fat: {product.nutritionalInfo.fat}g</p>
              <p>Carbs: {product.nutritionalInfo.carbs}g</p>
              <p>Protein: {product.nutritionalInfo.protein}g</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
