"use client";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import { useAction } from "next-safe-action/hooks";
import { deleteProductAction } from "@/actions/products/deleteProductAction";

type DeleteActionProps = {
  id: string;
};

export function DeleteAction({ id }: DeleteActionProps) {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={isPending} className="flex-1">
          {isPending ? "Deletting ..." : "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this Data
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAction;
