import Navbar from "@/components/ui/shared/navbar"
import { getMe } from "@/server/getMe"

const publicGrouplayout = async({ 
    children 
}: { children: React.ReactNode 

}) => {
    const user=await getMe()
    return (
       <div>
        {/* <Navbar user={user}>
            
        </Navbar> */}
         {/* Blog layout is special only for blog Route or nestted Routes Inside the Blogs Directory */}
         {children}
       </div> 
    )
}
export default publicGrouplayout