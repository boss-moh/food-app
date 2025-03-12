import { ReactNode } from "react";

export {};

export type DynamicProps<T extends string> = {
  params: Promise<Record<T, string>>;
};
export type searchParamsProps<T extends string> = {
  searchParams: Promise<Record<T, string>>;
};
export type childrenProps = {
  children: ReactNode;
};

export type { product as productType } from "@prisma/client";
export type { Category as categoryType } from "@prisma/client";

export type option = {
  name: string;
  value: string;
};
