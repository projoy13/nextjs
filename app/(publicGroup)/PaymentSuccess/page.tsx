"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  PackageCheck,
} from "lucide-react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 px-4 py-12">

      {/* Background decoration */}
      <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-blue-200/30 blur-3xl" />

      <Card className="relative w-full max-w-lg overflow-hidden rounded-3xl border-0 shadow-2xl">

        {/* Top green section */}
        <div className="h-3 w-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600" />

        <CardHeader className="items-center pt-10 text-center">

          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 shadow-inner">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>

          <Badge className="mb-4 bg-green-100 px-4 py-1 text-green-700 hover:bg-green-100">
            Payment Completed
          </Badge>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Payment Successful!
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
            Thank you for your payment. Your rental booking has been submitted
            successfully.
          </p>

        </CardHeader>

        <CardContent className="space-y-5 px-8">

          {/* Success information */}
          <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5">

            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <PackageCheck className="h-6 w-6 text-green-600" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Rental Confirmation
                </h3>

                <p className="text-sm text-gray-500">
                  Thank you for choosing our gear rental service.
                </p>
              </div>
            </div>

          </div>

          {/* Payment details */}
          {sessionId && (
            <div className="rounded-xl border bg-gray-50 p-4">

              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <CreditCard className="h-4 w-4" />
                Payment Reference
              </div>

              <p className="break-all text-xs text-gray-500">
                {sessionId}
              </p>

            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            Secure payment powered by Stripe
          </div>

        </CardContent>

        <CardFooter className="flex flex-col gap-4 px-8 pb-10">

          <Button
            asChild
            className="h-12 w-full rounded-xl bg-green-600 text-base font-semibold hover:bg-green-700"
          >
            <Link href="/myrentals">
              Go to My Rentals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Link
            href="/Gears"
            className="text-sm font-medium text-gray-500 transition hover:text-green-600"
          >
            Continue Browsing Gear
          </Link>

        </CardFooter>

      </Card>
    </div>
  );
}