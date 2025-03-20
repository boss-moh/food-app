import { cva, VariantProps } from "class-variance-authority";
import { InfoIcon } from "lucide-react";
import { ComponentProps } from "react";

const helperTextClasses = cva(" flex items-center gap-2  rounded p-1  ", {
  variants: {
    variant: {
      error: "   text-red-500 ",
      info: " text-blue-500 ",
    },
    size: {
      sm: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "error",
    size: "sm",
  },
});

export type helperTextProps = VariantProps<typeof helperTextClasses> &
  ComponentProps<"p">;

export const HelperText = ({
  size,
  variant,
  className,
  children,
  ...rest
}: helperTextProps) => {
  const classes = helperTextClasses({
    variant,
    size,
    className,
  });
  return (
    <p className={classes} {...rest}>
      <InfoIcon />
      <span>{children}</span>
    </p>
  );
};

export default HelperText;
