import { Status } from "@/components/share";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { URL_PATHS } from "@/constants";
import { fetchAdminOrders } from "@/lib";
import { formatDate, formatPrice } from "@/utils";
import { Eye } from "lucide-react";
import Link from "next/link";

type orderType = Awaited<ReturnType<typeof fetchAdminOrders>>[0];
interface OrderRowProps {
  order: orderType;
}

export const OrderRow = ({ order }: OrderRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <span className="font-medium">{order.customer?.name}</span>
      </TableCell>
      <TableCell>{formatDate(order.date)}</TableCell>
      <TableCell>{order.items.length}</TableCell>
      <TableCell>{formatPrice(order.total)}</TableCell>
      <TableCell>
        <Status status={order.status}>{order.status}</Status>
      </TableCell>
      <TableCell>
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
