import { ReactNode } from "react";

export {};

export type DynamicProps<T extends string> = {
  params: Record<T, string>;
};
export type childrenProps = {
  children: ReactNode;
};

export type { product as productType } from "@prisma/client";
