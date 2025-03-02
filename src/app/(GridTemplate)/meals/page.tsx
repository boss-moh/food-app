import { AddToOrderButton, GridTemplate } from "@/components/share";
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
import { URL_PATHS } from "@/constants";
import { fetchMenu } from "@/lib";
import { formatPrice } from "@/utils";
import { Clock, Search, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MealsPage() {
  const meals = await fetchMenu();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search meals..." className="pl-8 w-full" />
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
      <GridTemplate>
        {meals.map((meal) => (
          <Card key={meal.id} className="overflow-hidden flex flex-col">
            <div className="relative aspect-video">
              <Image
                src={meal.imageUrl || "/placeholder.svg"}
                alt={meal.name}
                className="object-cover"
                fill
              />
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{meal.name}</span>
                <span className="text-lg font-normal">
                  {formatPrice(meal.price)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">
                {meal.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Utensils className="h-4 w-4" />
                  <span>{meal.category.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{meal.prepTime}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <AddToOrderButton />
              <Button asChild variant={"outline"}>
                <Link href={URL_PATHS.MENU.GET_DISH(meal.categoryId, meal.id)}>
                  View
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </GridTemplate>
    </div>
  );
}
