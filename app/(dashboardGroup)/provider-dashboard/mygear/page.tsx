
import { getMygear } from "@/app/(dashboardGroup)/_actions/providerPostAction";
import Link from "next/link";
import DeleteGearButton from "../../_components/DeleteGearButton";

export const dynamic = "force-dynamic";

interface Gear {
  id: string;
  name: string;
  brand: string | null;
  pricePerDay: string | number;
  stock: number;
  image?: string | null;
  description?: string | null;
}

const MyGearPage = async () => {
  const result = await getMygear();

  if (!result.success) {
    return <p className="p-8 text-red-500">{result.message}</p>;
  }

  const gears: Gear[] = result.data || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">My Gear</h1>

        {gears.length === 0 ? (
          <p className="rounded-lg border bg-white p-8 text-center text-gray-500">
            You have not created any gear yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gears.map((gear) => (
              <div
                key={gear.id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm"
              >
                {gear.image ? (
                  <img
                    src={gear.image}
                    alt={gear.name}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 w-full items-center justify-center bg-gray-200 text-gray-500">
                    No Image Available
                  </div>
                )}

                <div className="p-5">
                  <h2 className="text-xl font-semibold">{gear.name}</h2>

                  <p className="mt-2 text-gray-500">
                    Brand: {gear.brand || "Not specified"}
                  </p>

                  <p className="mt-2">
                    Price: €{gear.pricePerDay}/day
                  </p>

                  <p className="mt-2">Stock: {gear.stock}</p>

                  <p className="mt-2">
                    Description: {gear.description || "No description"}
                  </p>
                </div>

                <div className="flex justify-center gap-6 p-5 pt-0">
                  <Link
                    href={`/provider-dashboard/updateGear/${gear.id}`}
                    className="rounded-md bg-blue-600 px-5 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
                  >
                    Edit
                  </Link>

                  <DeleteGearButton gearId={gear.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGearPage;
