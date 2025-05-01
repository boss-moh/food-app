import { InputWithLabel } from "@/components/share";
import ArrayFiled from "@/components/share/ArrayFiled";
import { SelectWithLabel } from "@/components/share/SelectWithLabel";
import { Separator } from "@radix-ui/react-select";
import { createProductType, option } from "@/constants";
import { PropsWithChildren } from "react";
import { ImageInputWithLabel } from "@/components/share/form/ImageFiled";

type FormInputsProps = {
  categories: option[];
};

export const FormInputs = ({
  categories,
  children,
}: PropsWithChildren<FormInputsProps>) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <InputWithLabel<createProductType>
            fieldTitle="Product Name"
            nameInSchema="name"
            placeholder="Write a name for your dish"
          />

          <InputWithLabel<createProductType>
            fieldTitle="Description"
            nameInSchema="description"
            placeholder="Write a description for your dish"
          />

          <div className="grid grid-cols-2 gap-4">
            <InputWithLabel<createProductType>
              fieldTitle="Price"
              nameInSchema="price"
              placeholder="0.00"
              type="number"
            />

            <InputWithLabel<createProductType>
              fieldTitle="Prep Time"
              nameInSchema="prepTime"
              placeholder="x minutes"
              type="number"
            />
          </div>

          <SelectWithLabel<createProductType>
            fieldTitle="Category"
            nameInSchema="categoryId"
            data={categories}
          />
        </div>

        <ImageInputWithLabel<createProductType>
          nameInSchema="imageUrl"
          fieldTitle="Product Image"
        />
      </div>

      <ArrayFiled<createProductType>
        fieldTitle="Ingredients"
        nameInSchema="ingredients"
      />

      <ArrayFiled<createProductType>
        fieldTitle="nutritionalInfo"
        nameInSchema="nutritionalInfo"
      />
      <Separator className="my-4" />
      {children}
    </>
  );
};

export default FormInputs;
