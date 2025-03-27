import { Separator } from "@/components/ui/separator";
import { SummaryType } from "@/constants";
import { formatPrice } from "@/utils";

export const Summary = ({ subTotal, tax, total }: SummaryType) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-muted-foreground">SubTotal</span>
        <span>{formatPrice(subTotal)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Tax</span>
        <span>{formatPrice(tax)}</span>
      </div>

      <Separator className="my-2" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
};

export default Summary;
