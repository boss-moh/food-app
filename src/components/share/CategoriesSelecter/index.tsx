import { useCategoriy } from "@/lib";
import Selecter from "../Selecter";

type CategoriesSelecterProps = {
  onChange: (id: string) => void;
};
export const CategoriesSelecter = ({ onChange }: CategoriesSelecterProps) => {
  const { categories, placeholder } = useCategoriy();
  const options = [
    {
      value: "All",
      name: "All",
    },
    ...categories.map((item) => ({
      name: item.name,
      value: item.id,
    })),
  ];
  return (
    <Selecter
      options={options}
      onChange={onChange}
      defaultValue={options[0].value}
      placeholder={placeholder}
    />
  );
};

export default CategoriesSelecter;
