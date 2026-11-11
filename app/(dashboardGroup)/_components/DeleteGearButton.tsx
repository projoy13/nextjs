
"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteGear } from "@/app/(dashboardGroup)/_actions/providerPostAction";

interface DeleteGearButtonProps {
  gearId: string;
}

export default function DeleteGearButton({ gearId }: DeleteGearButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
  startTransition(async () => {
    try {
      const formData = new FormData();

      const result = await deleteGear(
        gearId,
        {
          success: false,
          message: "",
        },
        formData
      );

      if (result.success) {
        toast.success(result.message || "Gear deleted successfully!");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete gear");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting gear");
      console.error(error);
    }
  });
};

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-md bg-red-600 px-5 py-2 text-white transition-all duration-300 hover:bg-red-700 hover:scale-105 shadow-sm hover:shadow-lg disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
