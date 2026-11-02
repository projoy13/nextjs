// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import LoginForm from "../_components/LoginForm/LoginForm"
import RegisterForm from "../_components/LoginForm/RegisterForm"

export default function Registerpage() {
  console.log(process.env.BACKEND_API_URL)
  return (
    
    <>
    <div className="flex min-h-screen items-center justify-center ">
      
      <div className="w-full max-w-md space-y-6 round-lg border p-8 shadow-lg">
        <div className="spave-y-2 text-center">
          <h1 className="text-3xl font-bold">Do you have a account? </h1>
            <p>If not please create your account</p>
        </div>
         <RegisterForm>
            
         </RegisterForm>
      </div>
       

    </div>
  
    
    </>
  )
}
