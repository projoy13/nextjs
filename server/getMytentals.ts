import { cookies } from "next/headers";

export const getMyRentals = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rental/my-rentals`, // adjust to your route
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("getMyRentals failed:", res.status);
    return [];
  }

  const result = await res.json();
  return result.data ?? [];
};