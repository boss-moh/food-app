import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  fetchNotDoneOrderCount,
  fetchOrdersCount,
  fetchRecentOrders,
  fetchSales,
  fetchUsersCount,
} from "@/lib/data/admin";
import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import { Suspense } from "react";
import {
  OrderTable,
  OrderTableClasses,
  TableLoading,
} from "./orders/OrderTable";
import { OrderRow } from "./orders/OrderRow";
import { formatPrice } from "@/utils";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Overview */}
      <Suspense fallback={"loading ... "}>
        <AdminCards />
      </Suspense>

      <CardTable />

      {/* Sales Chart
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Daily sales performance</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <BarChart className="h-[350px] w-full text-muted-foreground" />
        </CardContent>
      </Card> */}
    </div>
  );
}

const AdminCards = async () => {
  const [ordersCount, usersCount, totalSales, NotDoneOrderCount] =
    await Promise.all([
      fetchOrdersCount(),
      fetchUsersCount(),
      fetchSales(),
      fetchNotDoneOrderCount(),
    ]);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(totalSales)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ordersCount}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium"> Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usersCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{NotDoneOrderCount}</div>
          {/* <p className="text-xs text-muted-foreground">Processing now</p> */}
        </CardContent>
      </Card>
    </div>
  );
};

const CardTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-1 items-center">
          <span>Recent Orders</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<TableLoading />}>
          <Table />
        </Suspense>
      </CardContent>
    </Card>
  );
};
const Table = async () => {
  const orders = await fetchRecentOrders();
  return (
    <OrderTable>
      {orders.map((order) => (
        <OrderRow classes={OrderTableClasses} order={order} key={order.id} />
      ))}
    </OrderTable>
  );
};
