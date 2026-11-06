
import { cookies } from "next/headers";

export const getUserRental = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Access token not found. Please login again.");
  }

  const url = `${process.env.BACKEND_API_URL}/api/rentals/userRentals`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const responseText = await res.text();

  console.log("Rental Response Status:", res.status);
  console.log("Rental Response:", responseText);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch rentals: ${res.status} - ${responseText}`
    );
  }

  return responseText ? JSON.parse(responseText) : null;
};
