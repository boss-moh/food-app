"use client";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  createCategoryType,
  editCategorySchema,
  editCategoryType,
} from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { InputWithLabel, LoadingButton } from "@/components/share";
import ImageInputWithLabel from "@/components/share/form/ImageFiled";
import { Form } from "@/components/ui/form";
import { editCategoryAction } from "@/actions/category/editCategoryAction";

type FormEditProps = { defaultValues: editCategoryType };

const FormEdit = ({ defaultValues }: FormEditProps) => {
  const form = useForm<editCategoryType>({
    resolver: zodResolver(editCategorySchema),
    defaultValues,
  });

  const { isPending, execute } = useAction(editCategoryAction, {
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

  const isChanged = !form.formState.isDirty;

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
          <LoadingButton
            disabled={isChanged}
            isLoading={isPending}
            type="submit"
          >
            Save
          </LoadingButton>
        </CardFooter>
      </form>
    </Form>
  );
};

export default FormEdit;
