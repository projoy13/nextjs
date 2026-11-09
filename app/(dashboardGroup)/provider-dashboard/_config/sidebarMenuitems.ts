import { FileText, LayoutDashboard } from "lucide-react"

const USER_SIDEBAR_ITEM=[
    {
        label:"Dashboard",
        href:"/dashboard",
        icon:LayoutDashboard

    },
    {
        label:"my rentals",
        href:"/Gears",
        icon:FileText

    }
]
const Provider_SIDEBAR_ITEM=[
    {
        label:"provider Dashboard",
        href:"/dashboard",
        icon:LayoutDashboard

    },
    {
        label:"my rentals",
        href:"/Gears",
        icon:FileText

    }
]

export const sidebarMenuItems={
    USER:[],
    PROVIDER:[],
    ADMIN:[]
}