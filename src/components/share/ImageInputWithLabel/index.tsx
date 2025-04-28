import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { ChangeEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
};

export const ImageInputWithLabel = <S,>({
  nameInSchema,
  fieldTitle,
}: Props<S>) => {
  const form = useFormContext();
  // const value = form.watch(nameInSchema);
  const [imageUrl, setImageUrl] = useState<null | string>();
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result); // Set the base64 string as preview
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const reset = () => {
    setImageUrl(null); // Reset the preview
    form.setValue(nameInSchema as string, null); // Reset the form value
  };

  const id = useId();
  return (
    <div className="w-full md:w-72">
      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fieldTitle}</FormLabel>
            {/* <ImageInput  {...props}/> */}
            {/* "/images/auth.jpeg" */}
            <div>
              {imageUrl ? (
                <div className="relative w-full h-full group">
                  <Image
                    width={400}
                    height={400}
                    src={imageUrl}
                    alt="Preview Of Your Image"
                    className=" object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                    <Button
                      variant="ghost"
                      className="text-white"
                      type="button"
                      onClick={() => {
                        // field.ref().?.current?.click();
                      }}
                    >
                      Change Image
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white"
                      type="button"
                      onClick={reset}
                    >
                      Remove image
                    </Button>
                  </div>
                </div>
              ) : (
                <EmptyState id={id} />
              )}
              <input
                id={id}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                {...field}
                onChange={
                  (e) => {
                    handleImageUpload(e);
                    field.onChange(e); // Call the original onChange function
                  } // Call the original onChange function
                }
                className="hidden"
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ImageInputWithLabel;

interface EmptyStateProps {
  id: string;
}

const EmptyState = ({ id }: EmptyStateProps) => {
  return (
    <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed relative overflow-hidden">
      <label htmlFor={id} className="w-full h-full cursor-pointer">
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <ImagePlus className="h-8 w-8" />
            <span>Upload Image</span>
          </div>
        </div>
      </label>
    </div>
  );
};

//  <div className="relative w-full h-full group">

//             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
//               <Button
//                 variant="ghost"
//                 className="text-white"
//                 type="button"
//                 onClick={() => {
//                   refInput?.current?.click();
//                 }}
//               >
//                 Change Image
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="text-white"
//                 type="button"
//                 onClick={reset}
//               >
//                 Remove image
//               </Button>
//             </div>
