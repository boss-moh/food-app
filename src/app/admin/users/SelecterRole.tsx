"use client";

import { changeRoleAction } from "@/actions/user/changeRoleAction";
import { Selecter } from "@/components/share";
import { RoleStatus, RoleType } from "@/constants";
import { makeOptions } from "@/utils";
import { useAction } from "next-safe-action/hooks";
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

export const SelecterRole = ({ role, userId }: SelecterRoleProps) => {
  const { execute, isPending } = useAction(changeRoleAction, {
    onSuccess(response) {
      toast.success("Success", {
        description: response.data?.message,
      });
    },
    onError(response) {
      toast.error("Faild", {
        description: response.error.serverError,
      });
    },
  });

  const handleChange = (newRole: RoleType) => {
    if (isPending) return;
    execute({ id: userId, role: newRole });
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
