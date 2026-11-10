
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"
import { loginAction } from "../../_actions/authAction"

const LoginForm = () => {
    const searchParams = useSearchParams()

    // Read the same parameter name used in the proxy
    const requestedRedirect = searchParams.get("redirect")

    const redirectTo =
        requestedRedirect?.startsWith("/") &&
        !requestedRedirect.startsWith("//")
            ? requestedRedirect
            : ""

    const [state, action, pending] = useActionState(
        loginAction.bind(null, redirectTo),
        false
    )

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success(state.message || "Login successful!")
        } else {
            toast.error(state.message || "Login failed")
        }
    }, [state])

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
