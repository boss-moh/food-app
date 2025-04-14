import { Suspense } from "react";
import ServerFetch from "./ServerFetch";

export const dynamic = "force-dynamic";
const DriverPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">Driver Dashboard</h1>

      <Suspense fallback="Loading ...">
        <ServerFetch />
      </Suspense>
    </div>
  );
};

export default DriverPage;
