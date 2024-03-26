import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import type { Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/utils";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Uptime Monitor",
  description: "A simple uptime monitor for your websites.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico"
    }
  ]
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "bg-dark-900 min-h-screen overflow-x-hidden antialiased",
            roboto.className
          )}
        >
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
