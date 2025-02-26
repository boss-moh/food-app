import { ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LandingImage from "localImages/landing.png";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square w-full">
            <Image
              src={LandingImage}
              alt="Mighty Super Cheesecake"
              className="object-cover"
              fill
              priority
            />
          </div>
          <div className="bg-blue-50 p-8 lg:p-12">
            <div className="flex items-center gap-2 text-sm mb-4">
              <TrendingUp className="h-4 w-4" />
              <span>85% would make this again</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Mighty Super Cheesecake</h1>
            <p className="text-gray-600 text-lg mb-6">
              Look no further for a creamy and ultra smooth classic cheesecake
              recipe! no one can deny its simple decadence.
            </p>
            <Link
              href="/recipes/cheesecake"
              className="inline-flex items-center text-primary hover:underline"
            >
              View Recipe
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Super Delicious</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="object-cover transition-transform group-hover:scale-105"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-medium">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Recipes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest Recipes</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => (
              <Link
                key={recipe.name}
                href={recipe.href}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.name}
                    className="object-cover transition-transform group-hover:scale-105"
                    fill
                  />
                </div>
                <h3 className="font-medium group-hover:text-primary">
                  {recipe.name}
                </h3>
                <p className="text-sm text-gray-600">{recipe.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const categories = [
  {
    name: "Spinach and Cheese Pasta",
    description: "Classic Italian comfort food",
    href: "/categories/pasta",
    image: "/placeholder.svg",
  },
  {
    name: "Fresh Glazed Donuts",
    description: "Sweet morning treats",
    href: "/categories/desserts",
    image: "/placeholder.svg",
  },
  {
    name: "Mighty Cherry Breakfast Burger",
    description: "Start your day right",
    href: "/categories/breakfast",
    image: "/placeholder.svg",
  },
];

const recipes = [
  {
    name: "Caramel Strawberry Milkshake",
    category: "Drinks",
    href: "/recipes/strawberry-milkshake",
    image: "/placeholder.svg",
  },
  {
    name: "Chocolate and Banana Jar Cake",
    category: "Desserts",
    href: "/recipes/banana-jar-cake",
    image: "/placeholder.svg",
  },
  {
    name: "Berry Blueberry Biscuit",
    category: "Breakfast",
    href: "/recipes/blueberry-biscuit",
    image: "/placeholder.svg",
  },
  {
    name: "Mighty Super Cheesecake",
    category: "Desserts",
    href: "/recipes/super-cheesecake",
    image: "/placeholder.svg",
  },
];
