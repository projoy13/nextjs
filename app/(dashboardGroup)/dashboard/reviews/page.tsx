
import Link from "next/link";
import { createReview } from "../../_actions/reviewaction";
// import { createReview } from "../_actions/reviewaction";
// import { createReview } from "../../_actions/reviewAction";

interface ReviewPageProps {
  searchParams: Promise<{
    gearItemId?: string;
    submitted?: string;
  }>;
}

const Dashboardpage = async ({ searchParams }: ReviewPageProps) => {
  const params = await searchParams;
  const gearItemId = params.gearItemId;

  if (!gearItemId) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">
          Gear item ID not found
        </h2>

        <Link
          href="/UsersRentals"
          className="mt-4 inline-block rounded-lg bg-slate-800 px-5 py-2 text-white"
        >
          Return to My Rentals
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-8 shadow-md">

        <h1 className="mb-2 text-2xl font-bold text-slate-800">
          Write a Review
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Share your experience with this gear item.
        </p>

        {params.submitted === "1" && (
          <div className="mb-5 rounded-lg bg-green-100 p-3 text-green-700">
            Your review was submitted successfully!
          </div>
        )}

        <form action={createReview} className="space-y-5">

          {/* Gear Item ID */}
          <input
            type="hidden"
            name="gearItemId"
            value={gearItemId}
          />

          {/* Rating */}
          <div>
            <label
              htmlFor="rating"
              className="mb-2 block font-semibold text-gray-700"
            >
              Your Rating
            </label>

            <select
              id="rating"
              name="rating"
              required
              defaultValue=""
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Select your rating
              </option>

              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          {/* Comment */}
          <div>
            <label
              htmlFor="comment"
              className="mb-2 block font-semibold text-gray-700"
            >
              Your Comment
            </label>

            <textarea
              id="comment"
              name="comment"
              rows={5}
              required
              minLength={3}
              placeholder="Write your experience with this gear..."
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-4">

            <Link
              href="/UsersRentals"
              className="rounded-lg bg-gray-200 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-300"
            >
              Return
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
              Submit Review
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboardpage;
