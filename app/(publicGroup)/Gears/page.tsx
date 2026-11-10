import Link from "next/link";
import { getAllGear } from "../_actions/gearService";
import { SearchBarPage } from "../Search/[id]/page";
// import { SearchBarPage } from "../Search/page";
// import SearchBarPage from "../Search/page";

interface IGear {
  id: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: string;
  stock: number;
  status: string;
  image: string | null;

  provider: {
    id: string;
    name: string;
  };

  category: {
    id: string;
    name: string;
  };
}

interface GearPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const GearPage = async ({ searchParams }: GearPageProps) => {
  const search = await searchParams;

  const response = await getAllGear(search);

  const gears: IGear[] = response.data || [];

  return (
    <div className="min-h-screen bg-slate-50 ">
      <div className="container mx-auto px-4 py-10">

        <div className="flex justify-between">
            <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            All Gear
          </h1>

          <p className="mt-2 text-slate-500">
            Find the perfect equipment for your next adventure.
          </p>

          <p className="mt-2 text-sm text-slate-600">
            {gears.length} gear items found
          </p>
        </div>
        <div>
          <SearchBarPage/>

         
        </div>
        </div>
       

        {gears.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-800">
              No gear found
            </h2>

            <p className="mt-2 text-slate-500">
              Try another search term or view all available gear.
            </p>

            <Link
              href="/Gears"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Show All Gear
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gears.map((gear) => (
              <Link
                href={`/Gears/${gear.id}`}
                key={gear.id}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-52 overflow-hidden bg-slate-100">
                  {gear.image ? (
                    <img
                      src={gear.image}
                      alt={gear.name}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      No image available
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">
                      {gear.category?.name}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        gear.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {gear.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">
                    {gear.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {gear.description}
                  </p>

                  <p className="mt-3 text-sm text-slate-600">
                    Brand: {gear.brand}
                  </p>

                  <p className="mt-3 text-lg font-bold text-slate-900">
                    €{gear.pricePerDay}{" "}
                    <span className="text-sm font-normal text-slate-500">
                      / day
                    </span>
                  </p>

                  <p className="mt-3 font-medium text-blue-600">
                    View Details →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GearPage;