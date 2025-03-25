// "use client";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Status from "../Status";
// import Summary from "../Summary";
// import { CartItem } from "../cart";
// import { orderDetailsType } from "@/constants";
// import { Label } from "@/components/ui/label";
// // import Selecter from "../Selecter";
// import { getCalcInfo } from "@/utils";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { orderStatusOptions } from "@/app/(HomeLayout)/admin/orders/OrderSelectes";
// import Selecter from "../Selecter";

// export const EditOrder = ({ order }: { order: orderDetailsType }) => {
//   const items = order.items;
//   const summaryDetails = getCalcInfo(items);
//   return (
//     <Card className="w-full">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <div>
//           <CardTitle className="text-xl flex  gap-2">
//             <span>Order</span>
//             <span className="w-40 truncate inline-block"> #{order.id}</span>
//           </CardTitle>
//           <p className="text-sm text-muted-foreground">
//             Placed on {order.createdAt.toDateString()}
//           </p>
//         </div>
//         {/* <Status status={order.status} className="text-xs" /> */}
//           <Selecter onChange={(status)=>console.log(status)} options={orderStatusOptions} />
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* Order Items */}
//         {items.map((item) => (
//           <CartItem
//             update={() => console.log("update")}
//             removeItem={() => console.log("removeItem")}
//             {...item}
//             key={item.product.id}
//           />
//         ))}

//         <Separator className="my-4" />

//         {/* Order Summary */}
//         <Summary {...summaryDetails} />
//       </CardContent>
//       <CardFooter>
//         <Button variant="outline" onClick={() => console.log("cancel")}>
//           Cancel
//         </Button>
//         <Button onClick={() => console.log("saving")}>
//           {/* {isSubmitting ? "Saving..." : ""} */}
//           Save Changes
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default EditOrder;
