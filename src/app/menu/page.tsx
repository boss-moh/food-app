import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {menuItems.map((item) => (
          <Card key={item.id}>
            <div className="relative aspect-[4/3]">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover" fill />
            </div>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < item.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
              <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

const menuItems = [
  {
    id: 1,
    name: "Mighty Super Cheesecake",
    description: "Creamy and smooth cheesecake topped with fresh berries",
    price: 8.99,
    image: "/placeholder.svg",
    rating: 5,
  },
  {
    id: 2,
    name: "Spinach and Cheese Pasta",
    description: "Fresh pasta tossed with spinach and melted cheese",
    price: 12.99,
    image: "/placeholder.svg",
    rating: 4,
  },
  {
    id: 3,
    name: "Berry Bliss Smoothie",
    description: "Blend of fresh berries, yogurt, and honey",
    price: 6.99,
    image: "/placeholder.svg",
    rating: 4,
  },
  // Add more menu items as needed
]

