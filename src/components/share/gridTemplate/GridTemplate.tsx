import { childrenProps } from "@/constants";

export const GridTemplate = ({ children }: childrenProps) => {
  return (
    // sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
    <div className="grid gap-6 grid-cols-auto-fit ">{children}</div>
  );
};

export default GridTemplate;
