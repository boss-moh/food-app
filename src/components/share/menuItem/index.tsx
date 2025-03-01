import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { productType } from "@/constants";
import Image from "next/image";
import React from "react";
import AddToCardButton from "../addToCardButton";

type MenuItemProps = {
  product: productType;
};

export const MenuItem = ({ product }: MenuItemProps) => {
  const { id, imageUrl, name, description, price } = product;
  return (
    <Card key={id}>
      <div className="relative aspect-[4/3]">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="object-cover"
          fill
        />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {/* <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted-foreground"
            }`}
          />
        ))}
      </div> */}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
        <p className="text-lg font-bold mt-2">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <AddToCardButton />
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
