import type React from "react";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/ui/shared/navbar";
import { getMe } from "@/server/getMe";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user=await getMe()
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar user={user}></Navbar>
        <Toaster position="top-right"></Toaster>
        {children}
      </body>
    </html>
  );
}