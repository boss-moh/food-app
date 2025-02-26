import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, Plus, Search } from "lucide-react";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8 w-[250px]"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="pasta">Pasta</SelectItem>
              <SelectItem value="pizza">Pizza</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="admin/products/create">
              Add Product
              <Plus className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="relative aspect-[4/3]">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover rounded-t-lg"
                fill
              />
              <div className="absolute top-2 right-2">
                <Button
                  variant="secondary"
                  className={product.active ? "bg-green-100" : "bg-red-100"}
                  size="sm"
                >
                  {product.active ? "Active" : "Inactive"}
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{product.name}</span>
                <span>${product.price.toFixed(2)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium">Category:</span>
                <span className="text-sm text-muted-foreground">
                  {product.category}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-medium">Stock:</span>
                <span className="text-sm text-muted-foreground">
                  {product.stock} units
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Edit
              </Button>
              <Button variant="outline" className="flex-1">
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

const products = [
  {
    id: 1,
    name: "Mighty Super Cheesecake",
    description: "Creamy and smooth cheesecake topped with fresh berries",
    price: 8.99,
    category: "Desserts",
    stock: 15,
    image: "/placeholder.svg",
    active: true,
  },
  {
    id: 2,
    name: "Spinach and Cheese Pasta",
    description: "Fresh pasta tossed with spinach and melted cheese",
    price: 12.99,
    category: "Pasta",
    stock: 20,
    image: "/placeholder.svg",
    active: true,
  },
  {
    id: 3,
    name: "Berry Bliss Smoothie",
    description: "Blend of fresh berries, yogurt, and honey",
    price: 6.99,
    category: "Drinks",
    stock: 30,
    image: "/placeholder.svg",
    active: true,
  },
  {
    id: 4,
    name: "Mighty Cherry Breakfast Burger",
    description: "Juicy burger with cherry sauce and breakfast toppings",
    price: 14.99,
    category: "Breakfast",
    stock: 8,
    image: "/placeholder.svg",
    active: false,
  },
];
