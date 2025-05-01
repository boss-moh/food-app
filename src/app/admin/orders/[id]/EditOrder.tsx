import { OrderDetails, UpdateOrderStatus } from "@/components/share";

import { ChangeStatusOptions, orderDetailsType } from "@/constants";

const options = ChangeStatusOptions.ADMIN;

interface EditOrderProps {
  order: orderDetailsType;
}

export const EditOrder = ({ order }: EditOrderProps) => {
  return (
      <article aria-label="order details " className="order-1 md:order-10">
        <UpdateOrderStatus
          selectedId={order.id}
          options={options}
          defaultStatus={order.status}
        >
          <OrderDetails order={order} />
        </UpdateOrderStatus>
      </article>
  );
};
