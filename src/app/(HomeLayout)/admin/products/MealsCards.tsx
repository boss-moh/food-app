import { GridTemplate, Status } from "@/components/share";
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
import DeleteAction from "@/components/share/DeleteAction";
import ChangeAvaliable from "./ChangeAvaliable";

type MealsCardsProps = {
  meals: mealsType;
  onDelete: (id: string) => void;
  onChangeAvaliable: (id: string) => void;
};
export const MealsCards = ({
  meals,
  onDelete,
  onChangeAvaliable,
}: MealsCardsProps) => {
  if (!meals.length)
    return (
      <p className="text-center text-muted-foreground mt-8">
        No meals found. Try adjusting your search or category.
      </p>
    );

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
              <article
                aria-label=" Available"
                className="flex justify-between gap-2"
              >
                <Status status={meal.isAvailable ? "DONE" : "REJECTED"}>
                  {meal.isAvailable ? "" : "not"}
                  Available
                </Status>
                <ChangeAvaliable
                  onSuccess={onChangeAvaliable}
                  id={meal.id}
                  isAvailable={meal.isAvailable}
                />
              </article>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link
                  href={{
                    pathname: URL_PATHS.ADMIN.PRODUCT.CREATE,
                    query: {
                      data: formatData,
                    },
                  }}
                >
                  Edit
                </Link>
              </Button>
              <DeleteAction
                url={API_END_POINT.PRODUCT.DELETE(meal.id)}
                onSuccess={() => onDelete(meal.id)}
              />
            </CardFooter>
          </Card>
        );
      })}
    </GridTemplate>
  );
};

export default MealsCards;
