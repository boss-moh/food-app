"use client";

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
import LoadingButton from "../LoadingButton";
import { childrenProps } from "@/constants";

type DeleteActionProps = childrenProps & {
  onClickAction: () => void;
  isPending: boolean;
};

export function DeletePop({
  onClickAction,
  isPending,
  children,
}: DeleteActionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <LoadingButton
          variant={"outline"}
          isLoading={isPending}
          className="flex-1"
        >
          Delete
        </LoadingButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {children
              ? children
              : "This action cannot be undone. This will permanently delete this Data"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClickAction}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePop;
