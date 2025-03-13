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
import { axios, useMutation } from "@/lib";
import { toast } from "@/hooks/use-toast";

export function DeleteAction({
  url,
  onSuccess = () => {},
}: {
  url: string;
  onSuccess?: () => void;
}) {
  const { mutate, isPending } = useMutation({
    mutationKey: [url],
    mutationFn: async () => {
      return await axios.delete<void, { message: string }>(url);
    },
    onSuccess: (data) => {
      toast({
        title: "Success Delete Data.",
        description: data.message,
      });
      onSuccess();
    },
    onError(error) {
      toast({
        title: "Fail To  Delete Data.",
        description: error.message,
      });
    },
  });

  const handleDelete = () => {
    if (isPending) return;
    mutate();
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
