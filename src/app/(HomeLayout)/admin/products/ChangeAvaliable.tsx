"use client";
import { LoadingButton } from "@/components/share";
import { API_END_POINT, MessageType } from "@/constants";
import { axios, useMutation } from "@/lib";
import { toast } from "sonner";

type ChangeAvaliableProps = {
  id: string;
  isAvailable: boolean;
  onSuccess: (id: string) => void;
};

export const ChangeAvaliable = ({
  id,
  isAvailable,
  onSuccess,
}: ChangeAvaliableProps) => {
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
    <LoadingButton
      onClick={handleClick}
      size={"sm"}
      className="text-xs p-2"
      isLoading={isPending}
    >
      Toggle
    </LoadingButton>
  );
};

export default ChangeAvaliable;
