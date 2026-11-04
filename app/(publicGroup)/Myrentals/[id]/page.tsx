
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface IGear {
  id: string;
  name: string;
  pricePerDay: string;
  stock: number;
  status: string;
}

export default function Myrentals() {
  const params = useParams();
  const id = params.id as string;

  const [gear, setGear] = useState<IGear | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const getGear = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000"}/api/gear/${id}`
        );

        const result = await res.json();

        if (res.ok) {
          setGear(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch gear:", error);
      } finally {
        setLoading(false);
      }
    };

    getGear();
  }, [id]);

  const rentalDays =
    startDate && endDate
      ? Math.max(
          0,
          Math.round(
            (Date.parse(endDate + "T00:00:00Z") -
              Date.parse(startDate + "T00:00:00Z")) /
              86400000
          )
        )
      : 0;

  const totalPrice = rentalDays * Number(gear?.pricePerDay || 0);

  const today = new Date().toISOString().split("T")[0];

  
const handlePayment = async () => {
  if (!gear || !startDate || !endDate || rentalDays <= 0) {
    alert("Please select valid rental dates.");
    return;
  }

  if (gear.stock <= 0) {
    alert("This gear is out of stock.");
    return;
  }

  try {
    setPaying(true);

    // STEP 1: Create rental order
    const rentalResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rental`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
          items: [
            {
              gearId: gear.id,
              quantity: 1,
            },
          ],
        }),
      }
    );

    const rentalResult = await rentalResponse.json();

    if (!rentalResponse.ok) {
      throw new Error(
        rentalResult.message || "Rental creation failed"
      );
    }

    const rentalOrderId = rentalResult.data?.id;

    if (!rentalOrderId) {
      throw new Error("Rental order ID not found");
    }

    // STEP 2: Create payment
    const paymentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payment/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rentalOrderId,
        }),
      }
    );

    const paymentResult = await paymentResponse.json();

    if (!paymentResponse.ok) {
      throw new Error(
        paymentResult.message || "Payment creation failed"
      );
    }

    const paymentId = paymentResult.data?.id;

    if (!paymentId) {
      throw new Error("Payment ID not found");
    }

    // STEP 3: Create Stripe checkout session
    const checkoutResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payment/checkout/${paymentId}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const checkoutResult = await checkoutResponse.json();

    if (!checkoutResponse.ok) {
      throw new Error(
        checkoutResult.message || "Checkout creation failed"
      );
    }

    // IMPORTANT: Your backend returns checkoutUrl
    const checkoutUrl = checkoutResult.data?.checkoutUrl;

    if (!checkoutUrl) {
      throw new Error("Stripe checkout URL not found");
    }

    // STEP 4: Redirect to Stripe
    window.location.href = checkoutUrl;

  } catch (error) {
    console.error("Payment error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );

    setPaying(false);
  }
};


  if (loading) return <p className="p-10">Loading...</p>;

  if (!gear) return <p className="p-10">Gear not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 border rounded-xl shadow-sm">

      <h1 className="text-2xl font-bold mb-4">
        Rent {gear.name}
      </h1>

      <p className="mb-6">
        Price per day: €{gear.pricePerDay}
      </p>

      <label className="block mb-2 font-medium">
        Start Date
      </label>

      <input
        type="date"
        min={today}
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
          setEndDate("");
        }}
        className="w-full border rounded-lg p-3 mb-5"
      />

      <label className="block mb-2 font-medium">
        End Date
      </label>

      <input
        type="date"
        min={startDate || today}
        value={endDate}
        disabled={!startDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full border rounded-lg p-3"
      />

      {rentalDays > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg mt-6">
          <p>Rental days: {rentalDays}</p>

          <p>
            Price per day: €{gear.pricePerDay}
          </p>

          <h2 className="text-xl font-bold mt-3">
            Total: €{totalPrice.toFixed(2)}
          </h2>
        </div>
      )}

      {gear.stock <= 0 && (
        <p className="text-red-600 mt-4">
          This gear is currently out of stock.
        </p>
      )}

      <button
        onClick={handlePayment}
        disabled={
          !startDate ||
          !endDate ||
          rentalDays <= 0 ||
          gear.stock <= 0 ||
          paying
        }
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {paying
          ? "Redirecting to payment..."
          : `Pay Now €${totalPrice.toFixed(2)}`}
      </button>

    </div>
  );
}
