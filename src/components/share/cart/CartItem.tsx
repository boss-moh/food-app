import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { productType } from "@/constants";
import { formatPrice } from "@/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  product: productType;
  quantity: number;
  update: (id: string, count: number) => void;
  removeItem: (id: string) => void;
}

export const CartItem = ({
  product,
  quantity,
  update,
  removeItem,
}: CartItemProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="flex items-center p-4">
        <div className="relative w-20 h-20 mr-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">
            {formatPrice(product.price)} each
          </p>
        </div>
        <div className="flex items-center">
          <Button
            disabled={quantity <= 1}
            variant="outline"
            size="icon"
            onClick={() => {
              if (quantity <= 1) return;
              update(product.id, quantity - 1);
            }}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              update(product.id, Number.parseInt(e.target.value))
            }
            className="w-16 mx-2 text-center"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => update(product.id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-4"
            onClick={() => removeItem(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
