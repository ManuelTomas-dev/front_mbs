import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createContact } from "@/services/partner/contact" 
import { useToast } from "@/hooks/use-toast"
import { IContact } from "@/types/partner/contact"
import { Badge } from "@/components/ui/badge"

interface ContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  locationId: number
  locationName: string
}

export function ContactDialog({ open, onOpenChange, locationId, locationName }: ContactDialogProps) {
  const { register, handleSubmit, reset } = useForm<IContact>()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: IContact) => {
    setIsSubmitting(true)
    try {
      await createContact({ ...data, id_client_location: locationId })
      toast({ title: "Success", description: "Contact added successfully!" })
      reset()
      onOpenChange(false)
    } catch (error) {
      toast({ title: "Error", description: "Failed to add contact.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Contact for <Badge>{locationName}</Badge></DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Contact Name</Label>
            <Input {...register("nome_contato")} required placeholder="Ex: John" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input {...register("phone")} required placeholder="Ex: 123..." />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input {...register("email")} type="email" required placeholder="Ex: example@gmail.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input {...register("linkedin")} placeholder="URL or 'none'" />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Add Contact"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}