"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Mighty Super Cheesecake",
    description: "Creamy and smooth cheesecake topped with fresh berries",
    price: 8.99,
    image: "/placeholder.svg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Spinach and Cheese Pasta",
    description: "Fresh pasta tossed with spinach and melted cheese",
    price: 12.99,
    image: "/placeholder.svg",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Berry Bliss Smoothie",
    description: "Blend of fresh berries, yogurt, and honey",
    price: 6.99,
    image: "/placeholder.svg",
    rating: 4.7,
  },
  // Add more products as needed
];

export default function BuyPage() {
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

  const addToCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { id: productId, quantity: 1 }];
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-64">
          <Input placeholder="Search products..." className="mb-4" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
              <SelectItem value="main-courses">Main Courses</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="relative aspect-video">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="flex justify-between items-center mb-2">
                  <span>{product.name}</span>
                  <span className="text-lg font-normal">
                    ${product.price.toFixed(2)}
                  </span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <Button size="lg" className="rounded-full">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Button>
      </div>
    </div>
  );
}
