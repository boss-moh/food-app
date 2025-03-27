import type { Metadata } from "next";

import { ReactQueryProvider } from "@/lib";
import { childrenProps } from "@/constants";

import { font } from "@/fonts";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "TastyGo - Food Delivery",
  description: "Delicious food delivered to your doorstep",
};

export default async function RootLayout({ children }: childrenProps) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>

        <Toaster richColors />
      </body>
    </html>
  );
}
