"use client";

import { Selecter } from "@/components/share";
import { useUserSelecter } from "./useUserSelecter";
import { makeOptions } from "@/utils";
import { RoleStatus } from "@/constants";

const UesrRoleoptions = makeOptions(
  Object.values(RoleStatus),
  (value) => ({
    value: value.toLowerCase(),
    name: value,
  }),
  true
);

export const UserSelecter = () => {
  const settings = useUserSelecter();
  return <Selecter {...settings} options={UesrRoleoptions} />;
};

export default UserSelecter;
