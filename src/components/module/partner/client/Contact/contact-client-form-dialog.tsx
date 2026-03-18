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
import { IContactClient } from "@/types/partner/contact-client"

interface ContactClientFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactClientFormDialog({
  open,
  onOpenChange,
}: ContactClientFormDialogProps) {
  const [formData, setFormData] = useState<Partial<IContactClient>>({})
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
            {true ? "Edit Contact" : "New Contact"}
          </DialogTitle>
          <DialogDescription>
            {true
              ? "Update the contact details below."
              : "Create a new client contact for this location."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Contact Name *</Label>
              <Input
                id="name"
                value={formData.nome_contato || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nome_contato: e.target.value,
                  })
                }
                placeholder="Enter contact name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role/Position</Label>
              {/* <ctInput
                id="role"
                value={formData.cargo || ""}
                onChange={(e) =>
                  setFormData({ ...formData, cargo: e.target.value })
                }
                placeholder="Enter position or role"
              /> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary">Secondary Phone</Label>
              <Input
                id="secondary"
                value={formData.telefone_secundario || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telefone_secundario: e.target.value,
                  })
                }
                placeholder="Enter secondary phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={formData.linkedin || ""}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
                placeholder="Enter LinkedIn profile URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth">Birth Date</Label>
              <Input
                id="birth"
                type="date"
                value={formData.data_nascimento || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    data_nascimento: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notas || ""}
                onChange={(e) =>
                  setFormData({ ...formData, notas: e.target.value })
                }
                placeholder="Enter any notes about this contact"
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
                : true
                  ? "Update Contact"
                  : "Create Contact"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
