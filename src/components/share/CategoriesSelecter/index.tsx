"use client";
import { useCategoriy } from "@/lib";
import Selecter from "../Selecter";

type CategoriesSelecterProps = {
  defaultValue?: string | null;
  onChange: (id: string) => void;
  withOutAll?: boolean;
};
export const CategoriesSelecter = ({
  onChange,
  defaultValue = null,
  withOutAll = false,
}: CategoriesSelecterProps) => {
  const { categories, placeholder } = useCategoriy();
  const options = [
    ...categories.map((item) => ({
      name: item.name,
      value: item.id,
    })),
  ];

  if (!withOutAll)
    options.unshift({
      value: "All",
      name: "All",
    });

  const value = defaultValue
    ? defaultValue
    : withOutAll
    ? ""
    : options[0].value;

  return (
    <Selecter
      options={options}
      onChange={onChange}
      defaultValue={value}
      placeholder={placeholder}
    />
  );
};

export default CategoriesSelecter;
