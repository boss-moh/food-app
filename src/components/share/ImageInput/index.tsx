"use client";

import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useId, useRef, useState } from "react";

export const useImageInput = (
  onChange: (url: string) => void,
  defaultValue: string | null = ""
) => {
  const [imagePreview, setImagePreview] = useState<string | null>(defaultValue);

  const isValidate = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit

      return false;
    }
    return true;
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const reset = () => {
    setImagePreview(null);
    onChange("");
  };

  return {
    imagePreview,
    onChange: handleImageUpload,
    reset,
    isValidate,
  };
};

type ImageInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  reset: () => void;
};

export const ImageInput = ({
  onChange,
  imagePreview,
  reset,
}: ImageInputProps) => {
  const refInput = useRef<HTMLInputElement>(null);
  const id = useId();

  return (
    <div className="mt-2 flex flex-col items-center gap-4">
      <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed relative overflow-hidden">
        {imagePreview ? (
          <div className="relative w-full h-full group">
            <Image
              fill
              src={imagePreview}
              alt="Preview Of Your Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
              <Button
                variant="ghost"
                className="text-white"
                type="button"
                onClick={() => {
                  refInput?.current?.click();
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
          <label htmlFor={id} className="w-full h-full cursor-pointer">
            <div className="h-full w-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <ImagePlus className="h-8 w-8" />
                <span>Upload Image</span>
              </div>
            </div>
          </label>
        )}
        <input
          ref={refInput}
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={onChange}
          onClick={(e) => {
            e.currentTarget.value = "";
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Supported formats: JPEG, PNG, WebP
        <br />
        Maximum file size: 5MB
      </p>
    </div>
  );
};

export default ImageInput;
