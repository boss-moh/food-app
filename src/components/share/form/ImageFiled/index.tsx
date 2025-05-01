"use client";
import { ImagePlus } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { cn } from "@/lib";
import { useImageFiled } from "./useImageFiled";

type ImageInputWithLabelProps<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  maxSizeMB?: number; // Maximum size in MB
};

export const ImageInputWithLabel = <S,>({
  fieldTitle = "Product Image",
  maxSizeMB = 1,
  nameInSchema,
}: ImageInputWithLabelProps<S>) => {
  const name = nameInSchema as string;
  const { preview, handleFileChange, hasValue } = useImageFiled(
    name,
    maxSizeMB
  );
  return (
    <FormField
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{fieldTitle}</FormLabel>
          <FormControl>
            <div
              className={cn(
                "p-2 rounded-lg border-2 border-dashed  overflow-hidden md:w-60 h-60  flex items-center justify-center ",
                hasValue && "border-solid "
              )}
            >
              <label className=" cursor-pointer ">
                {hasValue ? (
                  <div className="p-1">
                    <Image
                      width={320}
                      height={320}
                      src={preview!}
                      alt="Product Image"
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>
                ) : (
                  <EmptyState />
                )}
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/jpeg, image/png, image/webp"
                  className="absolute inset-0 cursor-pointer opacity-0 hidden"
                />
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default ImageInputWithLabel;

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <ImagePlus className="h-8 w-8" />
      <p className="text-sm ">Click to select an image</p>
      <p className="text-xs ">{`Maximum size: 5MB`}</p>
    </div>
  );
};
