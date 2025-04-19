import type { Metadata } from "next";

import { ReactQueryProvider } from "@/lib";
import { childrenProps } from "@/constants";

import { font } from "@/fonts";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "TastyGo - Food Delivery",
  description: "Delicious food delivered to your doorstep",
};

export default async function RootLayout({ children }: childrenProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
