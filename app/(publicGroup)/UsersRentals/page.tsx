import Link from "next/link";
import Image from "next/image";
import { getUserRental } from "../_actions/getUserRental";
import { getMyReview } from "@/app/(dashboardGroup)/dashboard/_action/reviewaction";
// import { getMyReview } from "../_actions/reviewaction";

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

  // Check existing reviews for each rental's gear
  const rentalsWithReviews = await Promise.all(
    irentals.map(async (irental) => {
      const gear = irental.items[0]?.gearItem;

      const review = gear?.id
        ? await getMyReview(gear.id)
        : null;

      return {
        ...irental,
        review,
      };
    })
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">All Rentals</h1>

      {rentalsWithReviews.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no rentals yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rentalsWithReviews.map((irental) => {
            const gear = irental.items[0]?.gearItem;
            const review = irental.review;

            return (
              <div
                key={irental.id}
                className="rounded-xl border p-4 transition hover:shadow-lg"
              >
                <div className="relative mb-4 h-52 w-full">
                  <Image
                    src={gear?.image || "/default-irental.png"}
                    alt={gear?.name || "Gear item"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="rounded-lg object-cover"
                  />
                </div>

                <h2 className="text-xl font-bold">
                  {gear?.name || "Gear item"}
                </h2>

                <p className="mt-2 text-gray-600">
                  Brand: {gear?.brand}
                </p>

                <p className="mt-2 text-gray-600">
                  Price per day: {gear?.pricePerDay}
                </p>

                <p className="mt-2 font-semibold">
                  Start date: {irental.startDate}
                </p>

                <p className="mt-2 font-semibold">
                  End date: {irental.endDate}
                </p>

                <p className="mt-2 font-semibold">
                  Rental status: {irental.status}
                </p>

                <p className="mt-2 font-semibold">
                  Total amount: {irental.totalAmount}
                </p>

                {gear?.id && (
                  <div className="mt-6">
                    {review ? (
                      <p className="rounded-lg bg-green-100 px-4 py-3 text-center font-semibold text-green-700">
                        You have already reviewed this gear.
                      </p>
                    ) : (
                      <Link
                        href={`/dashboard/reviews?gearItemId=${encodeURIComponent(
                          gear.id
                        )}`}
                        className="block rounded-lg bg-slate-800 px-6 py-3 text-center font-semibold text-white hover:bg-slate-700"
                      >
                        Write Review
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UsersRentals;