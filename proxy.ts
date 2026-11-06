import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./app/utils/jwt";
import { getrefreshToken } from "./server/refreshtoken";

// Routes where users must be authenticated
const AUTH_ROUTES = ["/login", "/register"];

// Routes that everyone can access without logging in
const PUBLIC_ROUTES = ["/", "/news"];

export async function proxy(request: NextRequest) {
    // Get the current URL path
    const pathname = request.nextUrl.pathname;

    // Get access token and refresh token from browser cookies
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // Verify the access token using the access token secret
    const decodedAccessToken = accessToken
        ? await jwtUtils.verifyToken(
            accessToken,
            process.env.JWT_ACCESS_SECRET as string
        )
        : null;
        console.log("access verify:", decodedAccessToken);
    console.log("secret defined:", !!process.env.JWT_ACCESS_SECRET);

    // Verify the refresh token using the refresh token secret
    const decodedRefreshToken = refreshToken
        ? await jwtUtils.verifyToken(
            refreshToken,
            process.env.JWT_REFRESH_SECRET as string
        )
        : null;

    // Create the next response
    const response = NextResponse.next();

    // If both tokens are valid, request a new access token
    if (decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getrefreshToken();

        // If refreshing is successful, save the new access token in a cookie
        if (result.success) {
            const newAccesstoken = result.data.accessToken;

            response.cookies.set("accessToken", newAccesstoken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
                path: "/",
            });
        }
    }

    // Store the user's role
    let userRole = null;

    // If an access token exists but is invalid, redirect to login
    if (accessToken && !decodedAccessToken?.success) {
    const isOnAuthPage = pathname === "/login" || pathname === "/register";

    // Already on login/register: clear bad cookies and show the page (no redirect)
    if (isOnAuthPage) {
        const res = NextResponse.next();
        res.cookies.delete("accessToken");
        res.cookies.delete("refreshToken");
        return res;
    }

    const errorResponse = NextResponse.redirect(
        new URL("/login", request.url)
    );
    errorResponse.cookies.delete("accessToken");
    errorResponse.cookies.delete("refreshToken");
    return errorResponse;
}

    // Get the user's role from the decoded access token
    if (decodedAccessToken?.success && decodedRefreshToken?.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    // Check whether the current page is publicly accessible
    const isPublic = PUBLIC_ROUTES.some((route) =>
        route === "/"
            ? pathname === "/"
            : pathname === route || pathname.startsWith(route + "/")
    );

    // Check whether the current page is login or register
    const isAuthRoute = AUTH_ROUTES.some(
        (route) =>
            pathname === route || pathname.startsWith(route + "/")
    );

    // If an authenticated user visits login or register, redirect based on role
    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === "CUSTOMER") {
            return NextResponse.redirect(
                new URL("/dashboard", request.url)
            );
        } else if (userRole === "ADMIN") {
            return NextResponse.redirect(
                new URL("/admin-dashboard", request.url)
            );
        } else if (userRole === "PROVIDER") {
            return NextResponse.redirect(
                new URL("/provider-dashboard", request.url)
            );
        } else {
            // Redirect users with an unrecognized role to the home page
            return NextResponse.redirect(
                new URL("/", request.url)
            );
        }
    }

    // If the user is not logged in and visits a protected page, redirect to login
    if (!accessToken && !isPublic && !isAuthRoute) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // Only CUSTOMER users can access the customer dashboard
    if (
        pathname.startsWith("/dashboard") &&
        userRole !== "CUSTOMER"
    ) {
        return NextResponse.redirect(
            new URL("/not-found", request.url)
        );
    } else if (
        // Only ADMIN users can access the admin dashboard
        pathname.startsWith("/admin-dashboard") &&
        userRole !== "ADMIN"
    ) {
        return NextResponse.redirect(
            new URL("/not-found", request.url)
        );
    } else if (
        // Only PROVIDER users can access the provider dashboard
        pathname.startsWith("/provider-dashboard") &&
        userRole !== "PROVIDER"
    ) {
        return NextResponse.redirect(
            new URL("/not-found", request.url)
        );
    }

    if(pathname.startsWith("/rentals/userRentals")&& !accessToken){
        return NextResponse.redirect(new URL("/login"))
    }
    if(pathname.startsWith("/Myrentals")&& !accessToken){
        return NextResponse.redirect(new URL("/login"))
    }

    // Allow the request to continue if all checks pass
    return response;
}

// Define which routes should run through this proxy
export const config = {
    matcher: [
        // "/",
        "/dashboard/:path*",
        "/admin-dashboard/:path*",
        "/provider-dashboard/:path*",
         "/login",
        "/register",
        "/news/:path*",
        "/rentals/userRentals/:path*",
        "/Myrentals/:path*",
    ],
};