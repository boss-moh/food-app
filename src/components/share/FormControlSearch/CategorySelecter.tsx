import React from "react";
import Selecter from "../Selecter";
// import { fetchCategories } from "@/data";
// import { makeOptions } from "@/utils";

type CategorySelecterProps = {
  defaultValue?: string;
  onChange: (categoryId: string) => void;
};

const CategorySelecter =  ({
  defaultValue,
  onChange,
}: // categories
CategorySelecterProps) => {
  // const options = makeOptions(
  //   category,
  //   (i) => ({
  //     name: i.name,
  //     value: i.id,
  //   }),
  //   true
  // );

  return (
    <Selecter
      name="categoryId"
      options={[
        {
          name: "test",
          value: "1",
        },
        {
          name: "test2",
          value: "2",
        },
        {
          name: "test3",
          value: "3",
        },
      ]}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default CategorySelecter;
