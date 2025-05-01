import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatus } from "@prisma/client";
import { fetchAdminOrders } from "@/lib";
import { EmptyFeedBack, LoadingRow } from "@/components/share";
import { OrderRow } from "./OrderRow";
import { Suspense } from "react";

interface TableDataProps {
  query: string;
  status: OrderStatus;
}

export const OrderTable = ({ query, status }: TableDataProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer </TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <Suspense fallback={<TableLoading />}>
          <TableData query={query} status={status} />
        </Suspense>
      </TableBody>
    </Table>
  );
};

export const TableData = async ({ query, status }: TableDataProps) => {
  const orders = await fetchAdminOrders(query, status);

  const hasOrders = orders.length > 0;

  if (!hasOrders) return <TableEmptyUI />;

  return orders.map((order) => <OrderRow order={order} key={order.id} />);
};

export const TableLoading = () => {
  return new Array(5)
    .fill(0)
    .map((_, index) => <LoadingRow count={6} key={index} />);
};

export const TableEmptyUI = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center">
        <EmptyFeedBack />
      </TableCell>
    </TableRow>
  );
};
