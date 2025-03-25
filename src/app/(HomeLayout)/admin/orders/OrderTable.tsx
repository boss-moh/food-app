import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatus } from "@prisma/client";
import { fetchAdminCahce } from "@/lib";
import { ReactNode } from "react";
import { EmptyFeedBack, LoadingRow } from "@/components/share";
import { childrenProps } from "@/constants";
import { OrderRow } from "./OrderRow";

type OrderTableProps = childrenProps & {
  bottom?: ReactNode;
};
interface TableDataProps {
  query: string;
  status: OrderStatus;
}

export const OrderTableClasses = {
  1: "hidden md:table-cell",
  2: "hidden xl:table-cell",
  3: "hidden sm:table-cell",
  4: "hidden sm:table-cell",
  5: "text-center",
};

export const OrderTable = ({ bottom, children }: OrderTableProps) => {
  return (
    <>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead>Customer </TableHead>
            <TableHead className={OrderTableClasses[1]}>Date</TableHead>
            <TableHead className={OrderTableClasses[2]}>Items</TableHead>
            <TableHead className={OrderTableClasses[3]}>Total Amount</TableHead>
            <TableHead className={OrderTableClasses[4]}>Status</TableHead>
            <TableHead className={OrderTableClasses[5]}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
      {bottom}
    </>
  );
};

export const TableFeedBack = async ({ query, status }: TableDataProps) => {
  const orders = await fetchAdminCahce(query, status);
  return orders.length ? null : <EmptyFeedBack />;
};

export const TableData = async ({ query, status }: TableDataProps) => {
  const orders = await fetchAdminCahce(query, status);

  return orders.map((order) => (
    <OrderRow classes={OrderTableClasses} order={order} key={order.id} />
  ));
};

export const TableLoading = () => {
  return new Array(5)
    .fill(0)
    .map((_, index) => (
      <LoadingRow classes={OrderTableClasses} count={6} key={index} />
    ));
};
