import { Button } from "@/components/ui/button";
import { URL_PATHS } from "@/constants";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

export const EmptyCart = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="relative w-40 h-40 mb-6">
          <ShoppingCart className="w-full h-full text-muted-foreground/30" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Looks like you haven&apos;t added any items to your cart yet. Browse
          our delicious menu and find something you&apos;ll love!
        </p>
        <Button asChild size="lg">
          <Link href={URL_PATHS.MEALS}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
      </div>

      {/* <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">You might also like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{product.name}</h3>
                <span>${product.price.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div> */}
    </div>
  );
};

export default EmptyCart;
