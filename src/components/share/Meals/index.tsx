import { AddToOrderButton, GridTemplate, Status } from "@/components/share";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { URL_PATHS } from "@/constants";
import { mealsType } from "@/lib";
import { formatPrice } from "@/utils";
import { Clock, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export const Meals = ({ meals }: { meals: mealsType }) => {
  if (!meals.length)
    return (
      <p className="text-center text-muted-foreground mt-8">
        No meals found. Try adjusting your search or category.
      </p>
    );
  return (
    <GridTemplate>
      {meals.map((meal) => (
        <Card key={meal.id} className="overflow-hidden flex flex-col">
          <div className="relative aspect-video">
            <Image
              src={meal.imageUrl}
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
            <div className="flex justify-between gap-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Utensils className="h-4 w-4" />
                  <span>{meal.category.name}</span>
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{meal.prepTime}</span>
                </p>
              </div>
              <Status status={meal.isAvailable ? "DONE" : "REJECTED"}>
                {meal.isAvailable ? "Available" : "Not Available"}
              </Status>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <AddToOrderButton
              item={{ product: meal, quantity: 1, price: meal.price }}
            />
            <Button asChild variant={"outline"}>
              <Link href={URL_PATHS.MENU.GET_PRODUCT(meal.categoryId, meal.id)}>
                View
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </GridTemplate>
  );
};

export default Meals;
