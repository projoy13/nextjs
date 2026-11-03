
// import { getAllGear } from "@/services/gear.service"
// import GearCard from "@/app/_components/GearCard"

import { getAllGear } from "@/app/service/gear.service"
import GearCard from "../_components/GearCard"
import Link from "next/link"

 interface IGear {
    id: string
    name: string
    description: string
    brand: string
    pricePerDay: string
    stock: number
    status: string
    image: string | null

    provider: {
        id: string
        name: string
    }

    category: {
        id: string
        name: string
    }
}


const GearPage = async () => {

  // Fetch all gear from backend
  const response = await getAllGear()

  // Get gear array
  const gears:IGear[] = response.data || []

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

            <h2 className="text-xl font-bold">
                {gear.name}
            </h2>

            <p>{gear.description}</p>

            <p>
                Price: ${gear.pricePerDay} / day
            </p>

            <p className="text-blue-600 mt-3">
                View Details →
            </p>

        </div>
    </Link>
))}

      </div>

    </div>
  )
}

export default GearPage
