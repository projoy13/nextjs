import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // If there is no token, the user is not logged in
  if (!accessToken) {
    return null;
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache:"force-cache",
        next:{
            revalidate:60*60*24,
            tags:["my-profile"]
        }
      }
    );

    if (!res.ok) {
      return null;
    }

    const result = await res.json();

    return result.data;
  } catch (error) {
    console.error("getMe error:", error);
    return null;
  }
};