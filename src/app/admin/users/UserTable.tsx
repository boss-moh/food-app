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
type Props = {
  role: RoleType;
  query: string;
};

export const UserTable = ({ role, query }: Props) => {
  return (
    <Table className="    bg-background rounded-lg shadow   ">
      <TableHeader>
        <TableRow>
          <TableHead>Users ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
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

const TableData = async ({ role, query }: Props) => {
  const users = await fetchUsers(role, query);
  const hasData = !!users.length;
  return (
    <>
      {!hasData ? (
        <EmptyRows />
      ) : (
        users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">#{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <SelecterRole userId={user.id} role={user.role} />
            </TableCell>
            <TableCell>
              <Button asChild variant="outline" size="sm">
                <Link href={URL_PATHS.ADMIN.USERS.ORDERS.VIEW(user.id)}>
                  View Orders
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </>
  );
};

export default UserTable;
