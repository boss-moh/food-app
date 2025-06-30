import { GridTemplate } from "@/components/share";
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
import Image from "next/image";
import Link from "next/link";
import AvailableControl from "./AvailableControl";
import { DeleteProduct } from "./DeleteProduct";

type MealsCardsProps = {
  meals: mealsType;
};

export const MealsCards = ({ meals }: MealsCardsProps) => {
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
              <span className="text-sm font-medium ">{meal.category.name}</span>
            </p>

            <AvailableControl id={meal.id} isAvailable={meal.isAvailable} />
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button asChild variant="outline" className="flex-1">
              <Link href={URL_PATHS.CHEF.PRODUCT.EDIT(meal.id)}>Edit</Link>
            </Button>
            <DeleteProduct id={meal.id} />
          </CardFooter>
        </Card>
      ))}
    </GridTemplate>
  );
};

export default MealsCards;
