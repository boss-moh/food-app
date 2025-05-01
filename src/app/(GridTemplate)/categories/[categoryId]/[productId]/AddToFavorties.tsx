"use client";

import { toggleItemFavorties } from "@/actions/products/favorties";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { Heart } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type AddToFavortiesProps = {
  id: string;
  isLikeItBefore?: boolean;
};

export const AddToFavorties = ({
  id,
  isLikeItBefore = false,
}: AddToFavortiesProps) => {
  const {
    execute,
    isExecuting: isPending,
    result,
  } = useAction(toggleItemFavorties, {
    onSuccess(response) {
      toast.success(response.data?.message);
    },
    onError(error) {
      toast.error(error.error.serverError);
    },
  });

  const isInsideFavorties =
    result.data == undefined ? isLikeItBefore : result.data.isInsideFavorties;

  const handleClick = () => {
    if (isPending) return;
    execute({ id });
  };

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      size="icon"
      aria-label="Add To Favorties "
      className="group flex-shrink-0"
    >
      <Heart
        className={cn(
          "group-hover:fill-red-300 group-hover:text-red-400 transition-all size-5",
          isInsideFavorties && "fill-red-500 text-red-600 ",
          isPending && "animate-pulse fill-red-500 text-red-600"
        )}
      />
    </Button>
  );
};

export default AddToFavorties;
