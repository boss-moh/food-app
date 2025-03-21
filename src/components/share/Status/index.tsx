import { OrderStatus } from "@prisma/client";
import { cva, VariantProps } from "class-variance-authority";

const statusVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize",
  {
    variants: {
      status: {
        [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
        [OrderStatus.PREPARING]: "bg-blue-100 text-blue-800",
        [OrderStatus.READY]: "bg-purple-100 text-purple-800",
        [OrderStatus.DELIVERED]: "bg-green-100 text-green-800",
        [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
        [OrderStatus.DONE]: "bg--100 text-green-800", // Reuse green for done status
      },
    },
  }
);

interface StatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {}

export const Status = ({ status, className, ...rest }: StatusProps) => {
  return (
    <span
      aria-label="Status"
      className={statusVariants({ status, className })}
      {...rest}
    ></span>
  );
};

export default Status;
