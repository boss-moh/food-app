import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { fetchUser } from "@/lib";
import { AddToOrderButton, FeedItem } from "@/components/share";
import { DynamicProps, URL_PATHS } from "@/constants";
import AddToFavorties from "../../(GridTemplate)/categories/[categoryId]/[productId]/AddToFavorties";
import Image from "next/image";
import Link from "next/link";

export default async function UserProfile({ params }: DynamicProps<"userId">) {
  // Get initials for avatar fallback
  const userId = (await params).userId;

  const user = await fetchUser(userId);

  if (!user) throw "There is No user";

  return (
    <div className="container mx-auto py-10 flex flex-col gap-8">
      {/* Profile Header */}

      {/* Personal Info Tab */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Your account details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Full Name
              </h3>
              <p className="text-base">{user.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Email
              </h3>
              <p className="text-base">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Phone
              </h3>
              <p className="text-base">{user.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Account Type
              </h3>
              <p className="text-base">{user.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Feedback</CardTitle>
          <CardDescription>
            Reviews you&apos;ve left on products
          </CardDescription>
        </CardHeader>
        <CardContent>
          ~~
          {user.feedback.length ? (
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {user.feedback.map((feed) => (
                <FeedItem
                  feed={{
                    ...feed,
                    customerId: user.id,
                    customer: { name: user.name },
                  }}
                  key={feed.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-6">
              You haven&apos;t left any feedback yet.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Orders Tab */}

      {/* Favorites Tab */}
      <Card>
        <CardHeader>
          <CardTitle>Favorite Items</CardTitle>
          <CardDescription>Products you&apos;ve saved</CardDescription>
        </CardHeader>
        <CardContent>
          {user.favoriteItems.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </section>
          ) : (
            <p className="text-muted-foreground text-center py-6">
              You don&apos;t have any favorite items yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
