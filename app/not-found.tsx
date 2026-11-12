
import Link from "next/link";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-10 text-center shadow-lg">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <SearchX className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="text-7xl font-bold tracking-tight text-gray-900">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 leading-7 text-gray-500">
          Oops! The page or resource you are looking for does not exist,
          may have been moved, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 hover:shadow-md"
          >
            <Home size={18} />
            Return Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-400">
          Error Code: 404
        </p>
      </div>
    </main>
  );
}
