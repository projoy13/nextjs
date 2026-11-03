export const getAllGear = async () => {
    const url = `${process.env.BACKEND_API_URL}/api/gear`;

    console.log("Requesting URL:", url);

    const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });

    const responseText = await res.text();

    console.log("Response Status:", res.status);
    console.log("Response:", responseText);

    if (!res.ok) {
        throw new Error(
            `Failed to fetch gear: ${res.status} - ${responseText}`
        );
    }

    return JSON.parse(responseText);
};

export const getSingleGear=async(id:string)=>{
   const res=await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`,{
    
    cache:"no-store"
   })
   if(!res.ok){
    throw new Error(`failed to fetch gear:${res.status}`)
   }
   const result=await res.json()
   return result.data
}