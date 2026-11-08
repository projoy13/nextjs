
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export type PostState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: Record<string, unknown>;
};

export const createGear = async (
  prevState: PostState,
  formData: FormData
): Promise<PostState> => {
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in",
      };
    }

    const payload = {
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || ""),
      brand: String(formData.get("brand") || ""),
      pricePerDay: Number(formData.get("pricePerDay")),
      stock: Number(formData.get("stock")),
      image: String(formData.get("image") || ""),
      categoryId: String(formData.get("categoryId") || ""),
    };

    console.log("Gear payload:", payload);

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/gear/creat`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
      
    );

    const result = await res.json();

   console.log(
  "Backend response:",
  JSON.stringify(result, null, 2)
);
    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Failed to create gear",
      };
    }

    if (result.success) {
      revalidateTag("my-posts", "max");
    }

    return result;

  } catch (error) {
    console.error("CREATE GEAR ERROR:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getMygear = async () => {
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in",
        data: [],
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/gear/mygear`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    console.log("My Gear Response:", result);

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to get your gear",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error("GET MY GEAR ERROR:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};
