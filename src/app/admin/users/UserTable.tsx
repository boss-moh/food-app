import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { URL_PATHS, RoleType } from "@/constants";
import { fetchUsers } from "@/lib";
import Link from "next/link";
import { Suspense } from "react";
import SelecterRole from "./SelecterRole";
import { EmptyRows, LoadingRow } from "@/components/share";

export const UserTable = ({ role, query }: { role: string; query: string }) => {
  return (
    <Table className="    bg-background rounded-lg shadow   ">
      <TableHeader>
        <TableRow>
          <TableHead>Users ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          {/* <TableHead>Total Orders</TableHead> */}
          {/* <TableHead>Total Spent</TableHead> */}
          {/* <TableHead>Join Date</TableHead> */}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <Suspense fallback={new Array(5).fill(<LoadingRow />)}>
          <TableData role={role} query={query} />
        </Suspense>
      </TableBody>
    </Table>
  );
};

const TableData = async ({ role, query }: { role: string; query: string }) => {
  const users = await fetchUsers(role as RoleType, query);
  const hasData = !!users.length;
  return (
    <>
      {hasData ? (
        users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">#{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <SelecterRole userId={user.id} role={user.role} />
            </TableCell>
            {/* <TableCell>{user.phone}</TableCell> */}
            {/* <TableCell>{user.totalOrders}</TableCell> */}
            {/* <TableCell>${user.totalSpent.toFixed(2)}</TableCell> */}
            {/* <TableCell>{user}</TableCell> */}
            <TableCell>
              <Button asChild variant="outline" size="sm">
                <Link href={URL_PATHS.ADMIN.USERS.ORDERS.VIEW(user.id)}>
                  View Orders
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <EmptyRows />
      )}
    </>
  );
};

export default UserTable;
