"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { type JwtPayload } from "jsonwebtoken"

type LoginState = {
  success: true,
  message: string,
  data: {
    accessToken: string,
    refreshToken: string
  }
}


export const loginAction = async (
  redirectTo :string,
  prevState: LoginState,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const payload = { email, password };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result = await res.json();
  console.log("Login response:", res.status, result);

  if (!res.ok || !result.success || !result.data) {
    return result;
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    path: "/",
  });

 const decodedToken = jwt.decode(
  result.data.accessToken
) as JwtPayload | null;

console.log("Decoded Token:", decodedToken);
console.log("User Role:", decodedToken?.role);

if (!decodedToken) {
  redirect("/login");
}

const role = decodedToken.role?.toUpperCase();

if(redirectTo &&  redirectTo.startsWith("/") && !redirectTo.startsWith("//") ){
  redirect(redirectTo)
}


if (role === "CUSTOMER") {
  redirect("/dashboard");
} else if (role === "ADMIN") {
  redirect("/admin-dashboard");
} else if (role === "PROVIDER") {
  redirect("/provider-dashboard");
} else {
  redirect("/login");
}
};

export const registerAction = async (prevState: LoginState, formData: FormData) => {
  console.log(formData);
  console.log(prevState, "orev state")
  const name = formData.get('name')
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role")

  const payload = {
    name,
    email,
    password,
    role
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await res.json();
  //   console.log(result);
  if (result.success) {
    const cookieStore = await cookies()
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax"
    })
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax"
    })
    redirect("/login")
  }

  //   return result;
  return result
};