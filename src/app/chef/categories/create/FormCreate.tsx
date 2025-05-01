"use client";
import { CardContent, CardFooter } from "@/components/ui/card";
import { createCategorySchema, createCategoryType } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { createCategoryAction } from "@/actions/category/createCategoryAction";
import { toast } from "sonner";
import { InputWithLabel, LoadingButton } from "@/components/share";
import ImageInputWithLabel from "@/components/share/form/ImageFiled";
import { Form } from "@/components/ui/form";

const FormCreate = () => {
  const form = useForm<createCategoryType>({
    resolver: zodResolver(createCategorySchema),
  });

  const { isPending, execute } = useAction(createCategoryAction, {
    onSuccess: (response) => {
      form.reset();
      toast.success(response.data?.message);
    },
    onError: (response) => {
      toast.error(response.error?.serverError);
    },
  });

  const onSubmit = async () => {
    if (isPending) return;
    execute(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-4 ">
          <InputWithLabel<createCategoryType>
            nameInSchema="name"
            fieldTitle="Name"
            placeholder="Enter the category name"
          />
          <ImageInputWithLabel<createCategoryType>
            nameInSchema="imageUrl"
            fieldTitle="Category Image"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <LoadingButton isLoading={isPending} type="submit">
            Create
          </LoadingButton>
        </CardFooter>
      </form>
    </Form>
  );
};

export default FormCreate;
