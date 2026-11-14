
"use client";

import { toast } from "sonner";
import { updateRentalStatus } from "../_actions/providerPostAction";

type Props = {
  orderId: string;
  status: string;
};

export default function OrderActions({ orderId, status }: Props) {

  const handleUpdate = async (newStatus: string) => {
    try {
      const formData = new FormData();
      formData.append("rentalId", orderId);
      formData.append("status", newStatus);

      const result = await updateRentalStatus(formData);

      if (result.success) {
        toast.success(`Order status updated to ${newStatus}`);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update order status"
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-3">

      {status === "PLACED" && (
        <button
          type="button"
          onClick={() => handleUpdate("CONFIRMED")}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Confirm Order
        </button>
      )}

      {status === "CONFIRMED" && (
        <button
          type="button"
          onClick={() => handleUpdate("PICKED_UP")}
          className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
        >
          Mark Picked Up
        </button>
      )}

      {status === "PICKED_UP" && (
        <button
          type="button"
          onClick={() => handleUpdate("RETURNED")}
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Mark Returned
        </button>
      )}

      {status === "RETURNED" && (
        <span className="rounded-lg bg-green-100 px-4 py-2 text-green-700">
          Gear Returned
        </span>
      )}

      {status === "CANCELLED" && (
        <span className="rounded-lg bg-red-100 px-4 py-2 text-red-700">
          Order Cancelled
        </span>
      )}

    </div>
  );
}
