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
  Mountain,
  ChevronDown,
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
  { label: "My Rentals", href: "/Myrentals" },
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
    } catch {
      toast.error("Something went wrong during logout.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f7f2]">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#101d1b] shadow-lg">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#b5e853] text-[#101d1b]">
              <Mountain size={25} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">
                Gear<span className="text-[#b5e853]">-up</span>
              </h1>
              <p className="text-[9px] font-semibold uppercase tracking-[3px] text-gray-400">
                Rent. Explore. Repeat.
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" &&
                  pathname.startsWith(item.href + "/"));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#b5e853] text-[#101d1b]"
                      : "text-gray-300 hover:bg-white/10 hover:text-[#b5e853]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* MOBILE MENU */}
            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/20 bg-white/5 text-white hover:bg-[#b5e853] hover:text-[#101d1b]"
                    aria-label="Open navigation menu"
                  >
                    <Menu size={21} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* USER MENU */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-[#b5e853]"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#b5e853] text-[#101d1b]">
                      <User size={17} />
                    </div>

                    <span className="hidden sm:inline">
                      {user.name}
                    </span>

                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{user.name}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

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
                  variant="ghost"
                  className="text-white hover:bg-white/10 hover:text-[#b5e853]"
                >
                  <Link href="/login">Login</Link>
                </Button>

                <Button
                  asChild
                  className="bg-[#b5e853] font-bold text-[#101d1b] hover:bg-[#a5d944]"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#101d1b]">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#b5e853]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-[#b5e853]/30 bg-[#b5e853]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#b5e853]">
              Your Adventure Starts Here
            </span>

            <h1 className="mt-7 text-4xl font-black leading-tight text-white sm:text-6xl">
              Gear Up.
              <span className="block text-[#b5e853]">
                Get Out There.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-400 sm:text-lg">
              Discover and rent quality equipment for your next
              adventure. Get the gear you need without the cost
              of ownership.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button
                asChild
                className="h-12 bg-[#b5e853] px-7 font-bold text-[#101d1b] hover:bg-[#a5d944]"
              >
                <Link href="/Gears">Explore Gears</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 border-white/30 bg-transparent px-7 text-white hover:bg-white/10 hover:text-[#b5e853]"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-28 -right-10 hidden h-96 w-96 items-center justify-center rounded-full border border-[#b5e853]/20 lg:flex">
            <div className="flex h-72 w-72 items-center justify-center rounded-full border border-[#b5e853]/20">
              <Mountain
                size={150}
                strokeWidth={0.8}
                className="text-[#b5e853]/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-black text-[#101d1b]">
          Welcome to Gear-up
        </h2>

        <p className="mt-3 text-gray-600">
          Find your equipment, rent what you need, and make
          every adventure count.
        </p>
      </section>
    </main>
  );
}