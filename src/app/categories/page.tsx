import { Card, CardContent } from "@/components/ui/card";
import { URL_PATHS } from "@/constants";
import { fetchCategories } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

// const categories = [
//   {
//     name: "Seafood",
//     image: "/images/category/seafood.png",
//     href: "/categories/seafood",
//     count: 12,
//   },
//   {
//     name: "Soups",
//     image: "/images/category/soups.png",
//     href: "/categories/soups",
//     count: 8,
//   },
//   {
//     name: "Breakfast",
//     image:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ygq7l8oOKUUxAY9mGTic2LXEMEx7HJ.png",
//     href: "/categories/breakfast",
//     count: 15,
//   },
//   {
//     name: "Meat & Poultry",
//     image: "/images/category/meat.png",
//     href: "/categories/meat",
//     count: 20,
//   },
//   {
//     name: "Pasta",
//     image: "/images/category/seafood.png",
//     href: "/categories/pasta",
//     count: 10,
//   },
//   {
//     name: "Pizza",
//     image:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ygq7l8oOKUUxAY9mGTic2LXEMEx7HJ.png",
//     href: "/categories/pizza",
//     count: 6,
//   },
//   {
//     name: "Pancakes",
//     image: "/images/category/pancakes.png",
//     href: "/categories/pancakes",
//     count: 18,
//   },
//   {
//     name: "Desserts",
//     image:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ygq7l8oOKUUxAY9mGTic2LXEMEx7HJ.png",
//     href: "/categories/desserts",
//     count: 18,
//   },
//   {
//     name: "Burgers",
//     image:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ygq7l8oOKUUxAY9mGTic2LXEMEx7HJ.png",
//     href: "/categories/burgers",
//     count: 8,
//   },
//   {
//     name: "Salads",
//     image:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ygq7l8oOKUUxAY9mGTic2LXEMEx7HJ.png",
//     href: "/categories/salads",
//     count: 14,
//   },
//   {
//     name: "Beverages",
//     image:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ygq7l8oOKUUxAY9mGTic2LXEMEx7HJ.png",
//     href: "/categories/beverages",
//     count: 12,
//   },
//   {
//     name: "Asian",
//     image:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ygq7l8oOKUUxAY9mGTic2LXEMEx7HJ.png",
//     href: "/categories/asian",
//     count: 16,
//   },
//   {
//     name: "Sandwiches",
//     image:
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ygq7l8oOKUUxAY9mGTic2LXEMEx7HJ.png",
//     href: "/categories/sandwiches",
//     count: 9,
//   },
// ];

export default async function CategoriesPage() {
  const categories = await fetchCategories();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Food Categories</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.id} href={URL_PATHS.CATEGORIY(category.id)}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={category.imageUrl || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  {/* <div className="absolute inset-0   opacity-0 " /> */}
                  <div className="absolute inset-0 bg-black/40   group-hover:opacity-100 transition-all opacity-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm">{category.count} recipes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
