'use client'

import { useState } from 'react'
import { Check, Image as ImageIcon, PackagePlus, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

const initialGear = {
  name: '',
  description: '',
  brand: '',
  pricePerDay:'' ,
  stock:'' ,
  image: '',
  providerId: '',
  categoryId: ''
}

export default function Page() {
  const [gear, setGear] = useState(initialGear)
  const [saved, setSaved] = useState(false)

  function updateField(field: keyof typeof gear, value: string) {
    setGear((current) => ({
      ...current,
      [field]: field === 'pricePerDay' || field === 'stock' ? Number(value) : value,
    }))
    setSaved(false)
  }

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaved(true)
  }

  function handleDelete() {
    setGear({ ...initialGear, name: '', description: '', image: '' })
    setSaved(false)
  }

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1">Inventory</Badge>
            {saved && <span className="flex items-center gap-1 text-sm text-muted-foreground"><Check /> Saved locally</span>}
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Create gear</h1>
            <p className="mt-2 max-w-xl text-muted-foreground">Add a rentable item to your inventory with pricing, stock, and provider details.</p>
          </div>
        </header>

        <form onSubmit={handleCreate} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Card>
            <CardHeader>
              <CardTitle>Gear details</CardTitle>
              <CardDescription>Keep the catalog information clear and customer-ready.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="name">Gear name</Label>
                  <Input id="name" value={gear.name} onChange={(e) => updateField('name', e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2"><Label htmlFor="brand">Brand</Label><Input id="brand" value={gear.brand} onChange={(e) => updateField('brand', e.target.value)} required /></div>
                <div className="flex flex-col gap-2"><Label htmlFor="stock">Available stock</Label><Input id="stock" type="number" min="0" value={gear.stock} onChange={(e) => updateField('stock', e.target.value)} required /></div>
                <div className="flex flex-col gap-2"><Label htmlFor="pricePerDay">Price per day</Label><Input id="pricePerDay" type="number" min="0" step="0.01" value={gear.pricePerDay} onChange={(e) => updateField('pricePerDay', e.target.value)} required /></div>
                <div className="flex flex-col gap-2"><Label htmlFor="image">Image URL</Label><Input id="image" type="url" value={gear.image} onChange={(e) => updateField('image', e.target.value)} /></div>
              </div>
              {/* <div className="flex flex-col gap-2"><Label htmlFor="description">Description</Label><Textarea id="description" value={gear.description} onChange={(e) => updateField('description', e.target.value)} rows={4} required /></div> */}
              <Separator />
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2"><Label htmlFor="providerId">Provider ID</Label><Input id="providerId" value={gear.providerId} onChange={(e) => updateField('providerId', e.target.value)} required /></div>
                <div className="flex flex-col gap-2"><Label htmlFor="categoryId">Category ID</Label><Input id="categoryId" value={gear.categoryId} onChange={(e) => updateField('categoryId', e.target.value)} required /></div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col-reverse gap-3 border-t px-6 py-4 sm:flex-row sm:justify-between">
              <Button type="button" variant="outline" onClick={handleDelete}><Trash2 /> Delete</Button>
              <Button type="submit"><PackagePlus /> Create gear</Button>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="aspect-[4/3] bg-muted">
              {gear.image ? <img src={gear.image} alt="Gear preview" className="size-full object-cover" /> : <div className="flex size-full items-center justify-center text-muted-foreground"><ImageIcon className="size-8" /></div>}
            </div>
            <CardHeader>
              <CardDescription>Live preview</CardDescription>
              <CardTitle>{gear.name || 'Untitled gear'}</CardTitle>
              <p className="text-sm text-muted-foreground">{gear.brand || 'Brand'} · ${gear.pricePerDay || 0}/day</p>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Available stock</span>
              <Badge variant={gear.stock  ? 'secondary' : 'destructive'}>{gear.stock} units</Badge>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  )
}