
import AppSidebar from "./_components/AppSidebar";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { TooltipProvider } from "@/components/ui/tooltip";
import { getMe } from "@/server/getMe";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const user=await getMe()
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar user={user} />

        <SidebarInset>
          <header className="flex h-14 items-center gap-3 border-b bg-white px-4">
            <SidebarTrigger />
            <h1 className="font-semibold">
              Provider Dashboard
            </h1>
          </header>

          <main className="flex-1 p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
