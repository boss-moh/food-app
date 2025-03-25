"use client";
import { Check, CreditCard, Truck, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { OrderItems, Summary } from "@/components/share";
import { LoadingIcon } from "@/components/svg/loadingIcon";

import { useOrder } from "@/store";
import { cn, axios, useMutation } from "@/lib";
import { API_END_POINT, OrderItemClientType } from "@/constants";

const steps = [
  { title: "Review Order", icon: Check },
  { title: "Processing", icon: CreditCard },
  { title: "Confirmed", icon: Truck },
];

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItemClientType[];
}

export function OrderConfirmationModal({
  isOpen,
  onClose,
}: OrderConfirmationModalProps) {
  const { items, clear } = useOrder();

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: async () => {
      const orderItems = items.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
      return await axios.post(API_END_POINT.USER.ORDERS.CREATE, orderItems);
    },
  });

  const currentStep = isPending ? 1 : isSuccess ? 2 : 0;

  const handleSuccess = () => {
    if (isSuccess) {
      clear();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleSuccess}>
      <DialogContent
        onEscapeKeyDown={handleSuccess}
        className="sm:max-w-[500px] p-0"
      >
        <Header currentStep={currentStep} />

        <Separator className="my-2" />

        {currentStep === 0 && (
          <SummaryStep onClose={onClose} onClick={mutate} />
        )}
        {currentStep === 1 && <ProcessingStep />}
        {currentStep === 2 && <ConfirmedStep />}
      </DialogContent>
    </Dialog>
  );
}

const Header = ({ currentStep = 0 }) => {
  const classes = {
    title: {
      active: "text-foreground",
      un_active: "text-muted-foreground/50",
    },
  };
  return (
    <div className="flex items-center justify-between px-6 pt-6 pb-2 mt-2">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              index <= currentStep
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground/30 text-muted-foreground/30"
            }`}
          >
            <step.icon className="w-5 h-5" />
            {index < currentStep && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          <span
            className={cn(
              "mt-2 text-xs font-medium ",
              index <= currentStep
                ? classes.title.active
                : classes.title.un_active
            )}
          >
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
};

const ProcessingStep = () => {
  return (
    <div
      key="processing"
      className="flex flex-col items-center justify-center px-6 py-12"
    >
      <div className="relative w-16 h-16">
        <LoadingIcon />
      </div>
      <h3 className="mt-6 text-lg font-semibold">Processing Your Order</h3>
      <p className="mt-2 text-sm text-center text-muted-foreground">
        Please wait while we process your payment and confirm your order.
      </p>
    </div>
  );
};
const ConfirmedStep = () => {
  return (
    <div
      key="confirmed"
      className="flex flex-col items-center justify-center px-6 py-12"
    >
      <div className="p-3 bg-green-100 rounded-full">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h3 className="mt-6 text-lg font-semibold">Order Confirmed!</h3>
      <p className="mt-2 text-sm text-center text-muted-foreground">
        Your order has been successfully placed. You Can See The Status Of Your
        Order In The Orders Page
      </p>
    </div>
  );
};

const SummaryStep = ({ onClose = () => {}, onClick = () => {} }) => {
  const { items, getOrderDetails } = useOrder();
  const summaryDetails = getOrderDetails();

  return (
    <div key="review">
      <DialogHeader className="px-6 pt-4">
        <DialogTitle>Confirm Your Order</DialogTitle>
        <DialogDescription>
          Please review your order details before confirming your purchase.
        </DialogDescription>
      </DialogHeader>

      <div className="px-6 py-4">
        {/* <div className="mb-4">
        <h4 className="flex items-center mb-2 text-sm font-medium">
          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
          Delivery Address
        </h4>
        <p className="text-sm text-muted-foreground">
          123 Main Street, Apt 4B, New York, NY 10001
        </p>
      </div> */}

        <OrderItems className="h-[250px]" items={items} />

        <Summary {...summaryDetails} />

        <div className="flex items-center gap-2 p-3 mt-4 rounded-md bg-amber-50 text-amber-800">
          <AlertCircle className="w-4 h-4" />
          <p className="text-xs">
            By confirming your order, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </div>

      <DialogFooter className="px-6 py-4 bg-muted/30">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClick}>Confirm Order</Button>
      </DialogFooter>
    </div>
  );
};
