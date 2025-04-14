import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { option } from "@/constants";
import { cn } from "@/lib";

type SelecterProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: option[] | string[];
  className?: string;
};

export const Selecter = ({
  defaultValue,
  onChange,
  placeholder,
  options,
  className,
}: SelecterProps) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger className={cn("w-full md:w-[180px]", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="capitalize">
        {options?.map((option) => {
          if (typeof option === "string") {
            return (
              <SelectItem className="capitalize" key={option} value={option}>
                {option}
              </SelectItem>
            );
          }
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          );
        })}

        {placeholder && (
          <div className=" w-full  select-none   py-1.5 pl-8 pr-2 text-sm">
            {placeholder}
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

export default Selecter;
