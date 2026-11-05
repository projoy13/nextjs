"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const makepayment = async (rentalOrderId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return { success: false, message: "User not logged in" };
    }

    const backendUrl = process.env.BACKEND_API_URL;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
    };

    let checkoutUrl: string | undefined;

    try {
        const paymentRes = await fetch(`${backendUrl}/api/payments/create`, {
            method: "POST",
            headers,
            body: JSON.stringify({ rentalOrderId }),
            cache: "no-store",
        });
        const paymentResult = await paymentRes.json();
        console.log("payment response:", paymentRes.status, paymentResult);   // add this

        if (!paymentRes.ok || !paymentResult.success || !paymentResult.data?.id) {
            return {
                success: false,
                message: paymentResult.message || "Payment creation failed",
            };
        }

        const checkoutRes = await fetch(

            `${backendUrl}/api/payments/checkout/${paymentResult.data.id}`,
            { method: "POST", headers, cache: "no-store" }
        );
        const checkoutResult = await checkoutRes.json();

        if (!checkoutRes.ok || !checkoutResult.success) {
            return {
                success: false,
                message: checkoutResult.message || "Checkout creation failed",
            };
        }

        checkoutUrl = checkoutResult.data?.checkoutUrl;
    } catch (error) {
        console.error("Payment error:", error);
        return { success: false, message: "Something went wrong while processing payment" };
    }

    if (!checkoutUrl) {
        return { success: false, message: "Stripe checkout URL not found" };
    }

    redirect(checkoutUrl); // external URLs work here
};