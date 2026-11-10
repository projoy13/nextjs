"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// import { sidebarMenuItems } from "../_config/sidebarMenuitems";
import type { ISidebarItem, NavbarProps } from "@/lib/types";
import { sidebarMenuItems } from "../provider-dashboard/_config/sidebarMenuitems";

export default function AppSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  let navItems: ISidebarItem[] = [];

  if (user?.role === "CUSTOMER") {
    navItems = sidebarMenuItems.CUSTOMER;
  } else if (user?.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  } else if (user?.role === "PROVIDER") {
    navItems = sidebarMenuItems.PROVIDER;
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-xl font-bold text-blue-600">GearRental</h2>
        <p className="text-xs text-muted-foreground">Dashboard</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/provider-dashboard" &&
                    pathname.startsWith(item.href + "/"));

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/provider-dashboard/profile">
                <User />
                <span>My Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/login">
                <LogOut />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}