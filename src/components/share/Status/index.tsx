import { OrderStatus } from "@prisma/client";
import { cva, VariantProps } from "class-variance-authority";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  CookingPot,
  Package,
  Truck,
} from "lucide-react";

const statusVariants = cva(
  "  rounded-md border px-2.5 py-0.5  text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ",
  {
    variants: {
      status: {
        [OrderStatus.PENDING]: "bg-yellow-100 text-yellow-800",
        [OrderStatus.PREPARING]: "bg-blue-100 text-blue-800",
        [OrderStatus.DELIVERED]: "bg-green-100 text-green-800",
        [OrderStatus.CANCELLED]: "bg-red-100 text-red-800",
        [OrderStatus.REJECTED]: "bg-red-100 text-red-800",
        [OrderStatus.DONE]: "bg-green-100 text-green-800", // Reuse green for done status
        [OrderStatus.PICKING]: "bg-violet-100 text-violet-800", // Reuse green for done status
      },
    },
  }
);

const renderStatusIcon = (status: OrderStatus | null | undefined) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <Clock className="h-5 w-5 text-yellow-500" />;

    case OrderStatus.DONE:
      return <CheckCircle className="h-5 w-5 text-green-500" />;

    case OrderStatus.DELIVERED:
      return <Truck className="h-5 w-5 text-green-500" />;
    case OrderStatus.REJECTED:
    case OrderStatus.CANCELLED:
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case OrderStatus.PREPARING:
      return <CookingPot className="h-5 w-5  text-blue-800" />;
    case OrderStatus.PICKING:
      return <Package className="h-5 w-5   text-violet-800" />;
    default:
      return <Clock className="h-5 w-5" />;
  }
};
interface StatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {}

export const Status = ({
  status,
  children,
  className,
  ...rest
}: StatusProps) => {
  return (
    <span
      aria-label="Status"
      className={"flex gap-2 items-center capitalize"}
      {...rest}
    >
      <span>{renderStatusIcon(status)}</span>

      <span className={statusVariants({ status, className })}>
        {children || status}
      </span>
    </span>
  );
};

export default Status;
