
import Link from "next/link";
import { createReview } from "../../_actions/reviewaction";

interface ReviewPageProps {
  searchParams: Promise<{
    gearItemId?: string;
  }>;
}

export default async function ReviewPage({
  searchParams,
}: ReviewPageProps) {
  const { gearItemId } = await searchParams;

  if (!gearItemId) {
    return <p className="p-10 text-center">Gear item ID not found.</p>;
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <div className="rounded-xl border bg-white p-8 shadow-md">
        <h1 className="mb-6 text-3xl font-bold">Write a Review</h1>

        <form action={createReview} className="space-y-5">
          <input type="hidden" name="gearItemId" value={gearItemId} />

          <div>
            <label htmlFor="rating" className="mb-2 block font-semibold">
              Your Rating
            </label>
            <select
              id="rating"
              name="rating"
              required
              defaultValue=""
              className="w-full rounded-lg border p-3"
            >
              <option value="" disabled>Select rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <div>
            <label htmlFor="comment" className="mb-2 block font-semibold">
              Your Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              required
              minLength={3}
              rows={5}
              placeholder="Write your experience..."
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="flex justify-between">
            <Link href="/UsersRentals" className="rounded-lg border px-5 py-3">
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-slate-800 px-6 py-3 text-white"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
