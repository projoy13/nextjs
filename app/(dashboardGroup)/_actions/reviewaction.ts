
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createReview = async (formData: FormData) => {
  const gearItemId = formData.get("gearItemId") as string;
  const rating = Number(formData.get("rating"));
  const comment = (formData.get("comment") as string)?.trim();

  // Validation
  if (!gearItemId) {
    throw new Error("Gear item ID is required");
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be an integer between 1 and 5");
  }

  if (!comment || comment.length < 3) {
    throw new Error("Please write a comment");
  }

  // Get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Please login first");
  }

  // Send review to backend
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        gearItemId,
        rating,
        comment,
      }),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to create review");
  }

  // Refresh review page
  revalidatePath("/UsersRentals");

  // Redirect after successful submission
  redirect("/UsersRentals?review=submitted");
};
