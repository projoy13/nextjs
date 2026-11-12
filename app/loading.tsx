
import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-5">

        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Loading...
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please wait while we prepare everything for you.
          </p>
        </div>

        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600" />
        </div>

      </div>
    </main>
  );
}
