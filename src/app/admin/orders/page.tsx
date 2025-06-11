import { OrderTable } from "./OrderTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatus, searchParamsProps } from "@/constants";
import FilterSection from "./FilterSection";
export default async function OrdersPage({
  searchParams,
}: searchParamsProps<"query"> & searchParamsProps<"status">) {
  const { query, status } = await searchParams;
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <FilterSection />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-1 items-center">
            <span>Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTable query={query} status={status as OrderStatus} />
        </CardContent>
      </Card>
    </div>
  );
}
