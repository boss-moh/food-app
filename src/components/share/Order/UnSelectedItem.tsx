import { AlertCircle } from "lucide-react";

export const UnSelectedItem = () => (
  <div className="text-center py-12">
    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
    <h3 className="text-lg font-medium">No active order</h3>
    <p className="text-muted-foreground">
      Select an order from the list to view details
    </p>
  </div>
);
