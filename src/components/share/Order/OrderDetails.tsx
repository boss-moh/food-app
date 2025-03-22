import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Summary, Status, OrderItems } from "@/components/share";
import { getCalcInfo } from "@/utils";
import { orderDetailsType } from "@/constants";

export const OrderDetails = ({ order }: { order: orderDetailsType }) => {
  const summaryDetails = getCalcInfo(order.items);
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">
            Order #{order.id.substring(0, 8)}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Placed on {order.createdAt.toDateString()}
          </p>
        </div>
        <Status status={order.status} className="text-xs" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Items */}
        <OrderItems items={order.items} />
        {/* Order Summary */}
        <Summary {...summaryDetails} />

        {/* Delivery Information */}
        {/* <div>
        <h3 className="text-sm font-medium mb-2">
          Delivery Information
        </h3>
        <div className="rounded-md bg-muted p-3">
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-muted-foreground" />
            {order.status === "DELIVERED" ? (
              <span>
                Delivered on{" "}
                {`format(
                  new Date(order.deliveredAt!),
                  "MMM d, yyyy 'at' h:mm a"
                )`}
              </span>
            ) : order.status === "CANCELLED" ? (
              <span>Order cancelled</span>
            ) : (
              <span>
                Estimated delivery: {"estimatedPrepTime"} minutes
                {order.status === "PENDING" && " after acceptance"}
              </span>
            )}
          </div>
        </div>
      </div> */}

        {/* Order Timeline */}
        {/* {renderOrderTimeline(order)} */}
      </CardContent>
    </Card>
  );
};

export default OrderDetails;
