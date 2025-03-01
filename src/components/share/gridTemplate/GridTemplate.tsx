import { childrenProps } from "@/constants";

export const GridTemplate = ({ children }: childrenProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
};

export default GridTemplate;
