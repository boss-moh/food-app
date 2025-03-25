import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib";

export const EmptyFeedBack = () => {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium mb-2">No Items found</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
};

export const EmptyRows = ({ colSpan = 1 }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center ">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">No Items found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
};

interface LoadingRowProps {
  classes?: Record<string, string>;
  count?: number;
}

export const LoadingRow = ({ count = 5, classes = {} }: LoadingRowProps) => {
  return (
    <TableRow>
      {new Array(count).fill(0).map((_, index) => (
        <TableCell key={index} className={cn(" h-[70px] ", classes?.[index])}>
          <Skeleton className="h-[20px]" />
        </TableCell>
      ))}
    </TableRow>
  );
};
