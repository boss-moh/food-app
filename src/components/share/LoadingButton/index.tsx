"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
};

export const LoadingButton = ({
  isLoading = false,
  children,
  disabled,
  ...rest
}: LoadingButtonProps) => {
  return (
    <Button disabled={isLoading || disabled} {...rest}>
      {isLoading ? (
        <>
          <Loader2 className="h-16 w-16 animate-spin  " />
          <span>Loading ... </span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
