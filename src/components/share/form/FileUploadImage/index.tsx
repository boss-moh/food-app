"use client";

import { CloudUpload, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { useFormContext } from "react-hook-form";

type FileUploadImageProps<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
};

export default function FileUploadImage<S>({
  fieldTitle,
  nameInSchema,
}: FileUploadImageProps<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldTitle}</FormLabel>
          <FormControl>
            <FileUpload
              value={field.value}
              onValueChange={field.onChange}
              accept="image/*"
              maxFiles={1}
              maxSize={5 * 1024 * 1024}
              onFileReject={(_, message) => {
                form.setError(nameInSchema, {
                  message,
                });
              }}
            >
              <FileUploadDropzone className="flex-row border-dotted">
                <CloudUpload className="size-4" />
                Drag and drop or
                <FileUploadTrigger asChild>
                  <Button variant="link" size="sm" className="p-0">
                    choose files
                  </Button>
                </FileUploadTrigger>
                to upload
              </FileUploadDropzone>
              <FileUploadList>
                {field.value?.map((file: File, index: number) => (
                  <FileUploadItem key={index} value={file}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <X />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
          </FormControl>
          <FormDescription>
            Upload a single image up to 1MB in size.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FileUploadImage };
