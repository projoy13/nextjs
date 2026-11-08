"use client";

import { useActionState, useState } from "react";
import {
  Image as ImageIcon,
  PackagePlus,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createGear } from "../../_actions/providerPostAction";

// import { createGear } from "../_actions/providerPostAction";

const initialGear = {
  name: "",
  description: "",
  brand: "",
  pricePerDay: "",
  stock: "",
  image: "",
  categoryId: "",
  providerId: "",
};

const initialState = {
  success: false,
  message: "",
};

export default function Page() {
  const [gear, setGear] = useState(initialGear);

  const [state, formAction, isPending] = useActionState(
    createGear,
    initialState
  );

  function updateField(field: keyof typeof gear, value: string) {
    setGear((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleDelete() {
    setGear(initialGear);
  }

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header>
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            Inventory
          </Badge>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Create gear
          </h1>

          <p className="mt-2 text-muted-foreground">
            Add a rentable item to your inventory.
          </p>
        </header>

        <form
          action={formAction}
          className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]"
        >
          <Card>
            <CardHeader>
              <CardTitle>Gear details</CardTitle>
              <CardDescription>
                Enter your gear information.
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="name">Gear name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={gear.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={gear.brand}
                    onChange={(e) => updateField("brand", e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="stock">Available stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={gear.stock}
                    onChange={(e) => updateField("stock", e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="pricePerDay">Price per day</Label>
                  <Input
                    id="pricePerDay"
                    name="pricePerDay"
                    type="number"
                    min="0"
                    step="0.01"
                    value={gear.pricePerDay}
                    onChange={(e) =>
                      updateField("pricePerDay", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={gear.image}
                    onChange={(e) => updateField("image", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={gear.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                  rows={4}
                  required
                />
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <Label htmlFor="categoryId">Category ID</Label>
                <Input
                  id="categoryId"
                  name="categoryId"
                  value={gear.categoryId}
                  onChange={(e) =>
                    updateField("categoryId", e.target.value)
                  }
                  required
                />
              </div>
              {/* <div className="flex flex-col gap-2">
                <Label htmlFor="providerId">Provider ID</Label>
                <Input
                  id="providerId"
                  name="providerId"
                  value={gear.providerId}
                  onChange={(e) =>
                    updateField("providerId", e.target.value)
                  }
                  required
                />
              </div> */}

              {state.message && (
                <p
                  className={
                    state.success
                      ? "text-sm text-green-600"
                      : "text-sm text-destructive"
                  }
                >
                  {state.message}
                </p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col-reverse gap-3 border-t px-6 py-4 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 size-4" />
                Clear form
              </Button>

              <Button type="submit" disabled={isPending}>
                <PackagePlus className="mr-2 size-4" />
                {isPending ? "Creating..." : "Create gear"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-[4/3] bg-muted">
              {gear.image ? (
                <img
                  src={gear.image}
                  alt="Gear preview"
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-muted-foreground">
                  <ImageIcon className="size-8" />
                </div>
              )}
            </div>

            <CardHeader>
              <CardDescription>Live preview</CardDescription>
              <CardTitle>{gear.name || "Untitled gear"}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {gear.brand || "Brand"} · $
                {gear.pricePerDay || "0"}/day
              </p>
            </CardHeader>

            <CardContent className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Available stock
              </span>
              <Badge variant={Number(gear.stock) > 0 ? "secondary" : "destructive"}>
                {gear.stock || "0"} units
              </Badge>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  );
}