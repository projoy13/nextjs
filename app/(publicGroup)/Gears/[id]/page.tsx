import Link from "next/link";

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
  reviews: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

interface GearDetailsPageProps {
  params: Promise<{ id: string }>;
}

const GearDetailsPage = async ({ params }: GearDetailsPageProps) => {
  const { id } = await params;

  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return <div className="p-10 text-center">Gear not found.</div>;
  }

  const result = await response.json();
  const gear: IGear = result.data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 ">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Gear Image */}
        <div className="bg-gray-100 rounded-xl overflow-hidden min-h-80 flex items-center justify-center">
          {gear.image ? (
            <img
              src={gear.image}
              alt={gear.name}
              className="w-full h-96 object-cover"
            />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
        </div>

        {/* Gear Information */}
        <div>
          <p className="text-sm text-blue-600 font-semibold">
            {gear.category.name}
          </p>

          <h1 className="text-3xl font-bold mt-2">{gear.name}</h1>

          <p className="text-gray-500 mt-2">
            Brand: {gear.brand}
          </p>

          <p className="text-gray-700 mt-5">
            {gear.description}
          </p>

          <div className="mt-6 space-y-3">
            <p>
              <strong>Price:</strong> €{gear.pricePerDay} / day
            </p>

            <p>
              <strong>Available stock:</strong> {gear.stock}
            </p>

            <p>
              <strong>Status:</strong> {gear.status}
            </p>

            <p>
              <strong>Provider:</strong> {gear.provider.name}
            </p>
          </div>

          {gear.stock > 0 && gear.status === "AVAILABLE" ? (
           <Link
  href={`/Myrentals/${gear.id}`}
  className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
>
  Rent Now
</Link>
          ) : (
            <button
              disabled
              className="mt-8 bg-gray-400 text-white px-8 py-3 rounded-lg cursor-not-allowed"
            >
              Not Available
            </button>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {gear.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {gear.reviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-5"
              >
                <p className="text-yellow-500 font-semibold">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>

                <p className="mt-2">{review.comment}</p>

                <p className="text-sm text-gray-400 mt-3">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GearDetailsPage;
