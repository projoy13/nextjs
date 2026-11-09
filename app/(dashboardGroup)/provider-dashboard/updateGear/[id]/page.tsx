"use client";

import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { updateGear } from "@/app/(dashboardGroup)/_actions/providerPostAction";
// import { Select } from "radix-ui";
// import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useRouter } from "next/router";

export default function UpdateGearPage() {
  const params = useParams<{id:string}>();
  const id = params.id as string;
  const router=useRouter()
  const [gear, setGear] = useState({
    name: "",
    description: "",
    brand: "",
    pricePerDay: "",
    stock: "",
    image: "",
    categoryId: "",
  });

  const [state, formAction, isPending] = useActionState(
    updateGear.bind(null, id),
    { success: false, message: "" }
  );
  useEffect(()=>{
    if(state.success){
        router.push("/provider-dashboard/mygear");
    }
  }
,[state.success,router])


  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Update Gear</h1>

      <form action={formAction} className="space-y-4">
        <input
          className="w-full rounded border p-3"
          name="name"
          placeholder="Gear name"
          value={gear.name}
          onChange={(e) => setGear({ ...gear, name: e.target.value })}
          required
        />

        <input
          className="w-full rounded border p-3"
          name="brand"
          placeholder="Brand"
          value={gear.brand}
          onChange={(e) => setGear({ ...gear, brand: e.target.value })}
        />

        <textarea
          className="w-full rounded border p-3"
          name="description"
          placeholder="Description"
          value={gear.description}
          onChange={(e) =>
            setGear({ ...gear, description: e.target.value })
          }
        />

        <input
          className="w-full rounded border p-3"
          name="pricePerDay"
          type="number"
          step="0.01"
          placeholder="Price per day"
          value={gear.pricePerDay}
          onChange={(e) =>
            setGear({ ...gear, pricePerDay: e.target.value })
          }
          required
        />

        <input
          className="w-full rounded border p-3"
          name="stock"
          type="number"
          placeholder="Stock"
          value={gear.stock}
          onChange={(e) => setGear({ ...gear, stock: e.target.value })}
          required
        />

        <input
          className="w-full rounded border p-3"
          name="image"
          placeholder="Image URL"
          value={gear.image}
          onChange={(e) => setGear({ ...gear, image: e.target.value })}
        />

   <Select
  name="categoryId"
  value={gear.categoryId}
  onValueChange={(value) =>
    setGear({
      ...gear,
      categoryId: value,
    })
  }
>
  <SelectTrigger>
    <SelectValue placeholder="Select a category" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="bde1f9c3-eb66-445e-a500-21daec5b050e">
      Camping
    </SelectItem>

    <SelectItem value="461e9b46-0067-4e65-8de4-e00300c1a088">
      Cycling
    </SelectItem>

    <SelectItem value="07ad0b1d-76c3-48c7-946b-d4d6d92b6fff">
      Fitness
    </SelectItem>

    <SelectItem value="913088b0-d8fe-45f8-95f1-2fe6fcbb5237">
      Gym Equipment
    </SelectItem>

    <SelectItem value="a08691c0-1c9b-4008-8a6a-129bfa6dd6af">
      Water Sports
    </SelectItem>

    <SelectItem value="adf7c142-c2c8-40a1-8a3c-3b8faa415aca">
      Professional Cameras
    </SelectItem>

    <SelectItem value="3915d709-3f8e-4cef-9037-bb33da7da4ff">
      Water
    </SelectItem>
  </SelectContent>
</Select>

        {state.message && <p>{state.message}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-black px-6 py-3 text-white"
        >
          {isPending ? "Updating..." : "Update Gear"}
        </button>
      </form>
    </main>
  );
}