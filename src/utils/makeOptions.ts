import type { option } from "@/constants";

export function makeOptions<T>(
  input: T[],
  fn: (i: T) => option,
  withAll: boolean = true
) {
  const options = input.map(fn);

  if (withAll) {
    return [
      {
        name: "All",
        value: "all",
      },
      ...options,
    ];
  }

  return options;
}
