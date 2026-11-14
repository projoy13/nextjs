
import Link from "next/link";
import Image from "next/image";
import { getUserRental } from "../_actions/getUserRental";

export interface IRental {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: string;

  items: {
    id: string;
    quantity: number;
    pricePerDay: string;

    gearItem: {
      id: string;
      name: string;
      brand: string;
      description: string;
      image: string | null;
      pricePerDay: string;
      stock: number;
      status: string;
    };
  }[];

  payment: {
    status: string;
    method: string;
    amount: string;
  } | null;
}

const UsersRentals = async () => {
  const response = await getUserRental();

  const irentals: IRental[] = response.data || [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Rentals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {irentals.map((irental) => (
          <div
            key={irental.id}
            className="border rounded-xl p-4 hover:shadow-lg transition"
          >
              <div className="relative w-full h-52 mb-4">
                <Image
                  src={
                    irental.items[0]?.gearItem.image ||
                    "/default-irental.png"
                  }
                  alt={
                    irental.items[0]?.gearItem.name || "Gear item"
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>

              <h2 className="text-xl font-bold">
                {irental.items[0]?.gearItem.name}
              </h2>

              <p className="text-gray-600 mt-2">
                Price per day:{" "}
                {irental.items[0]?.gearItem.pricePerDay}
              </p>

              <p className="font-semibold mt-2">
                Start date: {irental.startDate}
              </p>

              <p className="font-semibold mt-2">
                End date: {irental.endDate}
              </p>

            <div className="flex justify-center mt-6">
              {irental.items[0]?.gearItem.id && (
                <Link
                  href={`dashboard/reviews?gearItemId=${encodeURIComponent(
                    irental.items[0].gearItem.id
                  )}`}
                  className="rounded-lg bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-700 active:scale-95"
                >
                  Write Review
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersRentals;
