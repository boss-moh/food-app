import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TastyLife - Food Delivery",
  description: "Delicious food delivered to your doorstep",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-background">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
