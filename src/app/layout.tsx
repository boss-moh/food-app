import type React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";
import { font } from "@/fonts";
import { ReactQueryProvider } from "@/lib";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "TastyLife - Food Delivery",
  description: "Delicious food delivered to your doorstep",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={font.className}>
          <ReactQueryProvider>
            <Header />
            <main className="min-h-screen bg-background">{children}</main>
            <Toaster />
            <Footer />
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
