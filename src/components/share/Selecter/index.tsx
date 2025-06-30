"use client";
import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { option, options } from "@/constants";
import { cn } from "@/lib";
import { ComponentProps } from "react";

type SelecterProps = ComponentProps<typeof Select> & {
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  options: options;
  className?: string;
};

export const Selecter = ({
  defaultValue = "all",
  onChange = () => {},
  placeholder,
  options,
  className,
  ...rest
}: SelecterProps) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange} {...rest}>
      <SelectTrigger className={cn("w-full md:w-[180px]", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="capitalize">
        {options.map((option) => {
          const { value, name } = getValue(option);
          return (
            <SelectItem key={value} value={value}>
              {name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default Selecter;

const getValue = (option: option | string) => {
  const { value, name } =
    typeof option === "string" ? { value: option, name: option } : option;

  return { value, name };
};
