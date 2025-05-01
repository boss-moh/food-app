import { useFormContext } from "react-hook-form";
import { useState } from "react";

export const useImageFiled = (name: string, maxSizeMB: number) => {
  const { getValues, setValue, setError, clearErrors } = useFormContext();
  const value = getValues(name);

  const [preview, setPreview] = useState<string | null>(() =>
    value ? value : null
  );

  const changeValue = (value: string) => {
    setValue(name, value);
    setPreview(value);
    if (value) {
      clearErrors(name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      changeValue("");
      return;
    }

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes
    if (file.size > maxSize) {
      setError(name, {
        type: "manual",
        message: `File size should be less than ${maxSizeMB}MB.`,
      });
      changeValue("");

      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      changeValue(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return {
    preview,
    handleFileChange,
    hasValue: !!preview && !!value,
  };
};
