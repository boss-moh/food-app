"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { InputHTMLAttributes } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type stringkey<S> = keyof S & string;

type Props<S> = {
  fieldTitle: string;
  nameInSchema: stringkey<S>;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const ArrayFiled = <T,>({ fieldTitle, nameInSchema, ...rest }: Props<T>) => {
  const form = useFormContext();

  const { fields, remove, append } = useFieldArray({
    name: nameInSchema as string,
    control: form.control,
    rules: {
      minLength: 1,
    },
  });

  const handleAppendField = () => append(`${fieldTitle}-${fields.length + 1}`);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-base">{fieldTitle}</h3>
      <section
        className="flex flex-col gap-2"
        aria-label={`${fieldTitle} fileds`}
      >
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col  gap-2">
            <FormField
              control={form.control}
              name={`${nameInSchema}.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder={`${nameInSchema}-${index + 1}`}
                        {...field}
                        {...rest}
                      />

                      {index >= 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove Item</span>
                        </Button>
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </section>

      <Button
        variant={"secondary"}
        className="w-fit flex-end place-self-end"
        type="button"
        onClick={handleAppendField}
      >
        Add Filed
      </Button>
    </div>
  );
};

export default ArrayFiled;
