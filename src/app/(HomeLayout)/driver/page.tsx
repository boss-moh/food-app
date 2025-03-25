"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Navigation,
  Clock,
  CheckCircle2,
  Package,
  AlertCircle,
  Calendar,
  Phone,
} from "lucide-react";

// Mock data for deliveries
const deliveries = [
  {
    id: "DEL1001",
    customer: {
      name: "John Smith",
      address: "123 Main St, Apt 4B, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    restaurant: {
      name: "Tasty Bites",
      address: "456 Food Ave, New York, NY 10002",
    },
    items: [
      { name: "Mighty Super Cheesecake", quantity: 1 },
      { name: "Berry Bliss Smoothie", quantity: 2 },
    ],
    status: "ready",
    estimatedDistance: "2.3 miles",
    estimatedTime: "15 min",
    orderTime: "2024-03-26T10:30:00Z",
    paymentMethod: "Card",
    total: 32.99,
    tip: 5.0,
  },
  {
    id: "DEL1002",
    customer: {
      name: "Emily Johnson",
      address: "789 Park Ave, New York, NY 10003",
      phone: "+1 (555) 987-6543",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    restaurant: {
      name: "Pasta Paradise",
      address: "101 Italian Blvd, New York, NY 10004",
    },
    items: [
      { name: "Spinach and Cheese Pasta", quantity: 1 },
      { name: "Garlic Bread", quantity: 1 },
    ],
    status: "in_progress",
    estimatedDistance: "3.5 miles",
    estimatedTime: "20 min",
    orderTime: "2024-03-26T10:45:00Z",
    paymentMethod: "Cash",
    total: 28.5,
    tip: 4.5,
  },
  {
    id: "DEL1003",
    customer: {
      name: "Michael Brown",
      address: "321 Broadway, New York, NY 10005",
      phone: "+1 (555) 456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    restaurant: {
      name: "Burger Bonanza",
      address: "202 Fast Food Lane, New York, NY 10006",
    },
    items: [
      { name: "Mighty Cherry Breakfast Burger", quantity: 2 },
      { name: "Fresh Glazed Donuts", quantity: 1 },
    ],
    status: "completed",
    estimatedDistance: "1.8 miles",
    estimatedTime: "12 min",
    orderTime: "2024-03-26T09:15:00Z",
    paymentMethod: "Card",
    total: 42.75,
    tip: 8.0,
  },
];

// Mock data for driver stats
const driverStats = {
  name: "Alex Driver",
  avatar: "/placeholder.svg?height=128&width=128",
  rating: 4.8,
  totalDeliveries: 342,
  todayDeliveries: 5,
  totalEarnings: 4250.75,
  todayEarnings: 87.5,
  status: "active",
};

export default function DriverDashboard() {
  const { toast } = useToast();
  const [activeDelivery, setActiveDelivery] = useState<string | null>(
    "DEL1002"
  );
  const [deliveryStatus, setDeliveryStatus] = useState<Record<string, string>>({
    DEL1001: "ready",
    DEL1002: "in_progress",
    DEL1003: "completed",
  });

  const selectedDelivery =
    deliveries.find((d) => d.id === activeDelivery) || deliveries[0];

  const handleStatusChange = (deliveryId: string, newStatus: string) => {
    setDeliveryStatus((prev) => ({
      ...prev,
      [deliveryId]: newStatus,
    }));

    toast({
      title: "Status updated",
      description: `Delivery #${deliveryId} is now ${newStatus.replace(
        "_",
        " "
      )}`,
      variant: "success",
    });

    // If completed, move to the next delivery
    if (newStatus === "completed" && activeDelivery === deliveryId) {
      const nextDelivery = deliveries.find(
        (d) => deliveryStatus[d.id] !== "completed" && d.id !== deliveryId
      );
      if (nextDelivery) {
        setActiveDelivery(nextDelivery.id);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Ready for pickup
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            In progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case "ready":
        return 25;
      case "in_progress":
        return 75;
      case "completed":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Driver Profile Section */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Driver Dashboard</CardTitle>
              <CardDescription>
                Manage your deliveries and track your earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={driverStats.avatar}
                    alt={driverStats.name}
                  />
                  <AvatarFallback>{driverStats.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{driverStats.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{driverStats.rating}</span>
                  <Badge
                    variant="outline"
                    className="ml-2 bg-green-100 text-green-800"
                  >
                    {driverStats.status === "active" ? "Active" : "Offline"}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    Today's Deliveries
                  </p>
                  <p className="text-2xl font-bold">
                    {driverStats.todayDeliveries}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    Today's Earnings
                  </p>
                  <p className="text-2xl font-bold">
                    ${driverStats.todayEarnings.toFixed(2)}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    Total Deliveries
                  </p>
                  <p className="text-2xl font-bold">
                    {driverStats.totalDeliveries}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    Total Earnings
                  </p>
                  <p className="text-2xl font-bold">
                    ${driverStats.totalEarnings.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Upcoming Deliveries</h3>
                {deliveries
                  .filter((d) => deliveryStatus[d.id] !== "completed")
                  .map((delivery) => (
                    <div
                      key={delivery.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        activeDelivery === delivery.id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveDelivery(delivery.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">
                            {delivery.restaurant.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Order #{delivery.id}
                          </p>
                        </div>
                        {getStatusBadge(deliveryStatus[delivery.id])}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>ETA: {delivery.estimatedTime}</span>
                        <span className="mx-2">•</span>
                        <span>{delivery.estimatedDistance}</span>
                      </div>
                    </div>
                  ))}

                {deliveries.filter((d) => deliveryStatus[d.id] !== "completed")
                  .length === 0 && (
                  <div className="text-center py-6 bg-muted/30 rounded-lg">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-2" />
                    <h3 className="text-lg font-medium">All caught up!</h3>
                    <p className="text-sm text-muted-foreground">
                      You've completed all your deliveries for now.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Delivery Section */}
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Active Delivery</CardTitle>
              <CardDescription>
                {selectedDelivery
                  ? `Order #${selectedDelivery.id} details`
                  : "No active delivery selected"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDelivery ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={selectedDelivery.customer.avatar}
                          alt={selectedDelivery.customer.name}
                        />
                        <AvatarFallback>
                          {selectedDelivery.customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          {selectedDelivery.customer.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedDelivery.customer.phone}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Customer
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        Pickup Location
                      </h3>
                      <div className="bg-muted p-3 rounded-lg mt-2">
                        <p className="font-medium">
                          {selectedDelivery.restaurant.name}
                        </p>
                        <p className="text-sm">
                          {selectedDelivery.restaurant.address}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Delivery Location
                      </h3>
                      <div className="bg-muted p-3 rounded-lg mt-2">
                        <p className="text-sm">
                          {selectedDelivery.customer.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {selectedDelivery.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span>{item.name}</span>
                          <span>x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Payment Method
                      </span>
                      <span>{selectedDelivery.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Order Total</span>
                      <span>${selectedDelivery.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tip</span>
                      <span>${selectedDelivery.tip.toFixed(2)}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Delivery Progress</h3>
                    {/* <Progress
                      value={getProgressValue(
                        deliveryStatus[selectedDelivery.id]
                      )}
                      className="h-2"
                    /> */}
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Pickup</span>
                      <span>In Transit</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No active delivery</h3>
                  <p className="text-muted-foreground">
                    Select a delivery from the list to view details
                  </p>
                </div>
              )}
            </CardContent>
            {selectedDelivery && (
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-primary" />
                  <span>
                    {selectedDelivery.estimatedDistance} •{" "}
                    {selectedDelivery.estimatedTime}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Open Maps</Button>
                  {deliveryStatus[selectedDelivery.id] === "ready" && (
                    <Button
                      onClick={() =>
                        handleStatusChange(selectedDelivery.id, "in_progress")
                      }
                    >
                      Start Delivery
                    </Button>
                  )}
                  {deliveryStatus[selectedDelivery.id] === "in_progress" && (
                    <Button
                      onClick={() =>
                        handleStatusChange(selectedDelivery.id, "completed")
                      }
                    >
                      Complete Delivery
                    </Button>
                  )}
                  {deliveryStatus[selectedDelivery.id] === "completed" && (
                    <Button variant="outline" disabled>
                      Completed
                    </Button>
                  )}
                </div>
              </CardFooter>
            )}
          </Card>

          {/* Weekly Schedule */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Your upcoming shifts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    day: "Monday",
                    date: "Mar 27",
                    time: "9:00 AM - 5:00 PM",
                    hours: 8,
                  },
                  {
                    day: "Tuesday",
                    date: "Mar 28",
                    time: "10:00 AM - 6:00 PM",
                    hours: 8,
                  },
                  {
                    day: "Wednesday",
                    date: "Mar 29",
                    time: "9:00 AM - 5:00 PM",
                    hours: 8,
                  },
                  { day: "Thursday", date: "Mar 30", time: "Off", hours: 0 },
                  {
                    day: "Friday",
                    date: "Mar 31",
                    time: "12:00 PM - 8:00 PM",
                    hours: 8,
                  },
                ].map((shift, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 border-b last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 rounded-full p-2">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {shift.day}, {shift.date}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {shift.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{shift.hours} hours</p>
                      {shift.hours > 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800"
                        >
                          Scheduled
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800"
                        >
                          Day Off
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
