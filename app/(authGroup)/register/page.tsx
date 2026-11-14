
import RegisterForm from "../_components/LoginForm/RegisterForm"

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">
                        Create Your Account
                    </h1>
                    <p className="text-gray-500">
                        Please fill in your details to register.
                    </p>
                </div>

                <RegisterForm />
            </div>
        </div>
    )
}
