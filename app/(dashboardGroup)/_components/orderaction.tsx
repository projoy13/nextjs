
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateOrderStatus } from "../_actions/providerPostAction";
// import { updateOrderStatus } from "../../_actions/providerPostAction";

type Props = {
  orderId: string;
  status: string;
};

const OrderActions = ({ orderId, status }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleUpdate = (
    newStatus: "CONFIRMED" | "PICKEDUP" | "RETURNED"
  ) => {
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, newStatus);

      if (result.success) {
        toast.success(result.message || "Order updated successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update order");
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {status === "PLACED" && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleUpdate("CONFIRMED")}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Confirm
        </button>
      )}

      {status === "CONFIRMED" && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleUpdate("PICKEDUP")}
          className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50"
        >
          Mark Picked Up
        </button>
      )}

      {status === "PICKEDUP" && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleUpdate("RETURNED")}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
        >
          Mark Returned
        </button>
      )}

      {status === "RETURNED" && (
        <span className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          Order Completed
        </span>
      )}

      {isPending && (
        <span className="py-2 text-sm text-gray-500">
          Updating...
        </span>
      )}
    </div>
  );
};

export default OrderActions;
