/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

type PostState={
    success:true,
    statusCode:number,
    message:string,
    data:Record<string,any>
}

export const createGear=async(preveState:PostState,formData:FormData)=>{
    console.log({
     name: formData.get("name"),
     discription: formData.get("discription"),
     brand:formData.get("brand"),
     pricePerDay:formData.get("pricePerDay"),
     stock:formData.get("stock"),
     image:formData.get("image"),
     categoryId:formData.get("categoryId"),
     providerId:formData.get("providerId")


    });
    const cookiesStore=await cookies()


    return{}

}