import { GridTemplate } from "@/components/share";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_END_POINT, URL_PATHS } from "@/constants";
import { mealsType } from "@/lib";
import { formatPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import DeleteAction from "./DeleteAction";

export const MealsCards = ({ meals }: { meals: mealsType }) => {
  return (
    <GridTemplate>
      {meals.map((meal) => {
        const formatData = encodeURIComponent(JSON.stringify(meal));
        return (
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
              <Button asChild variant="outline" className="flex-1">
                <Link
                  href={{
                    pathname: URL_PATHS.PRODUCT.CREATE,
                    query: {
                      data: formatData,
                    },
                  }}
                >
                  Edit
                </Link>
              </Button>
              <DeleteAction url={API_END_POINT.PRODUCT.DELETE(meal.id)} />
            </CardFooter>
          </Card>
        );
      })}
    </GridTemplate>
  );
};

export default MealsCards;
