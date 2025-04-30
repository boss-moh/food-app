"use client";
import { option, createProductType, createProductSchema } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@/components/share";
import { toast } from "sonner";

import { useAction } from "next-safe-action/hooks";
import { createProductAction } from "@/actions/products/createProduct";
import ActionErrorUI, { ActionError } from "@/components/share/ActionErrorUI";
import FormInputs from "../_components/FormInputs";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type ProductFormProps = {
  defaultValues?: createProductType;
  categories: option[];
};

const emptyValues = {
  categoryId: "",
  description: "",
  ingredients: [""],
  name: "",
  nutritionalInfo: [],
  prepTime: 0,
  price: 0,
  imageUrl: "",
  // files: [],
};

export default function ProductForm({ categories }: ProductFormProps) {
  const form = useForm<createProductType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: emptyValues,
  });

  const {
    result,
    execute,
    isPending: isLoading,
    hasErrored,
  } = useAction(createProductAction, {
    onSuccess(response) {
      form.reset();

      toast.success(response.data?.message);
    },
  });

  async function onSubmit() {
    if (isLoading) {
      return;
    }

    execute(form.getValues());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInputs categories={categories}>
          <ActionErrorUI
            result={result as ActionError}
            hasErrored={hasErrored}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="reset"
              variant={"secondary"}
              onClick={() => form.reset()}
            >
              Clear
            </Button>

            <LoadingButton type="submit" isLoading={isLoading}>
              Create Product
            </LoadingButton>
          </div>
        </FormInputs>
      </form>
    </Form>
  );
}
