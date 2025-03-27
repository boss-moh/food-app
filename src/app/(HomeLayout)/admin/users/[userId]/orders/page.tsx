import { UserOrders } from "@/components/share";
import { DynamicProps } from "@/constants";
import { Suspense } from "react";

export default async function UsersOrdersPage({
  params,
}: DynamicProps<"userId">) {
  const userId = (await params).userId;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Orders Made By Uesr - {userId}
      </h1>

      <Suspense fallback={<span> Loading ...</span>}>
        <UserOrders userId={userId} />
      </Suspense>
    </div>
  );
}
