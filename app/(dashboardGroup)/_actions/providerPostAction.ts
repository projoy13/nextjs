
"use server";

import { jwtUtils } from "@/app/utils/jwt";
import { getrefreshToken } from "@/server/refreshtoken";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export type PostState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: Record<string, unknown>;
};

// CREATE GEAR
export const createGear = async (
  prevState: PostState,
  formData: FormData
): Promise<PostState> => {
  try {
    const cookiesStore = await cookies();

    let accessToken = cookiesStore.get("accessToken")?.value;
    const refreshToken = cookiesStore.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
      return {
        success: false,
        message: "User not logged in",
      };
    }

    const decodedAccessToken = accessToken
      ? await jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string
        )
      : null;

    const decodedRefreshToken = refreshToken
      ? await jwtUtils.verifyToken(
          refreshToken,
          process.env.JWT_REFRESH_SECRET as string
        )
      : null;

    if (!decodedAccessToken?.success) {
      if (!decodedRefreshToken?.success) {
        return {
          success: false,
          message: "Session expired. Please login again.",
        };
      }

      const result = await getrefreshToken();

      if (!result.success) {
        return {
          success: false,
          message: "Failed to refresh token. Please login again.",
        };
      }

      const newAccessToken = result.data.accessToken;

      cookiesStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        path: "/",
      });

      accessToken = newAccessToken;
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
      `${process.env.BACKEND_API_URL}/api/gear/create`,
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

    console.log("Backend response:", result);

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

// GET MY GEAR
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

// UPDATE GEAR
export const updateGear = async (
  id: string,
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
      `${process.env.BACKEND_API_URL}/api/gear/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    console.log("Backend response:", result);

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Failed to update gear",
      };
    }

    if (result.success) {
      revalidateTag("my-posts", "max");
    }

    return result;
  } catch (error) {
    console.error("UPDATE GEAR ERROR:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

// DELETE GEAR
export const deleteGear = async (
  id: string,
  prevState: PostState,
  formData: FormData
): Promise<PostState> => {
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not logged in",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/gear/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    console.log("Delete gear response:", result);

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode || res.status,
        message: result.message || "Failed to delete gear",
      };
    }

    revalidateTag("my-posts", "max");
    revalidatePath("/provider-dashboard/mygear");

    return {
      success: true,
      message: result.message || "Gear deleted successfully",
    };
  } catch (error) {
    console.error("DELETE GEAR ERROR:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

// GET PROVIDER ORDERS
export const getProviderOrders = async () => {
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Please login first",
        data: [],
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals/provider/orders`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    console.log("Provider Orders Response:", result);

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to get orders",
        data: [],
      };
    }

    return result;

  } catch (error) {
    console.error("GET PROVIDER ORDERS ERROR:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (
  orderid: string,
  status: "CONFIRMED" | "PICKEDUP" | "RETURNED"
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
      `${process.env.BACKEND_API_URL}/api/rentals/${orderid}/status`,
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

    console.log("Update Order Response:", result);

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Failed to update order",
      };
    }

    revalidatePath("/provider-dashboard/order-management");

    return {
      success: true,
      message: result.message || "Order updated successfully",
    };

  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
