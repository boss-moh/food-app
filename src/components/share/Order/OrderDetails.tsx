import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Summary, Status, OrderItems } from "@/components/share";
import { orderDetailsType } from "@/constants";
import { getSummary } from "@/utils";
interface OrderDetailsProps {
  className?: string;
  order: orderDetailsType;
}

export const OrderDetails = ({ order, className }: OrderDetailsProps) => {
  const summaryDetails = getSummary(order);
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl flex  gap-2">
            <span>Order</span>
            <span className="w-40 truncate inline-block"> #{order.id}</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Placed on {order.date.toDateString()}
          </p>
        </div>
        <Status status={order.status} className="text-xs" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Items */}
        <OrderItems items={order.items} />
        {/* Order Summary */}
        <Summary {...summaryDetails} />
      </CardContent>
    </Card>
  );
};

export default OrderDetails;
