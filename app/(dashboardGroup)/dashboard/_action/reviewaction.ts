
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createReview = async (formData: FormData) => {
  const gearItemId = formData.get("gearItemId") as string;
  const rating = Number(formData.get("rating"));
  const comment = (formData.get("comment") as string)?.trim();

  if (!gearItemId) {
    throw new Error("Gear item ID is required");
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  if (!comment || comment.length < 3) {
    throw new Error("Please write a comment");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Please login first");
  }

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

  revalidatePath("/UsersRentals");
  redirect("/UsersRentals?review=submitted");
};

export const updateReview = async (formData: FormData) => {
  const reviewId = formData.get("reviewId") as string;
  const rating = Number(formData.get("rating"));
  const comment = (formData.get("comment") as string)?.trim();

  if (!reviewId) {
    throw new Error("Review ID is required");
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  if (!comment || comment.length < 3) {
    throw new Error("Please write a comment");
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Please login first");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ rating, comment }),
      cache: "no-store",
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to update review");
  }

  revalidatePath("/UsersRentals");
  redirect("/UsersRentals");
};


export const getMyReview = async (gearItemId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/my/gear/${encodeURIComponent(gearItemId)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Failed to get my review:", await res.text());
    return null;
  }

  const result = await res.json();
  return result.data || null;
};

export const getReviewById = async (reviewId: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews/${encodeURIComponent(reviewId)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const result = await res.json();
  return result.data || null;
};

