"use client";

import { Selecter } from "@/components/share";
import { API_END_POINT, RoleStatus, RoleType } from "@/constants";
import { axios } from "@/lib";
import { makeOptions } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface SelecterRoleProps {
  role: RoleType;
  userId: string;
}

const UesrRoleoptions = makeOptions(
  Object.values(RoleStatus),
  (value) => ({
    value,
    name: value,
  }),
  false
);

type ObjMessage = {
  message: string;
};

export const SelecterRole = ({ role, userId }: SelecterRoleProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (newRole: RoleType) =>
      await axios.put<void, ObjMessage>(
        API_END_POINT.ADMIN.USERS.UPDATE_ROLE(userId),
        {
          role: newRole,
        }
      ),
    onSuccess(data) {
      toast.success("Success", {
        description: data.message,
      });
    },
    onError(error) {
      toast.error("Faild", {
        description: error.message,
      });
    },
  });

  const handleChange = (newRole: RoleType) => {
    if (isPending) return;
    mutate(newRole);
  };

  return (
    <Selecter
      className="w-32"
      onChange={(newRole) => handleChange(newRole as RoleType)}
      options={UesrRoleoptions}
      defaultValue={role}
    />
  );
};

export default SelecterRole;
