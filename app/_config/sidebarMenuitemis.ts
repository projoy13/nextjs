import { ISidebarItem } from "@/lib/types"
import { FileText, LayoutDashboard, LucideIcon, User, User2 } from "lucide-react"





const CUSTOMER_SIDEBAR_ITEMS:ISidebarItem[]=[
    {
        label:"Dashboard",
        href:"/dashboard",
        icon:LayoutDashboard

    },
    {
        label:"My rentals",
        href:"/UsersRentals",
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
        href:"/provider-dashboard/usergear",
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
        label:"See All gears",
        href:"/Gears",
        icon:FileText

    },
    {
        label:"See All users",
        href:"/admin-dashboard/All-users",
        icon:User

    }

]

export const sidebarMenuItems={
    CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
    PROVIDER:Provider_SIDEBAR_ITEMS,
    ADMIN:ADMIN_SIDEBAR_ITEMS,
}