
import { getAllGear } from "@/app/service/gear.service";
import Link from "next/link";
import Image from "next/image";

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

const GearPage = async () => {
  const response = await getAllGear();

  const gears: IGear[] = response.data || [];

  return (
    <div className="container mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        All Gear
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {gears.map((gear) => (

          <Link
            href={`/Gears/${gear.id}`}
            key={gear.id}
            className="block"
          >

            <div className="border rounded-xl p-4 hover:shadow-lg transition cursor-pointer">

              {/* Gear Image */}
              <div className="relative w-full h-52 mb-4">
                <Image
                  src={gear.image || "/default-gear.png"}
                  alt={gear.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>

              <h2 className="text-xl font-bold">
                {gear.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {gear.description}
              </p>

              <p className="mt-2">
                Brand: {gear.brand}
              </p>

              <p className="font-semibold mt-2">
                Price: €{gear.pricePerDay} / day
              </p>

              <p>
                Stock: {gear.stock}
              </p>

              <p className="text-blue-600 mt-3 font-medium">
                View Details →
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
};

export default GearPage;
