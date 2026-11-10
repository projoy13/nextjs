import { ISidebarItem } from "@/lib/types"
import { FileText, LayoutDashboard, LucideIcon } from "lucide-react"





const CUSTOMER_SIDEBAR_ITEMS:ISidebarItem[]=[
    {
        label:"Dashboard",
        href:"/dashboard",
        icon:LayoutDashboard

    },
    {
        label:"My rentals",
        href:"/Myrentals",
        icon:FileText

    },
    {
        label:"Available Gears",
        href:"/Gears",
        icon:FileText

    }
]
const Provider_SIDEBAR_ITEMS:ISidebarItem[]=[
    {
        label:"provider Dashboard",
        href:"/provider-dashboard",
        icon:LayoutDashboard

    },
    {
        label:"my Gears",
        href:"/provider-dashboard/mygear",
        icon:FileText

    }
]
const ADMIN_SIDEBAR_ITEMS:ISidebarItem[]=[
    {
        label:"Admin Dashboard",
        href:"/admin-dashboard",
        icon:LayoutDashboard

    },
    {
        label:"my rentals",
        href:"/Gears",
        icon:FileText

    }
]

export const sidebarMenuItems={
    CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
    PROVIDER:Provider_SIDEBAR_ITEMS,
    ADMIN:ADMIN_SIDEBAR_ITEMS,
}