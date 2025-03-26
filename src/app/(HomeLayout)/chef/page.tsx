import { Suspense } from "react";
import ServerFetch from "./ServerFetch";

const ChefPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">Chef Dashboard</h1>

      <Suspense fallback="Loading ...">
        <ServerFetch />
      </Suspense>
    </div>
  );
};

export default ChefPage;
