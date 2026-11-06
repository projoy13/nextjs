
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { registerAction } from "../../_actions/authAction"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select" 

const RegisterForm = () => {
    const [state, action, pending] = useActionState(registerAction, false)
    const router = useRouter()

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success(state.message || "Signup successful!")
            router.push("/dashboard")
        } else {
            toast.error(state.message || "Signup failed")
        }
    }, [state, router])

    return (
        <form action={action}>
            <Card className="p-8 space-y-4 rounded-lg border">
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
                    placeholder="Create your password"
                    required
                />
                <p className="text-bold">chose your characet</p>
                <Select name="role" defaultValue="CUSTOMER">
    <SelectTrigger>
        <SelectValue placeholder="Select your role" />
    </SelectTrigger>

    <SelectContent>
        <SelectItem value="CUSTOMER">Customer</SelectItem>
        <SelectItem value="PROVIDER">Provider</SelectItem>
        {/* <SelectItem value="ADMIN">Admin</SelectItem> */}
    </SelectContent>
</Select>

                <Button type="submit" disabled={pending} className="w-full">
                    {pending ? "Submitting..." : "Sign up"}
                </Button>

                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </Card>
        </form>
    )
}

export default RegisterForm
