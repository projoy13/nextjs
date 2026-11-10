
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { loginAction } from "../../_actions/authAction"

const LoginForm = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const requestedRedirect = searchParams.get("redirect")

    const redirectTo =
        requestedRedirect?.startsWith("/") &&
        !requestedRedirect.startsWith("//")
            ? requestedRedirect
            : "/dashboard"

    const [state, action, pending] = useActionState(
        loginAction.bind(null, redirectTo),
        false
    )

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success(state.message || "Login successful!")
            router.replace(redirectTo)
        } else {
            toast.error(state.message || "Login failed")
        }
    }, [state, router, redirectTo])

    return (
        <form action={action} className="space-y-4">
            <Card className="p-8 space-y-4 rounded-lg border">
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                />

                <Button
                    type="submit"
                    disabled={pending}
                    className="w-full"
                >
                    {pending ? "Submitting..." : "Login"}
                </Button>
            </Card>
        </form>
    )
}

export default LoginForm
