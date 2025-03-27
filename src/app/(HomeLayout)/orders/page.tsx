import { UserOrders } from "@/components/share";
import { auth } from "@/auth";
import { Suspense } from "react";

export default async function OrdersPage() {
  const session = await auth();
  const userId = session!.user.id;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <Suspense fallback={<span> Loading ...</span>}>
        <UserOrders userId={userId} />
      </Suspense>
    </div>
  );
}
