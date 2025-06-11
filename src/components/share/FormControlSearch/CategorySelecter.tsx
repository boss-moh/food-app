import React from "react";
import Selecter from "../Selecter";
import { makeOptions } from "@/utils";
import { categoryType } from "@/constants";

type CategorySelecterProps = {
  defaultValue?: string;
  onChange: (categoryId: string) => void;
  categories: categoryType[];
};

const CategorySelecter = ({
  defaultValue,
  onChange,
  categories,
}: // categories
CategorySelecterProps) => {
  const options = makeOptions(
    categories,
    (i) => ({
      name: i.name,
      value: i.id,
    }),
    true
  );

  return (
    <Selecter
      name="categoryId"
      options={options}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default CategorySelecter;
