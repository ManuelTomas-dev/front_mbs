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
      toast({ title: "Sucesso", description: "Contato adicionado com sucesso!" })
      reset()
      onOpenChange(false)
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao adicionar contato.", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Contato para <Badge>{locationName}</Badge></DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome do Contato</Label>
            <Input {...register("nome_contato")} required placeholder="Ex: Pedro" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input {...register("phone")} required placeholder="923..." />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input {...register("email")} type="email" required placeholder="exemplo@gmail.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input {...register("linkedin")} placeholder="URL ou 'none'" />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Adicionar Contato"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}