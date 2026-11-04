"use server";

import { cookies } from "next/headers";

export const createRental = async (data: {
  gearId: string;
  startDate: string;
  endDate: string;
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in" };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rental`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    return { success: false, message: result.message || "Rental failed" };
  }

  return { success: true, rentalOrderId: result.data.id as string };
};