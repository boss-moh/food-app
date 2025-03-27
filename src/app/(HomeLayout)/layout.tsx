import "@/styles/globals.css";
import Header from "@/components/header";
import { Footer } from "@/components/Footer";
import { childrenProps } from "@/constants";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function RootLayout({ children }: childrenProps) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Header />
      <main className="min-h-screen bg-background">{children}</main>
      <Footer />
    </SessionProvider>
  );
}
