import { Suspense } from "react";
import ServerFetch from "./ServerFetch";

export const dynamic = "force-dynamic";
export default function ChefPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">Chef Dashboard</h1>

      <Suspense fallback="Loading ...">
        <ServerFetch />
      </Suspense>
    </div>
  );
}
