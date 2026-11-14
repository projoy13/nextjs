
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type profileSearch = {
  searchTerm?: string | string[];
};

export const getAlluser = async (search?: profileSearch) => {
  const params = new URLSearchParams();
  let searchTerm = search?.searchTerm;

  if (Array.isArray(searchTerm)) {
    searchTerm = searchTerm[0];
  }

  searchTerm = searchTerm?.replace(/^["']|["']$/g, "").trim();

  if (searchTerm) {
    params.set("searchTerm", searchTerm);
  }

  const queryString = params.toString();

  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;

  const url = `${process.env.BACKEND_API_URL}/api/users${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch users");
  }

  return result;
};

// UPDATE USER STATUS
export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "SUSPENDED"
) => {
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Please login first",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update user status",
      };
    }

    revalidatePath("/admin-dashboard/users");

    return {
      success: true,
      message: result.message || "User status updated successfully",
    };
  } catch (error) {
    console.error("UPDATE USER STATUS ERROR:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
