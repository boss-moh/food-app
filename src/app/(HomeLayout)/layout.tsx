import "@/styles/globals.css";
import Header from "@/components/header";
import { Footer } from "@/components/Footer";
import { childrenProps } from "@/constants";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({ children }: childrenProps) {
  return (
    <SessionProvider>
      <Header />
      <main className="min-h-screen bg-background">{children}</main>
      <Footer />
    </SessionProvider>
  );
}
