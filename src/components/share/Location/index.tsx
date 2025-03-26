import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const Location = ({ address }: { address: string }) => {
  return (
    <Card className="p-2">
      <CardHeader className="p-3">
        <h3 className="font-medium flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          Delivery Location
        </h3>
      </CardHeader>
      <CardContent className="bg-muted p-3 rounded-lg">
        <p className="text-sm">{address}</p>
      </CardContent>
    </Card>
  );
};

export default Location;
