
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { registerAction } from "../../_actions/authAction"

const RegisterForm = () => {
    const [state, action, pending] = useActionState(
        registerAction,
        false
    )

    useEffect(() => {
        if (!state) return

        if (!state.success) {
            toast.error(state.message || "Registration failed")
        }
    }, [state])

    return (
        <form action={action} className="space-y-4">
            <Card className="space-y-4 rounded-lg border p-8">

                <Input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                />

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
                    minLength={6}
                />

                <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium">
                        Select your account type
                    </label>

                    <select
                        id="role"
                        name="role"
                        required
                        defaultValue="CUSTOMER"
                        className="w-full rounded-md border bg-background p-3"
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="PROVIDER">Provider</option>
                    </select>
                </div>

                <Button
                    type="submit"
                    disabled={pending}
                    className="w-full"
                >
                    {pending ? "Creating Account..." : "Register"}
                </Button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </Card>
        </form>
    )
}

export default RegisterForm
