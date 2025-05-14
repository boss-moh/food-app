import React from "react";
import Selecter from "../Selecter";
import { fetchCategories } from "@/data";
import { makeOptions } from "@/utils";

type CategorySelecterProps = {
  defaultValue?: string;
};

const CategorySelecter = async ({ defaultValue }: CategorySelecterProps) => {
  const category = await fetchCategories();
  const options = makeOptions(
    category,
    (i) => ({
      name: i.name,
      value: i.id,
    }),
    true
  );

  return (
    <Selecter name="categoryId" options={options} defaultValue={defaultValue} />
  );
};

export default CategorySelecter;
