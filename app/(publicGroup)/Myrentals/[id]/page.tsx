"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createRental } from "../../_actions/createRental";
import { makepayment } from "../../_actions/makepayment";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";

import {
  ShieldCheck,
  CreditCard,
  CalendarDays,
  Badge,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

    setPaying(true);

    try {
      const rental = await createRental({
        startDate,
        endDate,
        items: [{ gearId: gear.id, quantity: 1 }],
      });

      if (!rental.success) {
        alert(rental.message);
        setPaying(false);
        return;
      }

      await makepayment(rental.rentalOrderId);
    } catch (error) {
      console.error("Payment error:", error);
      setPaying(false);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  if (!gear) {
    return <p className="p-10 text-center">Gear not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <Card className="mx-auto mt-6 w-full max-w-xl overflow-hidden rounded-2xl shadow-xl">

        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <Badge className="border-0 bg-white/20 text-white">
              Gear Rental
            </Badge>

            <ShieldCheck className="h-6 w-6" />
          </div>

          <CardTitle className="mt-3 text-2xl">
            Rent {gear.name}
          </CardTitle>

          <CardDescription className="text-blue-100">
            Select your rental dates and complete your payment.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 p-6">

          <div>
            <label className="mb-2 block text-sm font-medium">
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
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              End Date
            </label>

            <input
              type="date"
              min={startDate || today}
              value={endDate}
              disabled={!startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full rounded-lg border p-3 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Gear Name</span>
            <span className="font-semibold">{gear.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Price Per Day</span>
            <span className="font-semibold">
              €{Number(gear.pricePerDay).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Rental Days</span>
            <span className="font-semibold">{rentalDays} days</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            {startDate && endDate
              ? `${startDate} → ${endDate}`
              : "Select your rental dates"}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">Total Amount</span>

            <span className="text-3xl font-extrabold text-blue-600">
              €{totalPrice.toFixed(2)}
            </span>
          </div>

          {gear.stock <= 0 && (
            <p className="text-sm text-red-500">
              This gear is currently out of stock.
            </p>
          )}

        </CardContent>

        <CardFooter className="flex flex-col gap-4 p-6 pt-0">

          <Button
            onClick={handlePayment}
            disabled={
              !startDate ||
              !endDate ||
              rentalDays <= 0 ||
              gear.stock <= 0 ||
              paying
            }
            className="h-12 w-full bg-blue-600 text-base font-bold hover:bg-blue-700"
          >
            <CreditCard className="mr-2 h-5 w-5" />

            {paying
              ? "Redirecting to Stripe..."
              : `Pay Now €${totalPrice.toFixed(2)}`}
          </Button>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            Secure checkout powered by Stripe
          </div>

        </CardFooter>
      </Card>
    </div>
  );
}