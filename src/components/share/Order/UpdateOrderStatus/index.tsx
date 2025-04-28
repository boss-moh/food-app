"use client";
import { changeStatusAction } from "@/actions/orders/changeStatusAction";
import { LoadingButton, Selecter } from "@/components/share";
import { childrenProps } from "@/constants";
import { OrderStatus } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

type UpdateSelecterProps = childrenProps & {
  selectedId: string;
  options: OrderStatus[];
  defaultStatus?: OrderStatus;
};

export const UpdateOrderStatus = ({
  children,
  selectedId,
  options,
  defaultStatus,
}: UpdateSelecterProps) => {
  const [status, setStatus] = useState<OrderStatus | undefined>(defaultStatus);

  const { execute, isExecuting } = useAction(changeStatusAction, {
    onSuccess(response) {
      toast.success(response.data?.message);
    },
    onError(response) {
      toast.error(response.error.serverError);
    },
  });

  const handleSubmit = () => {
    if (isExecuting) return;
    if (!status) return;
    execute({ id: selectedId!, status });
  };

  const isStatusChanged = status === undefined || status === defaultStatus;

  return (
    <>
      <div className="flex items-center justify-between mb-3 gap-4 ">
        <p className="font-medium flex-shrink-0">Update Status:</p>
        <Selecter
          className="w-[200px]"
          options={options}
          defaultValue={status}
          onChange={(status) => setStatus(status as OrderStatus)}
        />
      </div>

      {children}
      <div className="mt-8 flex justify-end gap-4">
        <LoadingButton
          onClick={handleSubmit}
          isLoading={isExecuting}
          disabled={isStatusChanged}
        >
          Save
        </LoadingButton>
      </div>
    </>
  );
};

export default UpdateOrderStatus;
