
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Menu,
  User,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/server/logout";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Gears", href: "/Gears" },
  { label: "Reviews", href: "/Reviews" },
  { label: "Myrentals", href: "/Myrentals" },
  { label: "About", href: "/about" },
];

const userMenuItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Billing", href: "/billing", icon: CreditCard },
];

type IUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type NavbarProps = {
  user: IUser | null;
};

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logout();

      if (result.success) {
        toast.success(result.message);

        router.replace("/login");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong during logout.");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight">
            Gear-up
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">

            {/* Mobile navigation */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="size-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Open user menu"
                  >
                    <User className="size-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-52">

                  {/* User information */}
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>

                      <span className="text-xs font-normal text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {/* User menu items */}
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>
                          <Icon className="mr-2 size-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}

                  <DropdownMenuSeparator />

                  {/* Logout */}
                  <DropdownMenuItem
                    onSelect={handleLogout}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 size-4" />
                    Log out
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
  asChild
  variant={pathname === "/login" ? "default" : "outline"}
>
  <Link href="/login">Login</Link>
</Button>

<Button
  asChild
  variant={pathname === "/register" ? "default" : "outline"}
>
  <Link href="/register">Register</Link>
</Button>
              </div>
            )}

          </div>
        </nav>
      </header>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to Gear-up world
        </h1>

        <p className="mt-3 text-muted-foreground">
          You can rent any gear at any time
        </p>
      </section>
    </main>
  );
}
