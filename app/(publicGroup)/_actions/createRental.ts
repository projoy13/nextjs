"use server";

import { cookies } from "next/headers";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const createRental = async (data: {
  startDate: string;
  endDate: string;
  items: { gearId: string; quantity: number }[];
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in" } as const;
  }

  const decoded = jwt.decode(accessToken) as JwtPayload | null;
  const customerId = decoded?.id as string | undefined;

  if (!customerId) {
    return { success: false, message: "Invalid session, please log in again" } as const;
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({ customerId, ...data }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("createRental failed:", res.status, text);
    let message = "Could not create rental";
    try {
      message = JSON.parse(text).message || message;
    } catch {}
    return { success: false, message } as const;
  }

  const result = await res.json();
  const rentalOrderId = result.data?.id as string | undefined;

  if (!rentalOrderId) {
    return { success: false, message: "Rental order ID not found" } as const;
  }

  return { success: true, rentalOrderId } as const;
};