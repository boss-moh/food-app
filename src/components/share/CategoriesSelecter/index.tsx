"use client";
import { option } from "@/constants";
import Selecter from "../Selecter";
import { useCategoryHandlerURL } from "@/hooks/useCategoryURL";

type CategoriesSelecterProps = {
  defaultValue?: string;
  options: option[];
};
export const CategoriesSelecter = ({
  options,
  defaultValue,
}: CategoriesSelecterProps) => {
  const handler = useCategoryHandlerURL();

  return (
    <Selecter
      options={options}
      onChange={handler}
      defaultValue={defaultValue}
    />
  );
};

export default CategoriesSelecter;
