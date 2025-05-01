"use client";
import { deleteCategoryAction } from "@/actions/category/deleteAction";
import { DeletePop } from "@/components/share";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type DeleteCategoryProps = {
  id: string;
};
export const DeleteCategory = ({ id }: DeleteCategoryProps) => {
  const { execute, isPending } = useAction(deleteCategoryAction, {
    onSuccess(response) {
      toast.success(response.data?.message);
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
      This action cannot be undone. This will permanently delete this Category
    </DeletePop>
  );
};

export default DeleteCategory;
