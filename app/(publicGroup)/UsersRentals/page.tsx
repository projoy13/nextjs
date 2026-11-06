// import { getAllirental } from "@/app/service/gear.service";
import Link from "next/link";
import Image from "next/image";
import { getUserRental } from "../_actions/getUserRental";
// import { getAllGear } from "../_actions/gearService";
// import { getMyRentals } from "@/server/getMytentals";



export interface IRental {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: string;

  items: {
    id: string;
    quantity: number;
    pricePerDay: string;

    gearItem: {
      id: string;
      name: string;
      brand: string;
      description: string;
      image: string | null;
      pricePerDay: string;
      stock: number;
      status: string;
    };
  }[];

  payment: {
    status: string;
    method: string;
    amount: string;
  } | null;
}



const UsersRentals = async () => {
  const response = await getUserRental();

  const irentals: IRental[] = response.data || [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All irental</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {irentals.map((irental) => (
          <Link href={`/irentals/${irental.id}`} key={irental.id} className="block">
            <div className="border rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
              <div className="relative w-full h-52 mb-4">
                <Image
                  src={irental.items[0]?.gearItem.image || "/default-irental.png"}
                  alt={irental.items[0]?.gearItem.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover rounded-lg"
                />
              </div>

              <h2 className="text-xl font-bold">{irental.items[0]?.gearItem.name}</h2>

              <p className="text-gray-600 mt-2">price per day: {irental.items[0]?.gearItem.pricePerDay}</p>

              {/* <p className="mt-2">Brand: {irental.brand}</p> */}

              <p className="font-semibold mt-2">
                start date: {irental.startDate} / day
             
              </p>
              <p className="font-semibold mt-2">
                
                end date: {irental.endDate} / day
              </p>

              {/* <p>Stock: {irental.stock}</p> */}

              {/* <p className="text-blue-600 mt-3 font-medium">View Details →</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UsersRentals;