"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { makepayment } from "../_actions/makepayment";
// import { makepayment } from "@/server/makepayment"; // adjust to your path

export default function PayButton({ rentalOrderId }: { rentalOrderId: string }) {
  const [pending, startTransition] = useTransition();

  const handlePay = () => {
    startTransition(async () => {
      const result = await makepayment(rentalOrderId);
      // On success the server redirects to Stripe, so we only get here on failure.
      if (result && !result.success) toast.error(result.message);
    });
  };

  return (
    <button
      onClick={handlePay}
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-60"
    >
      {pending ? "Redirecting to payment..." : "Pay now"}
    </button>
  );
}