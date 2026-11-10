"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useRef } from "react";

export default  function SearchBarPage() {
    const pathname=usePathname()
    const searchParams=useSearchParams()
    const router=useRouter()

    const debouncedreference=useRef<ReturnType<typeof setTimeout>|null>(null)
    const handleChange=(value:string)=>{
        // console.log(value)
        // const params=new URLSearchParams()
        // if(value){
        //     params.set("searchTerm", value)
        // }else{
        //     params.delete("searchTerm")
        // }
        // router.replace(`${pathname}?${params.toString()}`)
        if(debouncedreference.current){
            clearTimeout(debouncedreference.current)
        }

        debouncedreference.current=setTimeout(()=>{
              console.log(value)
        const params=new URLSearchParams()
        if(value){
            params.set("searchTerm", value)
        }else{
            params.delete("searchTerm")
        }
        router.replace(`${pathname}?${params.toString()}`)

        },500)

    }
  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
      defaultValue={searchParams.get("searchTerm")?searchParams.get("searchTerm")?.toString():""}
        onChange={(e)=>handleChange(e.target.value)}

        type="text"
        placeholder="Search gear..."
        className="pl-9"
      />
    </div>
  );
}