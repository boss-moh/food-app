"use client";
import { childrenProps } from "@/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export * from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }: childrenProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export { ReactQueryProvider };
