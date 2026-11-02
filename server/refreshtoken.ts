import { cookies } from "next/headers";

export const getrefreshToken = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("refreshToken")?.value;

  if (!token) {
    return {
      success: false,
      message: "Refresh token not found",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: token,
        }),
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Token refresh failed",
      };
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while refreshing token",
    };
  }
};