"use client";

import { deleteProductAction } from "@/actions/products";
import { DeletePop } from "@/components/share";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type DeleteProduct = {
  id: string;
};
export const DeleteProduct = ({ id }: DeleteProduct) => {
  const { execute, isPending } = useAction(deleteProductAction, {
    onSuccess() {
      toast.success("Success Delete Data.");
    },
    onError(response) {
      toast.error("Fail To  Delete Data.", {
        description: response.error.serverError,
      });
    },
  });
  const handleDelete = () => {
    if (isPending) return;
    execute({ id });
  };

  return (
    <DeletePop onClickAction={handleDelete} isPending={isPending}>
      This action cannot be undone. This will permanently delete this product
    </DeletePop>
  );
};

export default DeleteProduct;
