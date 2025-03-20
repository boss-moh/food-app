"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  API_END_POINT,
  editCategorySchema,
  editCategoryType,
} from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageInput, useImageInput } from "@/components/share";
import { useMutation } from "@tanstack/react-query";
import { axios } from "@/lib";
import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

const EditForm = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const values = JSON.parse(
    decodeURIComponent(data ?? "{}")
  ) as editCategoryType;

  const form = useForm<editCategoryType>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: values,
  });

  const imageProps = useImageInput(
    (url) => form.setValue("imageUrl", url),
    values?.imageUrl
  );

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async () =>
      await axios.put(API_END_POINT.ADMIN.CATEGORY.EDIT, form.getValues()),
    onSuccess: () => {
      imageProps.reset();
      form.reset({
        id: "",
        name: "",
        imageUrl: "",
      });
      toast({
        title: "Category Information has been Changed.",
      });
    },
    onError: (error) => {
      toast({
        title: "there is error happen",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = form.handleSubmit(async () => {
    if (isLoading) return;
    mutate();
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <CardContent className="flex flex-col gap-4 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name Of Category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={() => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <ImageInput {...imageProps} />
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={isLoading}>
            {isLoading ? "Loading ..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default EditForm;
