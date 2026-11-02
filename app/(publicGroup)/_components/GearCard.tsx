import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Gear {
    id: string
    name: string
    description: string
    brand: string
    pricePerDay: string
    stock: number
    status: string
    image: string | null
    provider: {
        name: string
    }
    category: {
        name: string
    }
}

interface GearCardProps {
    gear: Gear
}

const GearCard = ({ gear }: GearCardProps) => {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition">

            {gear.image ? (
                <img
                    src={gear.image}
                    alt={gear.name}
                    className="w-full h-52 object-cover"
                />
            ) : (
                <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">
                        No Image Available
                    </span>
                </div>
            )}

            <CardHeader>
                <CardTitle>{gear.name}</CardTitle>
                <p className="text-sm text-gray-500">
                    {gear.category.name}
                </p>
            </CardHeader>

            <CardContent className="space-y-2">

                <p>{gear.description}</p>

                <p>
                    <strong>Brand:</strong> {gear.brand}
                </p>

                <p>
                    <strong>Provider:</strong> {gear.provider.name}
                </p>

                <p className="font-bold text-lg">
                    €{gear.pricePerDay} / day
                </p>

                <p>
                    <strong>Stock:</strong> {gear.stock}
                </p>

                <p>
                    <strong>Status:</strong> {gear.status}
                </p>

            </CardContent>
        </Card>
    )
}

export default GearCard