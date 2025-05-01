import AddToFavorties from "@/app/(GridTemplate)/categories/[categoryId]/[productId]/AddToFavorties";
import { AddToOrderButton } from "@/components/share";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { URL_PATHS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { userType } from "../page";

type FavoritesSectionProps = {
  user: userType;
};
export const FavoritesSection = ({ user }: FavoritesSectionProps) => {
  const hasFavoritesItems = user.favoriteItems.length > 0;
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Favorite Items</CardTitle>
          <CardDescription>Products you&apos;ve saved</CardDescription>
        </CardHeader>
        <CardContent>
          {!hasFavoritesItems ? (
            <p className="text-muted-foreground text-center py-6">
              You don&apos;t have any favorite items yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.favoriteItems.map((item) => (
                <article
                  key={item.id}
                  className="border rounded-lg p-4  space-y-2"
                >
                  <div className="flex justify-between ">
                    <Button asChild className="px-0 py-0 " variant="link">
                      <Link
                        href={URL_PATHS.MENU.GET_PRODUCT(
                          item.categoryId,
                          item.id
                        )}
                      >
                        <h4 className="font-medium"> #{item.name}</h4>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="px-0 py-0 text-foreground"
                      variant="link"
                    >
                      <Link
                        href={URL_PATHS.MENU.GET_PRODUCT(
                          item.categoryId,
                          item.id
                        )}
                      >
                        View
                      </Link>
                    </Button>
                  </div>

                  <div className="flex gap-2 items-center ">
                    <div className="flex-grow-0 ">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={120}
                        height={120}
                        className=" object-cover size-16"
                      />
                    </div>
                    <div className="flex-grow gap-2 justify-end flex">
                      <AddToOrderButton
                        item={{
                          product: item,
                          price: item.price,
                          quantity: 1,
                        }}
                      />

                      <AddToFavorties id={item.id} isLikeItBefore />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default FavoritesSection;
