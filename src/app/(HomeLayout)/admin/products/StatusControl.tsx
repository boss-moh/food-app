"use client";
import { Status } from "@/components/share";
import { Switch } from "@/components/ui/switch";
import { API_END_POINT, MessageType } from "@/constants";
import { axios, useMutation } from "@/lib";
import { toast } from "sonner";

type StatusControlProps = {
  id: string;
  isAvailable: boolean;
  onSuccess: (id: string) => void;
};

export const StatusControl = ({
  id,
  isAvailable,
  onSuccess,
}: StatusControlProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await axios.put<void, MessageType>(
        API_END_POINT.PRODUCT.CHANGE_AVAILABLE(id),
        {
          available: !isAvailable,
        }
      ),
    onSuccess(data) {
      toast.success(data.message);
      onSuccess(id);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    if (isPending) return;
    mutate();
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

export default StatusControl;
