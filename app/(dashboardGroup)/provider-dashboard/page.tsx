
import Link from "next/link";
import { cookies } from "next/headers";
import {
  PlusCircle,
  Package,
  Pencil,
  Trash2,
  CalendarCheck,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface DashboardStats {
  totalGear: number;
  pendingOrders: number;
  activeRentals: number;
}

const ProviderDashboard = async () => {
  // Get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Default statistics
  let stats: DashboardStats = {
    totalGear: 0,
    pendingOrders: 0,
    activeRentals: 0,
  };

  // Fetch dashboard statistics
  try {
    if (accessToken) {
      const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        }
      );

      const result = await res.json();

      console.log("API response:", result);

      if (res.ok) {
        stats = result.data;
      } else {
        console.log(result);
      }
    }
  } catch (error) {
    console.error("Dashboard fetch error:", error);
  }

  const statistics = [
    {
      title: "Total Gear",
      value: stats.totalGear,
      icon: Package,
      href: "/provider-dashboard/mygear",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      href:"provider-dashboard/order-management",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Active Rentals",
      value: stats.activeRentals,
      icon: CalendarCheck,
      color: "bg-green-100 text-green-600",
    },
  ];

  const actions = [
    {
      title: "Create Gear",
      description: "Add a new gear item for customers to rent.",
      icon: PlusCircle,
      href: "/provider-dashboard/creatGearForm",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "My Gear",
      description: "View all gear items you have created.",
      icon: Package,
      href: "/provider-dashboard/mygear",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Update Gear",
      description: "Edit your existing gear information.",
      icon: Pencil,
      href: "/provider-dashboard/updateGear",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Delete Gear",
      description: "Remove gear items you no longer want to rent.",
      icon: Trash2,
      href: "/provider-dashboard/mygear",
      color: "bg-red-100 text-red-600",
    },

  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">

        {/* Dashboard Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Provider Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome back! Manage your gear rental business here.
          </p>
        </div>

        {/* Dashboard Statistics */}
        <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {statistics.map((stat) => {
            const Icon = stat.icon;

            const content = (
              <div className="rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-300">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${stat.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={25} />
                </div>

                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h2>

                <p className="mt-3 text-sm font-semibold text-blue-600">
                  View Details →
                </p>
              </div>
            );

            return stat.href ? (
              <Link
                key={stat.title}
                href={stat.href}
                className="group block"
              >
                {content}
              </Link>
            ) : (
              <div key={stat.title} className="group">
                {content}
              </div>
            );
          })}
        </div>

        {/* Provider Actions */}
        <h2 className="mb-5 text-xl font-bold text-gray-900">
          Manage Your Business
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${action.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon size={25} />
                </div>

                <h2 className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                  {action.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {action.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-blue-600 transition-all duration-300 group-hover:translate-x-2">
                  Get Started →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
