import { Button } from "@/components/ui/button"
import { getMe } from "@/server/getMe"

export default async function Home(){
    console.log("root Routre")
    const user=await getMe()
    console.log(user)
    return (
        <div>
            hello ,next Js <Button> clik me</Button>
        </div>
    )
}