"use client";

import { Selecter } from "@/components/share";
import { useUserSelecter } from "./useUserSelecter";
import { UesrRoleoptions } from "@/constants";

export const UserSelecter = () => {
  const settings = useUserSelecter();
  return <Selecter {...settings} options={UesrRoleoptions} />;
};

export default UserSelecter;
