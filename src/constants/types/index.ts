export {};

export type DynamicProps<T extends string> = {
  params: Record<T, string>;
};
