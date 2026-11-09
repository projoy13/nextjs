import Link from "next/link";
import {
  PlusCircle,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";

const ProviderDashboard = () => {
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
      href: "/ProviderMyGear",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Provider Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome back! Manage your gear rental business here.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${action.color}`}
                >
                  <Icon size={25} />
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                  {action.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {action.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-blue-600 group-hover:underline">
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