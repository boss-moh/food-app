"use client";
import { toggleAvaliableAction } from "@/actions/products/toggleAvaliable";
import { Status } from "@/components/share";
import { Switch } from "@/components/ui/switch";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type AvailableControlProps = {
  id: string;
  isAvailable: boolean;
};

export const AvailableControl = ({
  id,
  isAvailable,
}: AvailableControlProps) => {
  const { isPending, execute } = useAction(toggleAvaliableAction, {
    onSuccess(response) {
      toast.success(response.data?.message);
    },
    onError(response) {
      toast.error(response.error.serverError);
    },
  });

  const handleClick = () => {
    if (isPending) return;
    execute({ id, isAvailable: !isAvailable });
  };

  return (
    <article
      aria-label="Controls For Available"
      className="flex justify-between gap-2 py-2"
    >
      <Status
        status={isPending ? "PENDING" : isAvailable ? "DONE" : "REJECTED"}
      >
        {isPending ? "Loading ..." : "Available"}
      </Status>
      <Switch defaultChecked={isAvailable} onCheckedChange={handleClick} />
    </article>
  );
};

export default AvailableControl;
