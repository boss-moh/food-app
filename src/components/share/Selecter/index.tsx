import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type option = {
  name: string;
  value: string;
};
type SelecterProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: option[];
};

export const Selecter = ({
  defaultValue,
  onChange,
  placeholder,
  options,
}: SelecterProps) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {(placeholder && !options.length) || (
          <>
            {options?.map((option) => (
              <SelectItem
                className="capitalize"
                key={option.value}
                value={option.value}
              >
                {option.name}
              </SelectItem>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default Selecter;
