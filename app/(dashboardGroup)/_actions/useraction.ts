
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type profileSearch = {
  searchTerm?: string | string[];
};

// GET ALL USERS
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

  if (!accessToken) {
    throw new Error("Please login first");
  }

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

// ACTIVATE OR SUSPEND USER
export const updateUserStatus = async (formData: FormData) => {
  try {
    const userId = formData.get("userId") as string;
    const status = formData.get("status") as string;

    if (!userId || !["ACTIVE", "SUSPENDED"].includes(status)) {
      return;
    }

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Please login first");
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
      throw new Error(result.message || "Failed to update user status");
    }

    revalidatePath("/admin-dashboard/users");
  } catch (error) {
    console.error("UPDATE USER STATUS ERROR:", error);
    throw error;
  }
};
