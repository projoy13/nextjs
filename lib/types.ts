import { LucideIcon } from "lucide-react";

type IUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
export type ISidebarItem={
 
    label:string,
    href:string,
    icon:LucideIcon,
}
 
export type NavbarProps = {
  user?: IUser | null;
};
