import type React from "react";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/ui/shared/navbar";
import { getMe } from "@/server/getMe";
import Footer from "@/components/ui/shared/footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user=await getMe()
  return (
    <html lang="en" className="h-full antialiased">
  <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 bg-red-400">
    <Navbar user={user} />

    <Toaster position="top-right" />

    <main className="flex-1">
      {children}
    </main>

    <Footer />
  </body>
</html>
  );
}