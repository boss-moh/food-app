import { ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { fetchDishesBaseOn } from "@/lib";
import { GridItem, GridTemplate } from "@/components/share";
import LandingImage from "localImages/newLanding.webp";
import { Button } from "@/components/ui/button";
import { URL_PATHS } from "@/constants";

export default async function Home() {
  const [topRatings, latestDishes] = await Promise.all([
    fetchDishesBaseOn("rating"),
    fetchDishesBaseOn("createdAt"),
  ]);
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square w-full py-5">
            <Image
              src={LandingImage}
              alt="Mighty Super Cheesecake"
              className="object-cover rotate-180"
              fill
              priority
            />
          </div>
          <div className="bg-primary/5 p-8 lg:p-12 rounded-2xl">
            <div className="flex items-center gap-2 text-sm mb-4 text-primary">
              <TrendingUp className="h-4 w-4" />
              <span>85% would make this again</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Mighty Super Cheesecake
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Look no further for a creamy and ultra smooth classic cheesecake
              recipe! No one can deny its simple decadence.
            </p>
            <Button asChild>
              <Link href={URL_PATHS.MEALS} className="inline-flex items-center">
                View Recipe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Top Rating Delicious</h2>
          <GridTemplate>
            {topRatings.map((dish) => (
              <GridItem
                key={dish.id}
                href={URL_PATHS.PRODUCTS(dish.categoryId, dish.id)}
                {...dish}
                subText={`Rating : ${dish.rating}`}
              />
            ))}
          </GridTemplate>
        </div>
      </section>

      {/* Latest Recipes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest Recipes</h2>
          <GridTemplate>
            {latestDishes.map((dish) => (
              <GridItem
                key={dish.id}
                href={URL_PATHS.PRODUCTS(dish.categoryId, dish.id)}
                {...dish}
                subText={`Rating : ${dish.rating}`}
              />
            ))}
          </GridTemplate>
        </div>
      </section>
    </div>
  );
}
