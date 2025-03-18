"use client";

import { useSession } from "next-auth/react";

const ClientSide = () => {
  const session = useSession();
  console.log("session on Client ", session);
  return <div>ClientSide</div>;
};

export default ClientSide;
