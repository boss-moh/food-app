"use client";
import { Input } from "@/components/ui/input";
import { ComponentProps, useEffect, useState } from "react";

type SearchInputProps = Omit<ComponentProps<"input">, "onChange"> & {
  onChange: (text: string) => void;
  defaultValue: string;
};

export const SearchInput = ({
  onChange,
  defaultValue,
  ...rest
}: SearchInputProps) => {
  const [text, setText] = useState<string>(defaultValue ?? "");
  useEffect(() => {
    const time = setTimeout(() => {
      onChange(text);
    }, 500);

    return () => {
      clearTimeout(time);
    };
  }, [text]);

  return (
    <Input value={text} onChange={(e) => setText(e.target.value)} {...rest} />
  );
};

export default SearchInput;
