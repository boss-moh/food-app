import { Status } from "@/components/share";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { URL_PATHS } from "@/constants";
import { AdminOrderRowType, cn } from "@/lib";
import { formatDate, formatPrice } from "@/utils";
import { Eye } from "lucide-react";
import Link from "next/link";

interface OrderRowProps {
  order: AdminOrderRowType;
  classes?: Record<string, string>;
}

export const OrderRow = ({ order, classes = {} }: OrderRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <span className="font-medium">{order.customer?.name}</span>
      </TableCell>
      <TableCell className={cn(classes[1])}>{formatDate(order.date)}</TableCell>
      <TableCell className={cn(classes[2])}>{order.items.length}</TableCell>
      <TableCell className={cn(classes[3])}>
        {formatPrice(order.total)}
      </TableCell>
      <TableCell className={cn(classes[4])}>
        <Status status={order.status}>{order.status}</Status>
      </TableCell>
      <TableCell className={cn(classes[5])}>
        <Button asChild variant="outline" size="sm">
          <Link href={URL_PATHS.ADMIN.ORDERS.VIEW_ORDER(order.id)}>
            <Eye className="size-4" />
            <span> View </span>
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};
