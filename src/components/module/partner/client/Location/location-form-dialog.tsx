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
  open: boolean
  onOpenChange: (open: boolean) => void
  clientId: string
}

export function LocationFormDialog({
  open,
  onOpenChange,
  clientId,
}: LocationFormDialogProps) {
  const [formData, setFormData] = useState<Partial<ILocation>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     try {
//       await onSubmit(formData)
//       onOpenChange(false)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

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

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name *</Label>
              <Input
                id="name"
                value={formData.designacao_localidade_cliente || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    designacao_localidade_cliente: e.target.value,
                  })
                }
                placeholder="Enter location name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.cidade || ""}
                onChange={(e) =>
                  setFormData({ ...formData, cidade: e.target.value })
                }
                placeholder="Enter city"
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

            <div className="space-y-2">
              <Label htmlFor="postal">Postal Code</Label>
              <Input
                id="postal"
                value={formData.codigo_postal || ""}
                onChange={(e) =>
                  setFormData({ ...formData, codigo_postal: e.target.value })
                }
                placeholder="Enter postal code"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.pais || ""}
                onChange={(e) =>
                  setFormData({ ...formData, pais: e.target.value })
                }
                placeholder="Enter country"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.telefone_localidade || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telefone_localidade: e.target.value,
                  })
                }
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email_localidade || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email_localidade: e.target.value,
                  })
                }
                placeholder="Enter email"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="notes">Observations</Label>
              <Textarea
                id="notes"
                value={formData.observacoes || ""}
                onChange={(e) =>
                  setFormData({ ...formData, observacoes: e.target.value })
                }
                placeholder="Enter any observations"
                rows={3}
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
