"use client";
import {
  option,
  createProductType,
  editProductSchema,
  editProductType,
} from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@/components/share";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";

import { useAction } from "next-safe-action/hooks";
import ActionErrorUI, { ActionError } from "@/components/share/ActionErrorUI";
import FormInputs from "../../_components/FormInputs";
import { editProductAction } from "@/actions/products/editProductAction";

type ProductFormProps = {
  defaultValues?: createProductType;
  categories: option[];
};

const emptyValues = {
  categoryId: "",
  description: "",
  ingredients: [],
  name: "",
  nutritionalInfo: [],
  prepTime: 0,
  price: 0,
  imageUrl: "",
};

export default function ProductForm({
  categories,
  defaultValues,
}: ProductFormProps) {
  const form = useForm<editProductType>({
    resolver: zodResolver(editProductSchema),
    defaultValues,
  });

  const {
    result,
    execute,
    isPending: isLoading,
    hasErrored,
  } = useAction(editProductAction, {
    onSuccess(response) {
      form.reset(emptyValues);

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

          <div className="flex justify-end">
            <LoadingButton
              type="submit"
              isLoading={isLoading && form.formState.isDirty}
              disabled={!form.formState.isDirty}
            >
              Save Product
            </LoadingButton>
          </div>
        </FormInputs>
      </form>
    </Form>
  );
}

/**
 *
 */
