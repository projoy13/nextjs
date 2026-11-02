
import LoginForm from "../_components/LoginForm/LoginForm"

export default function LoginPage() {
    console.log(process.env.BACKEND_API_URL)

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">

                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">
                        Welcome back
                    </h1>

                    <p>
                        Enter your credentials to access your account
                    </p>
                </div>

                <LoginForm />

            </div>
        </div>
    )
}
