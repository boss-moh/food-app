import type { Metadata } from "next";
// import { font } from "@/fonts";
import { childrenProps } from "@/constants";
import "@/styles/globals.css";
import Header from "@/components/header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "TastyGo - Food Delivery",
  description: "Delicious food delivered to your doorstep",
};

export default function RootLayout({ children }: childrenProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen bg-background">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
