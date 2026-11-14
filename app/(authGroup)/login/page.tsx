import Link from "next/link";
import LoginForm from "../_components/LoginForm/LoginForm";
// import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Login to your account
        </p>

        <LoginForm />

        {/* Register link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}