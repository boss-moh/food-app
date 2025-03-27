"use client";
import { Check, CreditCard, Truck, AlertCircle, X } from "lucide-react";

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
import {
  addressSchema,
  addressType,
  API_END_POINT,
  MessageType,
  OrderItemClientType,
} from "@/constants";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

const steps = [
  { title: "Review Order", icon: Check },
  { title: "Processing", icon: CreditCard },
  { title: "Confirmed", icon: Truck },
];

const numbers = {
  summary: 0,
  submitting: 1,
  success: 2,
  error: 2,
};

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

  const { isPending, isSuccess, mutate, isError, reset } = useMutation({
    mutationFn: async (data: addressType) => {
      const orderItems = items.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
      return await axios.post<void, MessageType>(
        API_END_POINT.USER.ORDERS.CREATE,
        { orderItems, address: data.address }
      );
    },
    onSuccess(data) {
      toast.success(data.message);
      clear();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const currentStep = isPending
    ? "submitting"
    : isSuccess
    ? "success"
    : isError
    ? "error"
    : "summary";

  const handleSubmit = async (data: addressType) => {
    if (isPending) return;
    mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent onEscapeKeyDown={onClose} className="sm:max-w-[500px] p-0">
        <Header currentStep={numbers[currentStep]} />

        <Separator className="my-2" />

        {currentStep === "summary" && (
          <ConfrimStep onClose={onClose} onSubmit={handleSubmit} />
        )}
        {currentStep === "submitting" && <ProcessingStep />}
        {currentStep === "success" && <SuccessStep />}
        {currentStep === "error" && <ErrorStep reset={reset} />}
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
const SuccessStep = () => {
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

interface ConfrimStepProps {
  onClose: () => void;
  onSubmit: (data: addressType) => void;
}
const ConfrimStep = ({ onClose, onSubmit }: ConfrimStepProps) => {
  const [step, setStep] = useState("summary");

  const form = useForm({
    resolver: zodResolver(addressSchema),
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <>
      {step === "summary" && (
        <SummaryStep onClose={onClose} onClick={() => setStep("address")} />
      )}
      {step === "address" && (
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <header className="flex items-center gap-2 text-2xl">
              <Truck className="mr-2 h-6 w-6" />
              <h3 className=" font-bold">Delivery Information</h3>
            </header>

            <Form {...form}>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery address</FormLabel>
                    <FormControl>
                      <Input placeholder="address" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your delivery address{" "}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
            <div className="flex justify-end ">
              <Button type="submit">Confirm Order</Button>
            </div>
          </div>
        </form>
      )}
    </>
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
const ErrorStep = ({ reset }: { reset: () => void }) => {
  return (
    <div
      key="confirmed"
      className="flex flex-col items-center justify-center px-6 py-12"
    >
      <div className="p-3 bg-red-100 rounded-full">
        <X className="w-10 h-10 text-destructive" />
      </div>
      <h3 className="mt-6 text-lg font-semibold">Order Creation Failed!</h3>
      <p className="mt-2 text-sm text-center text-destructive-foreground">
        There was an error processing your order. Please try again or contact
        customer support if the problem persists.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
};
