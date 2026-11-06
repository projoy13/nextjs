"use server"

type GearSearch = {
  searchTerm?: string | string[];
};

export const getAllGear = async (search?: GearSearch) => {
  const params = new URLSearchParams();

  let searchTerm = search?.searchTerm;

  if (Array.isArray(searchTerm)) {
    searchTerm = searchTerm[0];
  }

  // Remove accidental quotation marks from the search input
  searchTerm = searchTerm?.replace(/^["']|["']$/g, "").trim();

  if (searchTerm) {
    params.set("searchTerm", searchTerm);
  }

  const queryString = params.toString();

  const url = `${process.env.BACKEND_API_URL}/api/gear${
    queryString ? `?${queryString}` : ""
  }`;

  console.log("Requesting URL:", url);

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const result = await res.json();

  console.log("Frontend gear response:", result);

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch gear");
  }

  return result;
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