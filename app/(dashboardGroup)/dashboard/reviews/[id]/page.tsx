
import Link from "next/link";
import { updateReview } from "../../../_actions/reviewaction";

interface UpdateReviewPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    gearItemId?: string;
    rating?: string;
    comment?: string;
  }>;
}

export default async function UpdateReviewPage({
  params,
  searchParams,
}: UpdateReviewPageProps) {
  const { id } = await params;
  const query = await searchParams;

  return (
    <main className="mx-auto max-w-xl p-6">
      <div className="rounded-xl border bg-white p-8 shadow-md">
        <h1 className="mb-6 text-3xl font-bold">
          Update Your Review
        </h1>

        <form action={updateReview} className="space-y-5">
          <input type="hidden" name="reviewId" value={id} />

          <div>
            <label htmlFor="rating" className="mb-2 block font-semibold">
              Your Rating
            </label>
            <select
              id="rating"
              name="rating"
              required
              defaultValue={query.rating || ""}
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
              defaultValue={query.comment || ""}
              placeholder="Update your experience..."
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div className="flex justify-between">
            <Link
              href="/UsersRentals"
              className="rounded-lg border px-5 py-3"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-slate-800 px-6 py-3 text-white"
            >
              Update Review
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
