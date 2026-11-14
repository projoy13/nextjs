
import Link from "next/link";
import { createReview, updateReview } from "../_actions/reviewaction";
// import {
//   createReview,
//   updateReview,
// } from "../../_actions/reviewaction";

interface ReviewPageProps {
  searchParams: Promise<{
    gearItemId?: string;
    reviewId?: string;
    rating?: string;
    comment?: string;
  }>;
}

export default async function ReviewPage({
  searchParams,
}: ReviewPageProps) {
  const params = await searchParams;

  const gearItemId = params.gearItemId;
  const reviewId = params.reviewId;
  const isEditing = Boolean(reviewId);

  if (!gearItemId) {
    return (
      <div className="mx-auto max-w-xl p-10 text-center">
        <h1 className="mb-4 text-2xl font-bold">
          Gear item ID not found
        </h1>
        <Link
          href="/UsersRentals"
          className="text-blue-600 underline"
        >
          Back to My Rentals
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-8 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {isEditing ? "Update Your Review" : "Write a Review"}
        </h1>

        <p className="mb-8 text-gray-500">
          Share your experience with this gear.
        </p>

        <form
          action={isEditing ? updateReview : createReview}
          className="space-y-6"
        >
          <input
            type="hidden"
            name="gearItemId"
            value={gearItemId}
          />

          {isEditing && (
            <input
              type="hidden"
              name="reviewId"
              value={reviewId}
            />
          )}

          <div>
            <label
              htmlFor="rating"
              className="mb-2 block font-semibold text-gray-800"
            >
              Select your rating
            </label>

            <select
              id="rating"
              name="rating"
              required
              defaultValue={params.rating || ""}
              className="w-full rounded-lg border border-gray-300 p-3"
            >
              <option value="" disabled>
                Choose rating
              </option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="mb-2 block font-semibold text-gray-800"
            >
              Your comment
            </label>

            <textarea
              id="comment"
              name="comment"
              required
              minLength={3}
              rows={6}
              defaultValue={params.comment || ""}
              placeholder="Write your review here..."
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="flex justify-between gap-4">
            <Link
              href="/UsersRentals"
              className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-slate-800 px-6 py-3 font-semibold text-white hover:bg-slate-700"
            >
              {isEditing ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
