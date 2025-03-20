"use client";

import { useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, CreditCard, MapPin, Truck, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  onConfirmOrder: () => Promise<void>;
}

export function OrderConfirmationModal({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  tax,
  shipping,
  total,
  onConfirmOrder,
}: OrderConfirmationModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const steps = [
    { title: "Review Order", icon: Check },
    { title: "Processing", icon: CreditCard },
    { title: "Confirmed", icon: Truck },
  ];

  const handleConfirmOrder = async () => {
    try {
      setIsProcessing(true);
      setCurrentStep(1);

      // Simulate API call to process order
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await onConfirmOrder();
      setCurrentStep(2);

      // Simulate completion delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Order Confirmed!",
        description: "Your order has been successfully placed.",
        variant: "default",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
      setCurrentStep(0);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !isProcessing && !open && onClose()}
    >
      <DialogContent className="sm:max-w-[500px] p-0">
        {/* Progress Steps */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
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
                className={`mt-2 text-xs font-medium ${
                  index <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground/50"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-2" />

        <>
          {currentStep === 0 && (
            <div key="review">
              <DialogHeader className="px-6 pt-4">
                <DialogTitle>Confirm Your Order</DialogTitle>
                <DialogDescription>
                  Please review your order details before confirming your
                  purchase.
                </DialogDescription>
              </DialogHeader>

              <div className="px-6 py-4">
                <div className="mb-4">
                  <h4 className="flex items-center mb-2 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    Delivery Address
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    123 Main Street, Apt 4B, New York, NY 10001
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium">Order Summary</h4>
                  <ScrollArea className="h-[180px] rounded-md border p-2">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <div className="flex-1">
                            <span className="font-medium">{item.name}</span>
                            <span className="ml-1 text-muted-foreground">
                              x{item.quantity}
                            </span>
                          </div>
                          <div>${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 mt-4 rounded-md bg-amber-50 text-amber-800">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-xs">
                    By confirming your order, you agree to our Terms of Service
                    and Privacy Policy.
                  </p>
                </div>
              </div>

              <DialogFooter className="px-6 py-4 bg-muted/30">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button onClick={handleConfirmOrder} disabled={isProcessing}>
                  Confirm Order
                </Button>
              </DialogFooter>
            </div>
          )}

          {currentStep === 1 && (
            <div
              key="processing"
              className="flex flex-col items-center justify-center px-6 py-12"
            >
              <div className="relative w-16 h-16">
                <svg
                  className="w-16 h-16 animate-spin text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-semibold">
                Processing Your Order
              </h3>
              <p className="mt-2 text-sm text-center text-muted-foreground">
                Please wait while we process your payment and confirm your
                order.
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div
              key="confirmed"
              className="flex flex-col items-center justify-center px-6 py-12"
            >
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Order Confirmed!</h3>
              <p className="mt-2 text-sm text-center text-muted-foreground">
                Your order has been successfully placed. You will receive a
                confirmation email shortly.
              </p>
            </div>
          )}
        </>
      </DialogContent>
    </Dialog>
  );
}
