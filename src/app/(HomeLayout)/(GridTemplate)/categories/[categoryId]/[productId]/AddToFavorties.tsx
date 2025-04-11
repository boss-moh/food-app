"use client";

import { Button } from "@/components/ui/button";
import { API_END_POINT, MessageType } from "@/constants";
import { axios, cn, useMutation } from "@/lib";
import { Heart } from "lucide-react";
import { toast } from "sonner";

type response = MessageType & { isInsideFavorties: boolean };

export const AddToFavorties = ({
  id,
  isLikeItBefore = false,
}: {
  id: string;
  isLikeItBefore?: boolean;
}) => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: async () =>
      await axios.post<void, response>(
        API_END_POINT.USER.ORDERS.ADD_TO_FAVORTIES(id)
      ),
    onSuccess(data) {
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const isInsideFavorties =
    data == undefined ? isLikeItBefore : data.isInsideFavorties;
  const handleClick = () => {
    if (isPending) return;
    mutate();
  };
  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      size="icon"
      aria-label="Add To Favorties "
      className="group"
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
