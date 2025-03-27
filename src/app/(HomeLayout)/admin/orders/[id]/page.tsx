import { EmptyOrder } from "@/components/share";
import { DynamicProps } from "@/constants";
import { fetchOrdersById } from "@/lib";
import { Suspense } from "react";
import { EditOrder } from "./EditOrder";

export default async function OrderDetailsPage({ params }: DynamicProps<"id">) {
  const id = (await params).id;
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order #{id}</h1>
      </div>

      <Suspense fallback={<span>Loading ....</span>}>
        <Order id={id} />
      </Suspense>
    </div>
  );
}

const Order = async ({ id }: { id: string }) => {
  const order = await fetchOrdersById(id);
  if (!order) return <EmptyOrder />;
  return <EditOrder order={order}></EditOrder>;
};
