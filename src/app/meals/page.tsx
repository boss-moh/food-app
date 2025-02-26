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
import { Clock, Search, Utensils } from "lucide-react";
import Image from "next/image";

const meals = [
  {
    id: 1,
    name: "Mighty Super Cheesecake",
    description: "Creamy and smooth cheesecake topped with fresh berries",
    price: 8.99,
    category: "Desserts",
    prepTime: "20 mins",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Spinach and Cheese Pasta",
    description: "Fresh pasta tossed with spinach and melted cheese",
    price: 12.99,
    category: "Pasta",
    prepTime: "25 mins",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Berry Bliss Smoothie",
    description: "Blend of fresh berries, yogurt, and honey",
    price: 6.99,
    category: "Drinks",
    prepTime: "10 mins",
    image: "/placeholder.svg",
  },
  // Add more meals as needed
];

export default function MealsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search meals..." className="pl-8" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="pasta">Pasta</SelectItem>
            <SelectItem value="desserts">Desserts</SelectItem>
            <SelectItem value="drinks">Drinks</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meals.map((meal) => (
          <Card key={meal.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={meal.image || "/placeholder.svg"}
                alt={meal.name}
                className="object-cover"
                fill
              />
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{meal.name}</span>
                <span className="text-lg font-normal">
                  ${meal.price.toFixed(2)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {meal.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Utensils className="h-4 w-4" />
                  <span>{meal.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{meal.prepTime}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to Order</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
