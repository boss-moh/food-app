import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchMenu } from "@/lib";
import { formatPrice } from "@/utils";
import { Plus } from "lucide-react";
import Image from "next/image";
import { GridTemplate, SearchInput } from "@/components/share";
import Link from "next/link";
import { URL_PATHS } from "@/constants";
export default async function ProductsPage() {
  const meals = await fetchMenu();
  return (
    <section className="">
      <header className="mb-4">
        <h1 className="text-3xl font-bold mb-4">Products Management</h1>
        <div className="flex flex-col md:flex-row  w-full gap-4">
          <SearchInput />
          <div className="flex gap-4 flex-shrink-0">
            <Select defaultValue="all">
              <SelectTrigger className="">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="pasta">Pasta</SelectItem>
                <SelectItem value="pizza">Pizza</SelectItem>
                <SelectItem value="desserts">Desserts</SelectItem>
                <SelectItem value="drinks">Drinks</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <Link href={URL_PATHS.PRODUCT.CREATE}>
                Add Product
                <Plus className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
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
              <p className="text-sm text-muted-foreground ">
                category:
                <span className="text-sm font-medium text-black">
                  {" "}
                  {meal.category.name}
                </span>
              </p>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Edit
              </Button>
              <Button variant="outline" className="flex-1">
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </GridTemplate>
    </section>
  );
}
