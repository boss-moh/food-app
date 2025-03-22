import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { URL_PATHS } from "@/constants";
import { fetchUsers } from "@/lib";
import { RoleStatus } from "@prisma/client";
import { User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const UserTable = ({ role, query }: { role: string; query: string }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
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
    </div>
  );
};

const TableData = async ({ role, query }: { role: string; query: string }) => {
  const users = await fetchUsers(role as RoleStatus, query);
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
              {user.role}
              {/* <Selecter onChange={onChange} options={UesrRoleoptions} defaultValue={user.role.toLowerCase()} /> */}
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

const EmptyRows = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="text-center">
        No users found
        <div className="text-center py-8">
          <User className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium mb-2">No Users found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
};

const LoadingRow = () => {
  return (
    <TableRow>
      <TableCell className="h-[70px]">
        <Skeleton className="h-[20px]" />
      </TableCell>
      <TableCell className="h-[70px]">
        <Skeleton className="h-[20px]" />
      </TableCell>
      <TableCell className="h-[70px]">
        <Skeleton className="h-[20px]" />
      </TableCell>
      <TableCell className="h-[70px]">
        <Skeleton className="h-[20px]" />
      </TableCell>
      <TableCell className="h-[70px]">
        <Skeleton className="h-[20px]" />
      </TableCell>
    </TableRow>
  );
};

export default UserTable;
