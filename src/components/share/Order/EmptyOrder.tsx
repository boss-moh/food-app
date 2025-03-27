import { ShoppingBag } from "lucide-react";

export const EmptyOrder = () => {
  return (
    <div className="mx-auto">
      <div className="text-center py-8">
        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
        {/* <p className="text-muted-foreground mb-4">
          Try adjusting your search or filter criteria
        </p> */}
      </div>
    </div>
  );
};

export default EmptyOrder;
