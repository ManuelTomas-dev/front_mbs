"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ILocation } from "@/types/partner/location"

interface LocationFormDialogProps {
  location: ILocation | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Partial<ILocation>) => Promise<void>
  clientId: string
}

export function LocationFormDialog({
  location,
  open,
  onOpenChange,
  onSubmit,
  clientId,
}: LocationFormDialogProps) {
  const [formData, setFormData] = useState<Partial<ILocation>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (location) {
      setFormData(location)
    } else {
      setFormData({
        id_client: clientId,
        name: "",
        endereco: "",
      })
    }
  }, [location, clientId, open])

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {location ? "Edit Location" : "New Location"}
          </DialogTitle>
          <DialogDescription>
            {location
              ? "Update the location details below."
              : "Create a new location for this client."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter location name"
                required
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.endereco || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endereco: e.target.value })
                }
                placeholder="Enter full address"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : location
                  ? "Update Location"
                  : "Create Location"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
